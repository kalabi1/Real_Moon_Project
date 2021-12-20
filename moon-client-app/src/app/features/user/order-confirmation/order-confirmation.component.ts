import { NomineeService } from './../../../services/nomineeService/nominee.service';
import { TransactionService } from './../../../services/transactionService/transaction.service';
import { RlTrn } from './../../../models/rl-trn.model';
import { Item } from './../../../models/project.model';
import { CustomerService } from './../../../services/customerService/customer.service';
import { Customer } from './../../../models/customer.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { Nominee } from '../../../models/nominee.model';
import { fixedValues } from '../../../fixedValues'

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html'
})
export class OrderConfirmationComponent implements OnInit {
  public countryList = fixedValues.countryList;
  public customer = new Customer();
  public nomineePhotoFile: File;
  public editMode = false;
  public sliderbaseUrl;
  public sliderUrl;
  public sliderList;
  public customerNo;
  public professionList;
  public isDisabled = true;
  public itemObj = new Item();
  public sameAsPresentAddress = false;
  public sameAsNomineePresentAddress = false;
  public transaction = new RlTrn();
  public customerSignatureFile: File;
  public paramId;
  public nomineePhotoUrl;
  public itemList: any = [];
  public signaturePhotoUrl = '';
  public trnInstallmentList = new Array<RlTrn>();
  public installmentPayCount: number = 0;

