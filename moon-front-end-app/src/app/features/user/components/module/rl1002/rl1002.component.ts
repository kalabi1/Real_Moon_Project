import { CustomerService } from './../../../../../services/customerService/customer.service';
import { Customer } from './../../../../../models/customer.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { fixedValues } from '../../../../../fixedValues'
import { globalVariables } from '../../../../../core/constants/globalVariables';
import { SaCompany } from './../../../../../models/sa-company.model';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-rl1002',
  templateUrl: './rl1002.component.html'
})
export class RL1002Component implements OnInit {
  public customer = new Customer();
  public saCompanyInfo = new SaCompany;
  public editMode = false;
  public sliderbaseUrl;
  public sliderUrl;
  public sliderList;
  public customerNo;
  public professionList;
  public sameAsPresentAddress = false;
  public countryList = fixedValues.countryList;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private toastr: ToastrService,
    private customerService: CustomerService) {
    this.saCompanyInfo = globalVariables.companyInfo;
    console.log('Company', this.saCompanyInfo)
    this.saCompanyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  }

  @ViewChild('fileInput')
  myInputVariable: ElementRef;

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.customerNo = this.route.snapshot.params.id;
    this.sliderbaseUrl = acConfig.fileUrl;
    this.getProfessionList();

    if (id) {
      this.getCustomer(id);
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = "";
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

  onClickDeleteCustomer() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.customerService.deleteCustomer(this.customer.customerNo).subscribe(result => {
          this.toastr.success('Deleted successfully');
          this.onClickNew();
        }, err => {
          this.toastr.error('Unable to Delete');
          this.onClickNew();
        });
      }
    })
  }

  getCustomer(customerNo) {
    this.http.get(`${acConfig.apiUrl}/rl/customer/get-customer`, {
      params: {
        customerNo: customerNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.customer = new Customer(response.body);
        this.sliderUrl = this.sliderbaseUrl + this.customer.customerPictureName;
      })
      .catch(console.log);
  }
  onClickSave() {
    if (!this.myInputVariable.nativeElement.value && !this.customer.customerPictureName) {
      this.toastr.warning("Please Upload your photo ");
      return;
    }
    if (!this.customer.customerName) {
      this.toastr.warning("Please Input your Name ");
      return;
    }
    if (!this.customer.fatherName) {
      this.toastr.warning("Please Input your Father Name ");
      return;
    }
    if (!this.customer.motherName) {
      this.toastr.warning("Please Input your Mother Name ");
      return;
    }
    if (!this.customer.permanentAddress) {
      this.toastr.warning("Please Input your Permanent Address");
      return;
    }
    if (!this.customer.presentAddress) {
      this.toastr.warning("Please Input your Present Address");
      return;
    }
    if (!this.customer.nid) {
      this.toastr.warning("Please Input your NID/Birth ID/Passport No");
      return;
    }
    if (!this.customer.nationality) {
      this.toastr.warning("Please Input your Nationality");
      return;
    }
    if (!this.customer.mobile) {
      this.toastr.warning("Please Input your Mobile no");
      return;
    }
    if (!this.customer.profession_no) {
      this.toastr.warning("Please Input your Profession");
      return;
    }
    let body = new FormData();
    // Add file content to prepare the request
    body.append("customerNo", JSON.parse(JSON.stringify(this.customer.customerNo)));
    body.append("customerId", this.customer.customerId);
    body.append("customerName", this.customer.customerName);
    body.append("fatherName", this.customer.fatherName);
    body.append("motherName", this.customer.motherName);
    body.append("spouseName", this.customer.spouseName);
    body.append("permanentAddress", this.customer.permanentAddress);
    body.append("presentAddress", this.customer.presentAddress);
    body.append("dob", this.customer.dob && this.getYYYYMMDDDashFromDate(this.customer.dob) !== 'NaN-NaN-NaN' ? this.getYYYYMMDDDashFromDate(this.customer.dob) : '');
    body.append("religionName", this.customer.religionName);
    body.append("nid", this.customer.nid);
    body.append("nationality", this.customer.nationality);
    body.append("telephone", this.customer.telephone);
    body.append("mobile", this.customer.mobile);
    body.append("email", this.customer.email);
    body.append("contactPerson", this.customer.contactPerson);
    body.append("cpMobile", this.customer.cpMobile);
    body.append("profession_no", JSON.parse(JSON.stringify(this.customer.profession_no)));
    body.append("designation", this.customer.designation);
    body.append("officeAddress", this.customer.officeAddress);
    body.append("customerPictureName", this.customer.customerPictureName);
    body.append("password", this.customer.password);
    body.append("customerPhoto", this.customerPhoto);

    console.log('body add', body)

    // Launch post request
    this.http.post(`${acConfig.apiUrl}/rl/customer/add`, body)
      .subscribe(
        (data) => {
          console.log(data)
          this.customer = new Customer(data);
          this.sliderUrl = this.sliderbaseUrl + this.customer.customerPictureName;
          console.log("sliderUrl", this.sliderUrl);
          this.toastr.success('Saved successfully');
          this.editMode = true;
          this.clearProfilePicture();
        },
        // Or errors :-(
        error => {
          console.log(error),
            this.toastr.error('Unable to Save');
          // tell us if it's finished
          () => { console.log("completed") }
        }


      );
  }
  onClickUpdate() {
    console.log("myInputVariable - ", this.myInputVariable.nativeElement.value);
    if (!this.myInputVariable.nativeElement.value && !this.customer.customerPictureName) {
      this.toastr.warning("Please Input your photo ");
      return;
    }
    if (!this.customer.fatherName) {
      this.toastr.warning("Please Input your Father Name ");
      return;
    }
    if (!this.customer.motherName) {
      this.toastr.warning("Please Input your Mother Name ");
      return;
    }
    if (!this.customer.permanentAddress) {
      this.toastr.warning("Please Input your Permanent Address");
      return;
    }
    if (!this.customer.presentAddress) {
      this.toastr.warning("Please Input your Present Address");
      return;
    }
    if (!this.customer.nid) {
      this.toastr.warning("Please Input your NID/Birth ID/Passport No");
      return;
    }
    if (!this.customer.nationality) {
      this.toastr.warning("Please Input your Nationality");
      return;
    }
    if (!this.customer.mobile) {
      this.toastr.warning("Please Input your Mobile no");
      return;
    }
    if (!this.customer.profession_no) {
      this.toastr.warning("Please Input your Profession");
      return;
    }
    let body = new FormData();
    // Add file content to prepare the request
    body.append("customerNo", JSON.parse(JSON.stringify(this.customer.customerNo)));
    body.append("customerId", this.customer.customerId);
    body.append("customerName", this.customer.customerName);
    body.append("fatherName", this.customer.fatherName);
    body.append("motherName", this.customer.motherName);
    body.append("spouseName", this.customer.spouseName);
    body.append("permanentAddress", this.customer.permanentAddress);
    body.append("presentAddress", this.customer.presentAddress);
    body.append("dob", this.customer.dob && this.getYYYYMMDDDashFromDate(this.customer.dob) !== 'NaN-NaN-NaN' ? this.getYYYYMMDDDashFromDate(this.customer.dob) : '');
    body.append("religionName", this.customer.religionName);
    body.append("nid", this.customer.nid);
    body.append("nationality", this.customer.nationality);
    body.append("telephone", this.customer.telephone);
    body.append("mobile", this.customer.mobile);
    body.append("email", this.customer.email);
    body.append("contactPerson", this.customer.contactPerson);
    body.append("cpMobile", this.customer.cpMobile);
    body.append("profession_no", JSON.parse(JSON.stringify(this.customer.profession_no)));
    body.append("designation", this.customer.designation);
    body.append("officeAddress", this.customer.officeAddress);
    body.append("customerPictureName", this.customer.customerPictureName);
    body.append("password", this.customer.password);
    body.append("customerPhoto", this.customerPhoto);
    body.append("cpAddress", this.customer.cpAddress);
    body.append("cpEmail", this.customer.cpEmail);

    console.log('body add', body)

    // Launch post request
    this.http.put(`${acConfig.apiUrl}/rl/customer/update`, body)
      .subscribe(
        (data) => {
          console.log(data)
          this.customer = new Customer(data);
          this.sliderUrl = this.sliderbaseUrl + this.customer.customerPictureName;
          this.toastr.success('Updated Successfully ');
          this.clearProfilePicture();
        },
        // Or errors :-(
        error => {
          console.log(error);
          this.toastr.error('Unable to Update');
        },
        // tell us if it's finished
        () => { console.log("completed") }
      );
  }

  onClickNew() {
    this.customer = new Customer();
    this.editMode = false
    this.sliderUrl = ''
  }

  getProfessionList() {
    this.http.get(`${acConfig.apiUrl}/sa/setting/lookupdtl/list/`, {
      params: {
        lookupNo: '7003'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.professionList = response.body;
      })
      .catch(console.log);
  }


  public customerPhoto;
  fileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.customerPhoto = event.target.files[0];
    }
  }
  onChangeAddressCheckbox() {
    if (this.sameAsPresentAddress) {
      this.customer.presentAddress = this.customer.permanentAddress
    }
  }

  generatePdf(pRepType) {
    let i = 0;
    let doc = new jsPDF();

    doc.setFontSize(11)
    doc.setFontType("bold");
    doc.text(25, 35, 'Customer Id: ')
    doc.setFontType("normal")
    doc.text(50, 35, this.customer.customerId)
    doc.setFontType("bold");
    doc.text(25, 42, 'Customer Name: ')
    doc.setFontType("normal")
    doc.text(57, 42, this.customer.customerName)
    doc.setFontType("bold");
    doc.text(25, 49, 'Father s name: ')
    doc.setFontType("normal")
    doc.text(54, 49, this.customer.fatherName)
    doc.setFontType("bold");
    doc.text(25, 56, 'Mother s name: ')
    doc.setFontType("normal")
    doc.text(55, 56, this.customer.motherName)
    doc.setFontType("bold");
    doc.text(25, 63, 'Date Of Birth: ')
    doc.setFontType("normal")
    // doc.text(56, 63, this.customer.dob)
    doc.setFontType("bold");
    doc.text(25, 70, 'Permanent Address: ')
    doc.setFontType("normal")
    doc.text(64, 70, this.customer.permanentAddress)
    doc.setFontType("bold");
    doc.text(25, 77, 'Present Address: ')
    doc.setFontType("normal")
    doc.text(58, 77, this.customer.permanentAddress)
    doc.setFontType("bold");
    doc.text(25, 84, 'Spouse s Name: ')
    doc.setFontType("normal")
    doc.text(56, 84, this.customer.spouseName)
    doc.setFontType("bold");
    doc.text(25, 91, 'Religion: ')
    doc.setFontType("normal")
    doc.text(43, 91, this.customer.religionName)
    doc.setFontType("bold");
    doc.text(25, 98, 'NID/Birth ID/Passport No: ')
    doc.setFontType("normal")
    doc.text(73, 98, this.customer.nid)
    doc.setFontType("bold");
    doc.text(25, 105, 'Nationality: ')
    doc.setFontType("normal")
    doc.text(47, 105, this.customer.nationality)
    doc.setFontType("bold");
    doc.text(25, 112, 'Telephone No: ')
    doc.setFontType("normal")
    doc.text(53, 112, this.customer.telephone)
    doc.setFontType("bold");
    doc.text(25, 119, 'Mobile No: ')
    doc.setFontType("normal")
    doc.text(46, 119, this.customer.mobile)
    doc.setFontType("bold");
    doc.text(25, 126, 'E-mail Address: ')
    doc.setFontType("normal")
    doc.text(55, 126, this.customer.email)
    doc.setFontType("bold");
    doc.text(25, 133, 'Contact Person s Name: ')
    doc.setFontType("normal")
    doc.text(71, 133, this.customer.contactPerson)
    doc.setFontType("bold");
    doc.text(25, 140, 'Contact Person s Mobile: ')
    doc.setFontType("normal")
    doc.text(73, 140, this.customer.cpMobile)
    doc.setFontType("bold");
    doc.text(25, 147, 'Contact Person s Address: ')
    doc.setFontType("normal")
    doc.text(76, 147, this.customer.cpAddress)
    doc.setFontType("bold");
    doc.text(25, 154, 'Contact Person s E-mail: ')
    doc.setFontType("normal")
    doc.text(72, 154, this.customer.cpEmail)
    doc.setFontType("bold");
    doc.text(25, 161, 'Profession: ')
    doc.setFontType("normal")
    // doc.text(72, 161, this.customer.)
    doc.setFontType("bold");
    doc.text(25, 168, 'Designation: ')
    doc.setFontType("normal")
    doc.text(49, 168, this.customer.designation)
    doc.setFontType("bold");
    doc.text(25, 175, 'Office Address: ')
    doc.setFontType("normal")
    doc.text(55, 175, this.customer.officeAddress)


    if (this.customer.customerPictureName) {
      let img = new Image();
      let imageUrl = acConfig.fileUrl + this.customer.customerPictureName;
      let imageType = this.customer.customerPictureName.replace(/.+?\.(?=[a-zA-z])/, '')
      img.src = imageUrl;
      doc.addImage(img, imageType, 145, 30, 45, 45);
    }

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
      doc.text(8, 28, 'Customer Information')

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
