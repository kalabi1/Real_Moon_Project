import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fixedValues } from '../../../fixedValues'
import { Customer } from './../../../models/customer.model';
import { acConfig } from '../../../app.config'
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {

  public countryList = fixedValues.countryList;
  public customer = new Customer();
  public professionList;
  public customerPhotoUrl;
  public customerNo;
  public customerPhoto;

  public sameAsPresentAddress = false;

  public isFatherNameDialabled = false;
  public isMotherNameDialabled = false;
  public isPermanentAddressDialabled = false;
  public isDateofBirthDialabled = false;
  public isNidDialabled = false;

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getProfessionList();
    this.customerNo = JSON.parse(localStorage.getItem("user")).customerNo;
    if (this.customerNo) {
      this.getCustomer(this.customerNo);
    }
  }

  @ViewChild('fileInput')
  myInputVariable: ElementRef;


  getCustomer(customerNo) {
    this.http.get(`${acConfig.apiUrl}/rl/customer/get-customer`, {
      params: {
        customerNo: customerNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.customer = new Customer(response.body);
        this.disabledCheck();
        if (this.customer.customerPictureName != null) {
          this.customerPhotoUrl = acConfig.fileUrl + this.customer.customerPictureName;
        }
      })
      .catch(console.log);
  }

  disabledCheck() {
    this.isFatherNameDialabled = this.customer.fatherName ? true : false;
    this.isMotherNameDialabled = this.customer.motherName ? true : false;
    this.isPermanentAddressDialabled = this.customer.permanentAddress ? true : false;
    this.isDateofBirthDialabled = this.customer.dob ? true : false;
    this.isNidDialabled = this.customer.nid ? true : false;
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
  onClickUpdate() {
    console.log("myInputVariable - ", this.myInputVariable.nativeElement.value);
    if (!this.customer.customerPictureName && !this.myInputVariable.nativeElement.value) {
      this.toastr.warning("Please Input your photo ");
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
    body.append("dob", this.customer.dob ? this.getYYYYMMDDDashFromDate(this.customer.dob) : '');
    body.append("religion", this.customer.religion);
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
    this.http.put(`${acConfig.apiUrl}/rl/customer/update`, body)
      .subscribe(
        (data) => {
          console.log(data)
          this.customer = new Customer(data);
          this.disabledCheck();
          this.toastr.success('Update successfully');
          this.customerPhotoUrl = acConfig.fileUrl + this.customer.customerPictureName;
          this.clearProfilePicture();
          let obj = JSON.parse(localStorage.getItem("user"));
          obj.customerPictureName = this.customer.customerPictureName;
          window.localStorage.setItem('user', JSON.stringify(obj));
          window.location.reload();
        },
        // Or errors :-(
        error => {
          console.log(error);
          this.toastr.success('Unable to Update');
          // this.toastr.error('Unable to Update');
        },
        // tell us if it's finished
        () => { console.log("completed") }
      );
  }
  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = "";
  }

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
}
