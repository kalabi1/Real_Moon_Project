import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config'
import { DataService } from './../../../../../services/rl1005/rl1005-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { SaCompany } from './../../../../../models/sa-company.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-rl1006',
  templateUrl: './rl1006.component.html'
})
export class Rl1006Component implements OnInit {
  public saCompanyInfo = new SaCompany();
  public allApartmentList: any = [];
  sliderbaseUrl: any;
  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private dataService: DataService) {
    this.saCompanyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  }
  public curPage = 1;
  public listViewType = 1;
  public searchFields: any[] = ['itemName', 'itemId'];
  public searchString;
  public showRecordsNo = 10;

  ngOnInit() {
    this.sliderbaseUrl = acConfig.fileUrl;
    this.getApartment();
  }

  onClickDeleteApartmentItem(itemNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.dataService.deleteApartment(itemNo).subscribe(result => {
          this.toastr.success('Deleted Successfully');
          this.allApartmentList.splice(index, 1);
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }

  getApartment() {
    this.http.get(`${acConfig.apiUrl}/rl/item/ap/`, {

      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.allApartmentList = response.body;
        this.allApartmentList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['itemBrandPhoto'] = this.sliderbaseUrl + element.itemBrandPhoto;
          return element;
        });
      })
      .catch(console.log);
  }
  onClickChangeType(value) {
    this.listViewType = value;
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
    let pdfData = this.allApartmentList.map(element => {
      element['sl'] = i + 1;
      element['totalPrice'] = element['totalPrice'].toFixed(2);
      i++;
      return element;
    })

    let doc = new jsPDF();

    doc.autoTable({
      theme: 'plain',
      styles: { fontSize: 7, lineWidth: .1 },
      headStyles: { fillColor: [247, 247, 247] },
      columnStyles: { europe: { halign: 'center' } }, // European countries centered
      columns: [
        { header: 'SL#', dataKey: 'sl' },
        { header: 'Item Name', dataKey: 'itemName' },
        { header: 'Project Name', dataKey: 'projectName' },
        { header: 'Location', dataKey: 'projectLocation' },
        { header: 'Flat Area', dataKey: 'flatSize' },
        { header: 'Total Price', dataKey: 'totalPrice' },
        { header: 'Facing', dataKey: 'facingName' },
      ],
      margin: { top: 31, right: 6, bottom: 19, left: 6 },
      body: pdfData
    })

    // Set Header And Footer
    let pageCount = doc.internal.getNumberOfPages();
    for (i = 0; i < pageCount; i++) {
      doc.setPage(i);
      if (this.saCompanyInfo.companyLogoName) {
        let img = new Image();
        let imageUrl = acConfig.fileUrl + this.saCompanyInfo.companyLogoName;
        let imageType = this.saCompanyInfo.companyLogoName.replace(/.+?\.(?=[a-zA-z])/, '')
        img.src = imageUrl;
        doc.addImage(img, imageType, 8, 5, 22, 17);
      }

      doc.setFontSize(16);
      doc.setFontType("bold");
      doc.text(40, 10, this.saCompanyInfo.companyName)
      doc.setFontSize(10);
      doc.setFontType("normal");
      doc.text(40, 17, this.saCompanyInfo.companyAddr1)
      doc.text(40, 22, this.saCompanyInfo.companyAddr2)

      // Report Title
      doc.setFontStyle("italic");
      doc.setFontSize(13);
      doc.text(8, 28, 'Apartment Item List')

      doc.setDrawColor(0, 0, 0)
      doc.line(5, 29, 205, 29)
      doc.setFontStyle("normal");

      // Report Footer 
      doc.rect(5, 281, 200, 8)
      doc.setFontSize(8);
      doc.text(10, 284, this.saCompanyInfo.repFooter1);
      doc.text(9, 288, this.saCompanyInfo.repFooter2);
      doc.text(6, 292, JSON.parse(localStorage.getItem("user")).emp_ID)
      doc.text(171, 292, this.saCompanyInfo.repFooterDev)
      doc.setFontType("bold");
      doc.text(90, 292, 'Page ' + doc.internal.getCurrentPageInfo().pageNumber + " of " + pageCount);
      doc.setFontStyle("normal");
    }

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
