import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config'
import { DataService } from './../../../../../services/appartment/data-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SaCompany } from './../../../../../models/sa-company.model';

@Component({
  selector: 'app-rl1009',
  templateUrl: './rl1009.component.html'
})
export class RL1009Component implements OnInit {
  public allApartmentList: any = [];
  public saCompanyInfo = new SaCompany();
  sliderbaseUrl: any;
  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private dataService: DataService) {
    this.saCompanyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  }
  public curPage = 1;
  public listViewType = 1;
  public searchFields: any[] = ['projectName', 'projectId'];
  public searchString;
  public showRecordsNo = 10;

  ngOnInit() {
    this.sliderbaseUrl = acConfig.fileUrl;
    this.getApartment();
  }
  onClickDeleteApparmet(projectNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.dataService.deleteApartment(projectNo).subscribe(result => {
          this.allApartmentList.splice(index, 1);
          this.toastr.success('Deleted Successfully');
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }



  getApartment() {
    this.http.get(`${acConfig.apiUrl}/rl/project/ap/`, {
      params: {
        //projectNo: '0'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.allApartmentList = JSON.parse(JSON.stringify(response.body)).map(element => {

          element['projectLayoutPhoto'] = this.sliderbaseUrl + element.projectLayoutPhoto;
          if (element['projectType'] === 'R') {
            element['projectType'] = 'Residential'
          }
          else if (element['projectType'] === 'C') {
            element['projectType'] = 'Commercial'
          }
          else if (element['projectType'] === 'CO') {
            element['projectType'] = 'Condominium'
          }
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
        { header: 'Project Name', dataKey: 'projectName' },
        { header: 'Project Location', dataKey: 'projectLocation' },
        { header: 'Land Area', dataKey: 'landArea' },
        { header: 'Open Space', dataKey: 'openSpace' },
        { header: 'No Of Flat', dataKey: 'noOfFlat' },
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
      doc.text(8, 28, 'Apartment Project List')

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
