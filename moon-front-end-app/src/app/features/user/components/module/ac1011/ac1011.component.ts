import { Component, OnInit } from '@angular/core';
import { acConfig } from '../../../../../app.config'
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-ac1011',
  templateUrl: './ac1011.component.html'
})
export class AC1011Component implements OnInit {
  public acBalacneList: any;
  public curPage = 1;
  public showRecordsNo = 10;

  constructor(private http: HttpClient) { }
  public searchFields: any[] = ['natureCode', 'natureName', 'accCode' , 'accName'];
  public searchString;

  ngOnInit() {
    this.getTrnList();
  }


  getTrnList() {
    this.http.get(`${acConfig.apiUrl}/ac/ledger/balance/balance-list`, {
      params: {
        // customerNo: customerNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.acBalacneList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['balance'] = element['balance'].toFixed(2);
          element['active'] = element['active'] === 1 ? 'Yes' : 'No';
          return element;
        })

      })
      .catch(console.log);
  }

  getYYYYMMDDDashFromDate(date) {
    if (!date) return null;
    try {
      const dateObj = new Date(date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1;
      const yyyy = dateObj.getFullYear().toString();
      let rDd = dd.toString();
      let rMm = mm.toString();
      if (dd < 10) {
        rDd = '0' + dd.toString();
      }
      if (mm < 10) {
        rMm = '0' + mm.toString();
      }
      return yyyy + '-' + rMm + '-' + rDd;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  generatePdf(pRepType) {
    let i = 0;
    let pdfData = this.acBalacneList.map(element => {
      element['sl'] = i + 1;
      element['trnDate'] = this.getYYYYMMDDDashFromDate(element['trnDate'])
      i++;
      return element;
    })

    let doc = new jsPDF();

    doc.autoTable({

      theme: 'plain',
      styles: { fontSize: 7, lineWidth: .1 },
      headStyles: { fillColor: [247, 247, 247] },
      columnStyles: { sl: { halign: 'center' } }, // SL# centered
      columns: [
        { header: 'SL#', dataKey: 'sl' },
        { header: 'Nature Code', dataKey: 'natureCode' },
        { header: 'Nature Name', dataKey: 'natureName' },
        { header: 'Account Code', dataKey: 'accCode' },
        { header: 'Account Name', dataKey: 'accName' },
        { header: 'Active', dataKey: 'active' },
        { header: 'Balance', dataKey: 'balance' },
      ],
      body: pdfData
    })

    if (pRepType === 'PR') {
      doc.output('dataurlnewwindow');
    } else if (pRepType === 'D') {
      doc.save('Report.pdf');
    } else if (pRepType === 'P') {
      doc.autoPrint();
      doc.output('dataurlnewwindow');
    }
  }
}