  public isFatherNameDialabled = false;
  public isMotherNameDialabled = false;
  public isPermanentAddressDialabled = false;
  public isDateofBirthDialabled = false;
  public isNidDialabled = false;
  public settlementPriceSpellOut: any;
  public bookingAmountSpellOut: any;
  public remainingAmountSpellOut: any;
  public installmentPayAmount: number = 0;
  public installmentModifyFlag = false;
  public nominee: any = new Nominee();

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private nomineeService: NomineeService,
  ) {
  }

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  @ViewChild('fileSignatureInput')
  myInputVariableSignature: ElementRef;
  @ViewChild('fileNomineeInput')
  myInputVariableNominee: ElementRef;


  ngOnInit() {

    this.getProfessionList();
    this.paramId = this.route.snapshot.params.id;
    // this.nomineeList.push(new Nominee());
    const id = this.route.snapshot.params.id;
    if (JSON.parse(localStorage.getItem("user"))) {
      this.customerNo = JSON.parse(localStorage.getItem("user")).customerNo;
    }
    if (!this.editMode) {
      this.trnInstallmentList.push(new RlTrn());
    }

    this.sliderbaseUrl = acConfig.fileUrl;

    if (id) {
      this.getItemDetails(id);
    }

    if (this.customerNo) {
      this.getCustomer(this.customerNo);
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  fileSignatureChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.customerSignatureFile = event.target.files[0];
    }
  }
  disabledCheck() {
    this.isFatherNameDialabled = this.customer.fatherName ? true : false;
    this.isMotherNameDialabled = this.customer.motherName ? true : false;
    this.isPermanentAddressDialabled = this.customer.permanentAddress ? true : false;
    this.isDateofBirthDialabled = this.customer.dob ? true : false;
    this.isNidDialabled = this.customer.nid ? true : false;
  }

  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = "";
  }

  getItemDetails(id) {
    this.http.get(`${acConfig.apiUrl}/rl/cu/item/details`, {
      params: {
        itemNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.itemObj = new Item(response.body);
        this.itemObj['projectLayoutPhoto'] = this.sliderbaseUrl + this.itemObj.itemBrandPhoto;
        this.transaction.totalPrice = this.transaction.totalPrice ? this.transaction.totalPrice : this.itemObj.totalPrice;
        this.transaction.settlementPrice = this.transaction.settlementPrice ? this.transaction.settlementPrice : this.itemObj.netPrice;
        this.transaction.trnDate = new Date;
        this.transaction.installStartDate = new Date;
        this.getInWordSettlementPrice();
        this.onChangeGetBookingAmtSpell();
      })
      .catch(console.log);
  }
  fileNomineeChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.nomineePhotoFile = event.target.files[0];
    }
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
        this.disabledCheck();
      })
      .catch(console.log);
  }


  onClickSave() {
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


  onClickUpdateCustomer() {

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
    body.append("dob", this.getYYYYMMDDDashFromDate(this.customer.dob));
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

    // Launch post request

    this.http.put(`${acConfig.apiUrl}/rl/customer/update`, body)
      .subscribe(
        (data) => {
          console.log(data)
          this.customer = new Customer(data);
          this.sliderUrl = this.sliderbaseUrl + this.customer.customerPictureName;
          // this.toastr.success('Update Successfully ');
          this.clearProfilePicture();
        },
        // Or errors :-(
        error => {
          console.log(error);
          // this.toastr.error('Unable to Update');
        },
        // tell us if it's finished
        () => { console.log("completed") }
      );

  }

  getItemList() {
    this.http.get(`${acConfig.apiUrl}/rl/cu/item/`, {
      params: {
        itemInventoryFlag: this.paramId ? '' : '0'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.itemList = response.body;
        if (this.paramId) {
          this.getTrnDetails(this.paramId);
          this.editMode = true;
        } else {
          this.transaction.trnDate = new Date;
        }
      })
      .catch(console.log);
  }

  onClickNew() {
    this.customer = new Customer();
    this.paramId = '';
    this.settlementPriceSpellOut = '';
    this.bookingAmountSpellOut = '';
    this.remainingAmountSpellOut = '';
    this.trnInstallmentList.length = 0;
    this.editMode = false
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

  getTrnDetails(id) {
    this.http.get(`${acConfig.apiUrl}/rl/trn/get-trn`, {
      params: {
        trnNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.transaction = new RlTrn(response.body);
        this.calculateRemainingAmount();
        this.onChangeRemainingAmountSpell();
        this.onChangeGetBookingAmtSpell();
      })
      .catch(console.log);
  }

  changeInstallmentsNo() {
    if ((Number(this.transaction.settlementPrice) - this.transaction.bookingAmount + this.transaction.downPaymentAmount) - this.installmentPayAmount) {
      this.transaction.perinstallmentAmount = Number(((Number(this.transaction.settlementPrice) - (Number(this.transaction.bookingAmount) + Number(this.transaction.downPaymentAmount))) / Number(this.transaction.installmentsNo)).toFixed(2));
      this.trnInstallmentList = this.trnInstallmentList.filter(trn => trn.payFlag > 0);
      for (let i = 0 + this.installmentPayCount; i < this.transaction.installmentsNo; i++) {
        let installmentObj = new RlTrn();
        if (this.transaction.trnNo) {
          installmentObj.trnNo = this.transaction.trnNo;
          this.installmentModifyFlag = true;
        }
        installmentObj.installmentSl = i + 1;
        installmentObj.installmentAmount = Number((((Number(this.transaction.settlementPrice) - (Number(this.transaction.bookingAmount) + Number(this.transaction.downPaymentAmount))) - Number(this.installmentPayAmount)) / (Number(this.transaction.installmentsNo) - this.installmentPayCount)).toFixed(2));
        installmentObj.installmentDate = new Date(this.transaction.installStartDate);
        installmentObj.installmentDate.setMonth(this.transaction.installStartDate.getMonth() + i);
        if (i + 1 == this.transaction.installmentsNo) {
          this.transaction.installmentEndDate = installmentObj.installmentDate;
        }
        installmentObj.payFlag = 0;
        installmentObj.pendingAmount = installmentObj.installmentAmount;
        installmentObj.installmentPayStatus = 'Pending';
        this.trnInstallmentList.push(installmentObj)
      }
    } else {
      this.toastr.warning('Payment Already Collected');
    }
  }

  public customerPhoto;
  fileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.customerPhoto = event.target.files[0];
    }
  }

  onChangeRemainingAmountSpell() {

    this.transaction.remainingAmount = Number(this.transaction.remainingAmount.toFixed(2))

    this.http.get(`${acConfig.apiUrl}/sa/company/spellout`, {
      params: {
        value: '' + this.transaction.remainingAmount
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.remainingAmountSpellOut = JSON.parse(JSON.stringify(response.body)).spellout;
      })
      .catch(console.log);
  }

  getInWordSettlementPrice() {
    this.http.get(`${acConfig.apiUrl}/sa/company/spellout`, {
      params: {
        value: '' + this.transaction.settlementPrice
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.settlementPriceSpellOut = JSON.parse(JSON.stringify(response.body)).spellout;
      })
      .catch(console.log);
  }

  onChangeGetBookingAmtSpell() {
    if (this.transaction.bookingAmount) {
      this.http.get(`${acConfig.apiUrl}/sa/company/spellout`, {
        params: {
          value: '' + this.transaction.bookingAmount
        },
        observe: 'response'
      })
        .toPromise()
        .then(response => {
          console.log("response", response);
          this.bookingAmountSpellOut = JSON.parse(JSON.stringify(response.body)).spellout;
        })
        .catch(console.log);
    }
  }
  changeBookingAmount() {
    this.calculateRemainingAmount();
    this.onChangeGetBookingAmtSpell();
  }
  changeDwnPaymentAmount() {
    this.calculateRemainingAmount();
  }
  calculateRemainingAmount() {
    this.transaction.remainingAmount = (Number(this.transaction.settlementPrice) - (Number(this.transaction.bookingAmount) + Number(this.transaction.downPaymentAmount)));
    this.onChangeRemainingAmountSpell();
  }


  // Calculate Down Payment PCT to Amount
  calDownPayAmount() {
    this.transaction.downPaymentAmount = Number(((Number(this.transaction.settlementPrice) - Number(this.transaction.bookingAmount)) * Number(this.transaction.downPaymentPct) / 100).toFixed(2));
    this.calculateRemainingAmount();
  }

  onClickSaveAll() {
    this.alertService.warning("Do you want to Confirm this order?", true).then(data => {
      if (data) {
        this.onClickUpdateCustomer();
        this.transaction.customerNo = this.customer.customerNo;
        let obj = JSON.parse(JSON.stringify(this.transaction));
        obj.trnDate = this.getYYYYMMDDDashFromDate(this.transaction.trnDate);
        obj['itemNo'] = this.itemObj.itemNo;

        if (this.customerSignatureFile != null) {
          let body = new FormData();
          // Add file content to prepare the request
          body.append("multipartFile", this.customerSignatureFile);
          // Launch post request
          this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
            .subscribe(
              (data) => {

                obj.customerSignatureName = JSON.parse(JSON.stringify(data)).fileName;
                // Save Transaction
                this.transactionService.saveTransaction(obj).subscribe(result => {
                  this.transaction = new RlTrn(result);
                  this.onClickSaveInstallmentList();
                  this.calculateRemainingAmount();
                  this.signaturePhotoUrl = acConfig.fileUrl + this.transaction.customerSignatureName;
                  this.nominee.trnNo = this.transaction.trnNo;
                  this.myInputVariableSignature.nativeElement.value = "";
                  // Upload and Save Nominee
                  if (this.nomineePhotoFile != null) {
                    let body = new FormData();
                    // Add file content to prepare the request
                    body.append("multipartFile", this.nomineePhotoFile);
                    // Launch post request
                    this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
                      .subscribe(
                        (data) => {
                          this.nominee.nomineePictureName = JSON.parse(JSON.stringify(data)).fileName;
                          // Save Nominee Information
                          this.transactionService.saveNominee(this.nominee).subscribe(result => {
                            this.nominee = new Nominee(result);
                            this.nominee = acConfig.fileUrl + this.nominee.nomineePictureName;
                            this.myInputVariableNominee.nativeElement.value = "";
                          },
                            // Nominee errors :-(
                            error => {
                              console.log(error);
                              this.toastr.error('Unable to Save');
                              // tell us if it's finished
                              () => { console.log("completed") }
                            });
                        },
                        // Nominee file upload errors :-(
                        error => {
                          console.log(error);
                          this.toastr.error('Unable to Upload');
                          // tell us if it's finished
                          () => { console.log("completed") }
                        }
                      );
                  } else {
                    this.transactionService.saveNominee(this.nominee).subscribe(result => {
                      this.nominee = new Nominee(result);
                      this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nominee.nomineePictureName;
                      this.toastr.success('Order Successfully Submitted');
                      localStorage.removeItem('carts');
                      document.getElementById('totalCart').innerText = '0';
                      this.router.navigate(['/my-order']);
                    },
                      // Or errors :-(
                      error => {
                        console.log(error);
                        this.toastr.error('Unable to Save');
                        // tell us if it's finished
                        () => { console.log("completed") }
                      }
                    )
                  }
                });
              },
              // Or errors :-(
              error => {
                console.log(error);
                this.toastr.error('Unable to Upload');
                // tell us if it's finished
                () => { console.log("completed") }
              }
            );
        } else {

          this.transactionService.saveTransaction(obj).subscribe(result => {
            this.transaction = new RlTrn(result);
            this.onClickSaveInstallmentList()
            this.calculateRemainingAmount();

            this.myInputVariableSignature.nativeElement.value = "";
            this.nominee.trnNo = this.transaction.trnNo;
            // Upload and Save Nominee
            if (this.nomineePhotoFile != null) {
              let body = new FormData();
              // Add file content to prepare the request
              body.append("multipartFile", this.nomineePhotoFile);
              // Launch post request
              this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
                .subscribe(
                  (data) => {
                    this.nominee.nomineePictureName = JSON.parse(JSON.stringify(data)).fileName;
                    // Save Nominee Information
                    this.transactionService.saveNominee(this.nominee).subscribe(result => {
                      this.nominee = new Nominee(result);
                      this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nomineePictureName;
                      this.myInputVariableNominee.nativeElement.value = "";
                      this.toastr.success('Order Successfully Submitted');
                      localStorage.removeItem('carts');
                      document.getElementById('totalCart').innerText = '0';
                      this.router.navigate(['/my-order']);
                    },
                      // Nominee errors :-(
                      error => {
                        console.log(error);
                        this.toastr.error('Unable to Save');
                        // tell us if it's finished
                        () => { console.log("completed") }
                      });
                  },
                  // Nominee file upload errors :-(
                  error => {
                    console.log(error);
                    this.toastr.error('Unable to Upload');
                    // tell us if it's finished
                    () => { console.log("completed") }
                  }
                );
            } else {

              this.transactionService.saveNominee(this.nominee).subscribe(result => {
                this.nominee = new Nominee(result);
                this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nomineePictureName;
                this.toastr.success('Order Successfully Submitted');
                localStorage.removeItem('carts');
                document.getElementById('totalCart').innerText = '0';
                this.router.navigate(['/my-order']);
              },
                // Or errors :-(
                error => {
                  console.log(error);
                  this.toastr.error('Unable to Save');
                  // tell us if it's finished
                  () => { console.log("completed") }
                }
              )
            }
          });
        }
      }
    })
  }


  onChangeAddressCheckbox() {
    if (this.sameAsPresentAddress) {
      this.customer.presentAddress = this.customer.permanentAddress
    }
  }
  onChangeNomineeAddressCheckbox() {
    if (this.sameAsNomineePresentAddress) {
      this.nominee.nomineePresentAddress = this.nominee.nomineePermanentAddress
    }
  }



  // Save Installment List
  onClickSaveInstallmentList() {

    this.trnInstallmentList = JSON.parse(JSON.stringify(this.trnInstallmentList)).map(element => {
      element['trnNo'] = this.transaction.trnNo
      return new RlTrn(element);
    });

    if (this.installmentModifyFlag) {
      this.transactionService.deleteInstallmentList(this.transaction.trnNo).subscribe(
        result => {
          this.transactionService.saveInstallmentList(this.trnInstallmentList).subscribe(
            result => {
              this.trnInstallmentList = JSON.parse(JSON.stringify(result.body)).map(element => {
                if (element['payFlag'] === 1) {
                  element['installmentPayStatus'] = 'Paid';
                }
                else if (element['payFlag'] === 2) {
                  element['installmentPayStatus'] = 'Partial';
                }
                else {
                  element['installmentPayStatus'] = 'Pending';
                }
                return new RlTrn(element);
              })

            },
            err => {
              // Do stuff whith your error
              if (err.text === 'insert successful') {
                this.toastr.error('Unable to save');
                // this.sizeList = result;
              }
            },
            () => {
              // Do stuff after completion
            }
          );
        },
        err => {
          // Do stuff whith your error
          if (err.text === 'insert successful') {
            this.toastr.error('Unable to Delete');
            // this.sizeList = result;
          }
        },
        () => {
          // Do stuff after completion
        }
      );
    } else {
      this.transactionService.saveInstallmentList(this.trnInstallmentList).subscribe(
        result => {
          this.trnInstallmentList = JSON.parse(JSON.stringify(result.body)).map(element => {
            if (element['payFlag'] === 1) {
              element['installmentPayStatus'] = 'Paid';
            }
            else if (element['payFlag'] === 2) {
              element['installmentPayStatus'] = 'Partial';
            }
            else {
              element['installmentPayStatus'] = 'Pending';
            }
            return new RlTrn(element);
          })

          console.log(this.trnInstallmentList)
          // this.toastr.success('Saved successfully ');
        },
        err => {
          // Do stuff whith your error
          if (err.text === 'insert successful') {
            this.toastr.error('Unable to save');
            // this.sizeList = result;
          }
        },
        () => {
          // Do stuff after completion
        }
      );
    }
  }
}
