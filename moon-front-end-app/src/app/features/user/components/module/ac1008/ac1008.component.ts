import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { acConfig } from '../../../../../app.config';
import { AcVoucher } from '../../../../../models/ac-voucher.model';
import { AcVoucherdtl } from '../../../../../models/ac-voucherdtl.model';
import { AcVouchertype } from '../../../../../models/ac-vouchertype.model';
import { AcPeriod } from '../../../../../models/ac-period.model';
import { Ac1008Service } from '../../../../../services/ac1008/ac1008-service';
import { AcChart } from '../../../../../models/ac-chart.model';
import { SaCompany } from './../../../../../models/sa-company.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-ac1008',
  templateUrl: './ac1008.component.html'
})
export class AC1008Component implements OnInit {
  public saCompanyInfo = new SaCompany();
  public acVoucher = new AcVoucher();
  public acVoucherList = new Array<AcVoucher>();
  public acVoucherFilterList = new Array<AcVoucher>();
  public acVoucherdtl = new AcVoucherdtl();
  public voucherTypeList = new Array<AcVouchertype>();
  public acChartList = new Array<AcChart>();
  public acVoucherdtlList = new Array<AcVoucherdtl>();
  public acPeriod = new AcPeriod();
  public searchFields: any[] = ['vid'];
  public searchString;
  public listActiveIndex = 0;
  public typeActiveIndex = 0;
  public filterVNo;
  public editMode = false;
  public disabled = true;
  public filterFromDate: Date;
  public filterToDate: Date;
  public recordCount: number = 0;
  public filterVnoNo: number;
  public filterVTypeNo: number;
  public sumDr: number;
  public sumCr: number;
  public drSpellOut;

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private ac1008Service: Ac1008Service) { this.saCompanyInfo = JSON.parse(localStorage.getItem("companyInfo")); }

  ngOnInit() {
    this.filterFromDate = new Date();
    this.filterFromDate.setDate(this.filterFromDate.getDate() - 30);
    this.filterToDate = new Date();
    this.getVoucherList();
    this.getVoucherTypeList();
    this.getAcPeriod();
    this.getAcChartList();
    this.onClickAddDetails();

  }

  // Get Voucher Type List
  getVoucherList() {
    this.http.get(`${acConfig.apiUrl}/ac/voucher/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acVoucherList.length = 0;
        this.acVoucherList = JSON.parse(JSON.stringify(response.body)).reverse();
        this.getTrnListFiltering();

      })
      .catch(console.log);
  }

  onClickAddDetails() {
    this.acVoucherdtlList.push(new AcVoucherdtl());
  }

  getTrnListFiltering() {


    setTimeout(() => {
      this.acVoucherFilterList = this.acVoucherList;

      this.acVoucherFilterList = this.acVoucherFilterList.map(element => {
        if (element['module'] === 'AC') {
          element['moduleName'] = 'Accounts'
        }
        return element;
      });

      if (Number(this.filterVTypeNo) > 0) {
        this.acVoucherFilterList = this.acVoucherFilterList.filter(x => Number(x.vtypeNo) === Number(this.filterVTypeNo));
      }

      if (Number(this.filterVnoNo) > 0) {
        this.acVoucherFilterList = this.acVoucherFilterList.filter(x => Number(x.vno) === Number(this.filterVnoNo));
      }

      this.acVoucherFilterList = this.acVoucherFilterList;

      this.recordCount = this.acVoucherFilterList.length;

      this.onClickActiveIndex(0);
    }, 500);

  }

  // Get Voucher Type List
  getAcChartList() {
    this.http.get(`${acConfig.apiUrl}/ac/chart/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acChartList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  // Get Voucher Type List
  getVoucherTypeList() {
    this.http.get(`${acConfig.apiUrl}/ac/configuration/vtype/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.voucherTypeList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  // Get Voucher Type List
  getVoucherdtlList() {
    this.http.get(`${acConfig.apiUrl}/ac/voucher/voucherdtl/list`, {
      params: {
        vNo: '' + this.acVoucher.vno
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acVoucherdtlList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['type'] = Number(element['dr']) > 0 ? 'Dr' : 'Cr';
          return element;
        });
        this.sumDrCrValue();

      })
      .catch(console.log);
  }

  sumDrCrValue() {
    this.sumDr = 0;
    this.sumCr = 0;
    this.acVoucherdtlList.forEach(x => {
      this.sumDr += Number(x.dr);
      this.sumCr += Number(x.cr);
    })

    this.sumDr = Number(this.sumDr.toFixed(2));
    this.getInWordDrPrice();
    this.sumCr = Number(this.sumCr.toFixed(2));
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

  onClickAddNew() {
    this.editMode = false;
    this.acVoucher = new AcVoucher();
    this.acVoucher.vtypeNo = JSON.parse(JSON.stringify(this.voucherTypeList[0])).vtypeNo;
    this.acVoucher.vdate = new Date();
    this.acVoucher.module = 'AC';
    this.acVoucher.moduleName = 'Accounts';
    this.acVoucherdtlList.length = 0;
    this.acVoucherdtlList.push(new AcVoucherdtl)
    this.acVoucherdtlList.push(new AcVoucherdtl)
  }

  // Get AC Period
  getAcPeriod() {
    this.http.get(`${acConfig.apiUrl}/ac/period/get-period`, {
      params: {
        periodNo: '1'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acPeriod = new AcPeriod(response.body);
      })
      .catch(console.log);
  }

  onClickActiveIndex(i) {
    this.listActiveIndex = i;
    this.editMode = true;
    this.acVoucher = new AcVoucher(this.acVoucherFilterList[i]);
    if (this.acVoucher.vno) {
      this.getVoucherdtlList();
    }
  }
  onClickTypeActiveIndex(i) {
    this.typeActiveIndex = i;
  }

  // Save AC Voucher
  onclickSaveAcVoucher() {
    this.ac1008Service.saveAcVoucher(this.acVoucher).subscribe(
      result => {
        console.log('successfully Save');
        // this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.acVoucher = new AcVoucher(result);
        this.acVoucherList.splice(0, 0, this.acVoucher);
        this.acVoucherFilterList.splice(0, 0, this.acVoucher);
        this.onClickActiveIndex(0)
        this.onclickSaveAcVoucherdtl();
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to Save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }


  // Save AC Voucherdtl
  onclickSaveAcVoucherdtl() {
    this.acVoucherdtlList = this.acVoucherdtlList.map(element => {
      element['vno'] = this.acVoucher.vno;
      return element;
    })
    this.ac1008Service.saveAcVoucherdtlList(this.acVoucherdtlList).subscribe(
      result => {
        console.log('successfully Save');

        this.acVoucherdtlList = JSON.parse(JSON.stringify(result)).map(element => {
          element['type'] = Number(element['dr']) > 0 ? 'Dr' : 'Cr';

          return element;
        });
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to Save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }


  onclickUpdateAcVoucher() {
    this.ac1008Service.updateAcVoucher(this.acVoucher).subscribe(
      result => {
        console.log('successfully Save');
        this.toastr.success('Saved Successfully');
        this.acVoucher = new AcVoucher(result);
        this.editMode = true;
        this.onclickSaveAcVoucherdtl();
        this.acVoucherList[this.listActiveIndex] = this.acVoucher;
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to Save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickDeleteAcVoucher() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {

        this.ac1008Service.deleteAcVoucher(this.acVoucher.vno).subscribe(
          result => {
            this.toastr.success('Deleted successfully ');
            this.acVoucherList.splice(this.listActiveIndex, 1);
            this.acVoucherFilterList.splice(this.listActiveIndex, 1);
            this.onClickDeleteAcVoucherdtlList();

          },
          err => {
            this.toastr.error('Unable to Delete');
          },
          () => {
            // Do stuff after completion
          }
        );
      }
    })
  }


  onClickDeleteAcVoucherdtlList() {
    this.ac1008Service.deleteAcVoucherdtlList(this.acVoucher.vno).subscribe(
      result => {
        this.acVoucherdtlList.length = 0;
        this.onClickActiveIndex(0)
      },
      err => {
        this.toastr.error('Unable to Delete');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickDeleteAcVoucherdtl(vdtlNo, index) {
    if (vdtlNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {

        if (data) {
          this.ac1008Service.deleteAcVoucherdtl(vdtlNo).subscribe(
            result => {
              this.toastr.success('Deleted successfully ');
              this.acVoucherdtlList.splice(index, 1);
            },
            err => {
              this.toastr.error('Unable to Delete');
            },
            () => {
              // Do stuff after completion
            }
          );
        }
      })
    } else {
      this.acVoucherdtlList.splice(index, 1);
    }
  }

  getInWordDrPrice() {
    if (this.sumDr > 0) {
      this.sumDr = Number(this.sumDr.toFixed(2))
      this.http.get(`${acConfig.apiUrl}/sa/company/spellout`, {
        params: {
          value: '' + this.sumDr
        },
        observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.drSpellOut = JSON.parse(JSON.stringify(response.body)).spellout;
        })
        .catch(console.log);
    }
  }

  generatePdf(pRepType) {
    let tempVoucherType = JSON.parse(JSON.stringify(this.voucherTypeList.filter(x => x.vtypeNo === this.acVoucher.vtypeNo)));
    this.acVoucher.typeName = tempVoucherType[0].typeName;

    let i = 0;
    let pdfData = JSON.parse(JSON.stringify(this.acVoucherdtlList)).map(element => {
      let tempAccChart = JSON.parse(JSON.stringify(this.acChartList.filter(x => x.accNo === element['accNo'])))
      element['particular'] = tempAccChart[0].accName + ' ' + tempAccChart[0].accCode
      return element;
    });
    let doc = new jsPDF();
    doc.setLineWidth(0.1)

    doc.setFontSize(10);
    doc.text('Module-' + this.acVoucher.moduleName, 18, 37)
    doc.rect(80, 32, 51, 6)
    doc.text('' + this.acVoucher.typeName, 94, 36)
    doc.rect(39, 40, 32, 5)
    doc.text('Voucher No:     ' + this.acVoucher.vid, 18, 43.5)
    doc.rect(169, 40, 22, 5)
    doc.text('Date:    ' + this.getYYYYMMDDDashFromDate(this.acVoucher.vdate), 159, 43.5)

    doc.autoTable({

      theme: 'plain',
      styles: { fontSize: 10, lineWidth: .1 },
      headStyles: { fillColor: [247, 247, 247] },
      columnStyles: { dr: { halign: 'right' }, cr: { halign: 'right' } }, // dr and cr value right align
      columns: [
        { header: 'PARTICULARS', dataKey: 'particular' },
        { header: 'Dr', dataKey: 'dr' },
        { header: 'Cr', dataKey: 'cr' }
      ],
      startY: 48,
      // startY: doc.autoTable.previous.finalY + 32,
      margin: { top: 0, right: 18, bottom: 18, left: 18 },
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
      doc.text(8, 28, 'Accounts Voucher')

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
