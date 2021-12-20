import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { acConfig } from '../../../../../app.config'
import { HttpClient } from '@angular/common/http';
import { FlatDetails } from '../../../../../models/flat-details.model';
import { Customer } from '../../../../../models/customer.model';
import { fixedValues } from '../../../../../fixedValues';
import { RlTrn } from '../../../../../models/rl-trn.model';
import { RlTrnNominee } from '../../../../../models/nominee.model';
import { Rl1019Service } from './../../../../../services/rl1019/rl1019-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { SaCompany } from './../../../../../models/sa-company.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rl1019',
  templateUrl: './rl1019.component.html'
})
export class RL1019Component implements OnInit {
  public countryList = fixedValues.countryList;
  public saCompanyInfo = new SaCompany;
  public customerPhotoUrl;
  public customerPhotoFile: File;
  public customerSignatureFile: File;
  public nomineePhotoFile: File;
  public professionList;
  public isDisabled = true;
  public nominee: any = new RlTrnNominee();
  public itemList: any = [];
  public customerList: any = [];
  public itemObj = new FlatDetails;
  public customer = new Customer();
  public transaction = new RlTrn();
  public trnInstallmentList = new Array<RlTrn>();
  public signaturePhotoUrl;
  public editMode = false;
  public nomineePhotoUrl;
  public settlementPriceSpellOut: any;
  public bookingAmountSpellOut: any;
  public remainingAmountSpellOut: any;
  public paramId;
  public installLastDate: Date;
  public sameAsPresentAddress = false;
  public sameAsnomineePresentAddress = false;
  public installmentModifyFlag = false;
  public installmentPayCount: number = 0;
  public installmentPayAmount: number = 0;

  constructor(
    private http: HttpClient,
    private rl1019Service: Rl1019Service,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {
    this.saCompanyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  }

  ngOnInit() {
    this.paramId = this.route.snapshot.params.id;
    if (!this.paramId) {
      this.transaction.installStartDate = new Date();
    }
    this.getItemList();
    this.getCustomerList();
    this.getProfessionList();

    if (!this.editMode) {
      this.trnInstallmentList.push(new RlTrn());
    }
  }


  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  @ViewChild('fileSignatureInput')
  myInputVariableSignature: ElementRef;
  @ViewChild('fileNomineeInput')
  myInputVariableNominee: ElementRef;

  getCustomerList() {
    this.http.get(`${acConfig.apiUrl}/rl/customer/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.customerList = response.body;
      })
      .catch(console.log);
  }

  fileSignatureChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.customerSignatureFile = event.target.files[0];
    }
  }

  fileNomineeChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.nomineePhotoFile = event.target.files[0];
    }
  }

  fileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.customerPhotoFile = event.target.files[0];
    }
  }

  onClickAddNew() {
    this.editMode = false;
    this.paramId = '';
    this.getItemList();
    this.itemObj = new FlatDetails;
    this.customer = new Customer();
    this.transaction = new RlTrn();
    this.transaction.installStartDate = new Date();
    this.nominee = new RlTrnNominee();
    this.trnInstallmentList.length = 0;
    this.settlementPriceSpellOut = '';
    this.bookingAmountSpellOut = '';
    this.remainingAmountSpellOut = '';
    this.customerPhotoUrl = '';
    this.nomineePhotoUrl = '';
    this.signaturePhotoUrl = '';
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

  onChangeGetItemDetails() {
    if (this.itemObj.itemNo != null) {
      this.getItemDetails(this.itemObj.itemNo);
    }
  }

  onChangeGetCustomerDetails() {
    if (this.customer.customerNo !== null) {
      this.getCustomerDetails(this.customer.customerNo);
    }
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
        this.itemObj = new FlatDetails(response.body);
        this.itemObj['projectLayoutPhoto'] = acConfig.fileUrl + this.itemObj.itemBrandPhoto;
        this.transaction.totalPrice = this.transaction.totalPrice ? this.transaction.totalPrice : this.itemObj.totalPrice;
        this.transaction.settlementPrice = this.transaction.settlementPrice ? this.transaction.settlementPrice : this.itemObj.netPrice;
        this.transaction.trnDate = this.transaction.trnDate ? this.transaction.trnDate : new Date;
        this.getInWordSettlementPrice();

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
        this.signaturePhotoUrl = acConfig.fileUrl + this.transaction.customerSignatureName;
        this.getItemDetails(this.transaction.itemNo); (this.transaction.customerNo);
        this.getCustomerDetails(this.transaction.customerNo);
        this.getNomineeDetails(this.transaction.trnNo);
        this.onChangeGetBookingAmtSpell();
        this.onChangeRemainingAmountSpell();
        this.getTrnInstallmentList();
      })
      .catch(console.log);
  }
  getNomineeDetails(id) {
    this.http.get(`${acConfig.apiUrl}/rl/trn/nominee/get-nominee`, {
      params: {
        trnNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.nominee = new RlTrnNominee(JSON.parse(JSON.stringify(response.body)))
        this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nomineePictureName;

      })
      .catch(console.log);
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

  getTrnInstallmentList() {
    this.http.get(`${acConfig.apiUrl}/rl/trn/installment/trn-wise-list`, {
      params: {
        trnNo: '' + this.transaction.trnNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.trnInstallmentList = JSON.parse(JSON.stringify(response.body)).map(element => {
          if (element['payFlag'] === 1) {
            element['installmentPayStatus'] = 'Paid';
          } else if (element['payFlag'] === 2) {
            element['installmentPayStatus'] = 'Partial';
          }
          else {
            element['installmentPayStatus'] = 'Pending';
          }
          return new RlTrn(element);
        })
        let installmentList = this.trnInstallmentList.filter(i => i.payFlag > 0)
        this.installmentPayCount = installmentList.length;
        for (let installment of installmentList) {
          if (Number(JSON.parse(JSON.stringify(installment)).installmentAmount) > 0) {
            this.installmentPayAmount += Number(JSON.parse(JSON.stringify(installment)).installmentAmount)
          }
        }
      })
      .catch(console.log);
  }


  // Calculate Down Payment PCT to Amount
  calDownPayAmount() {
    this.transaction.downPaymentAmount = Number(((Number(this.transaction.settlementPrice) - Number(this.transaction.bookingAmount)) * Number(this.transaction.downPaymentPct) / 100).toFixed(2));
    this.calculateRemainingAmount();
  }

  changeDwnPaymentAmount() {
    this.calculateRemainingAmount();
  }

  changeBookingAmount() {
    this.onChangeGetBookingAmtSpell();
    this.calculateRemainingAmount();
  }

  calculateRemainingAmount() {
    this.transaction.remainingAmount = (Number(this.transaction.settlementPrice) - (Number(this.transaction.bookingAmount) + Number(this.transaction.downPaymentAmount)));
    this.onChangeRemainingAmountSpell();
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
    body.append("customerPhoto", this.customerPhotoFile);
    body.append("cpAddress", this.customer.cpAddress);
    body.append("cpEmail", this.customer.cpEmail);


    // Launch post request
    this.http.put(`${acConfig.apiUrl}/rl/customer/update`, body)
      .subscribe(
        (data) => {
          this.customer = new Customer(data);
          this.customerPhotoUrl = acConfig.fileUrl + this.customer.customerPictureName;
          this.clearProfilePicture();
        },
        error => {
          console.log(error);
        },
        // tell us if it's finished
        () => { console.log("completed") }
      );
  }


  getInWordSettlementPrice() {
    if (this.transaction.settlementPrice > 0) {
      this.transaction.settlementPrice = Number(this.transaction.settlementPrice.toFixed(2))
      this.http.get(`${acConfig.apiUrl}/sa/company/spellout`, {
        params: {
          value: '' + this.transaction.settlementPrice
        },
        observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.settlementPriceSpellOut = JSON.parse(JSON.stringify(response.body)).spellout;
        })
        .catch(console.log);
    }
  }


  onChangeGetBookingAmtSpell() {
    if (this.transaction.bookingAmount > 0) {
      this.http.get(`${acConfig.apiUrl}/sa/company/spellout`, {
        params: {
          value: '' + this.transaction.bookingAmount
        },
        observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.bookingAmountSpellOut = JSON.parse(JSON.stringify(response.body)).spellout;
        })
        .catch(console.log);
    }
  }

  onChangeRemainingAmountSpell() {
    if (this.transaction.remainingAmount > 0) {
      this.transaction.remainingAmount = Number(this.transaction.remainingAmount.toFixed(2));
      this.http.get(`${acConfig.apiUrl}/sa/company/spellout`, {
        params: {
          value: this.transaction.remainingAmount.toFixed(2)
        },
        observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.remainingAmountSpellOut = JSON.parse(JSON.stringify(response.body)).spellout;
        })
        .catch(console.log);
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

  getCustomerDetails(customerNo) {
    this.http.get(`${acConfig.apiUrl}/rl/customer/get-customer`, {
      params: {
        customerNo: customerNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.customer = new Customer(response.body);
        this.customerPhotoUrl = acConfig.fileUrl + this.customer.customerPictureName;
      })
      .catch(console.log);
  }

  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = "";
  }

  // Save Installment List
  onClickSaveInstallmentList() {

    this.trnInstallmentList = JSON.parse(JSON.stringify(this.trnInstallmentList)).map(element => {
      element['trnNo'] = this.transaction.trnNo
      return new RlTrn(element);
    });

    if (this.installmentModifyFlag) {
      this.rl1019Service.deleteInstallmentList(this.transaction.trnNo).subscribe(
        result => {
          this.rl1019Service.saveInstallmentList(this.trnInstallmentList).subscribe(
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
          }
        },
        () => {
          // Do stuff after completion
        }
      );
    } else {
      this.rl1019Service.saveInstallmentList(this.trnInstallmentList).subscribe(
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
          }
        },
        () => {
          // Do stuff after completion
        }
      );
    }
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
                this.rl1019Service.saveTransaction(obj).subscribe(result => {
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
                          this.rl1019Service.saveNominee(this.nominee).subscribe(result => {
                            this.nominee = new RlTrnNominee(result);
                            this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nomineePictureName;
                            this.myInputVariableNominee.nativeElement.value = "";
                          },
                            error => {
                              this.toastr.error('Unable to Save');
                              () => { console.log("completed") }
                            });
                        },
                        error => {
                          this.toastr.error('Unable to Upload');
                          () => { console.log("completed") }
                        }
                      );
                  } else {
                    this.rl1019Service.saveNominee(this.nominee).subscribe(result => {
                      this.nominee = new RlTrnNominee(result);
                      this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nominee.nomineePictureName;
                      this.toastr.success('Order Successfully Submitted');
                    },
                      error => {
                        this.toastr.error('Unable to Save');
                        () => { console.log("completed") }
                      }
                    )
                  }
                });
              },
              // Or errors :-(
              error => {
                this.toastr.error('Unable to Upload');
                // tell us if it's finished
                () => { console.log("completed") }
              }
            );
        } else {
          this.rl1019Service.saveTransaction(obj).subscribe(result => {
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
                    this.rl1019Service.saveNominee(this.nominee).subscribe(result => {
                      this.nominee = new RlTrnNominee(result);
                      this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nomineePictureName;
                      this.myInputVariableNominee.nativeElement.value = "";
                    },
                      error => {
                        this.toastr.error('Unable to Save');
                        () => { console.log("completed") }
                      });
                  },
                  error => {
                    this.toastr.error('Unable to Upload');
                    () => { console.log("completed") }
                  }
                );
            } else {

              this.rl1019Service.saveNominee(this.nominee).subscribe(result => {
                this.nominee = new RlTrnNominee(result);
                this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nomineePictureName;
                this.toastr.success('Order Successfully Submitted');
              },
                error => {
                  this.toastr.error('Unable to Save');
                  () => { console.log("completed") }
                }
              )
            }
          });
        }
      }
    })
  }

  onClickDeleteOrder() {

    this.alertService.warning("Do you want to Confirm this order?", true).then(data => {
      if (data) {

        this.http.get(`${acConfig.apiUrl}/rl/trn/installment/coll-status`, {
          params: {
            trnNo: '' + this.transaction.trnNo
          },
          observe: 'response'
        })
          .toPromise()
          .then(response => {

            let tempTrnNo = JSON.parse(JSON.stringify(response.body)).STATUS;

            if (tempTrnNo === 1) {
              this.toastr.warning('Installment Already Collected');
            } else {
              // Delete Rl Trn Installment
              this.rl1019Service.deleteInstallmentList(this.transaction.trnNo).subscribe(result => {
                this.toastr.success('Installment Deleted')
                // Delete RL Trn Nominee
                this.rl1019Service.deleteNominee(this.nominee.nomineeNo).subscribe(result => {
                  this.toastr.success('Nominee Deleted')
                  // Delete RL Transaction
                  this.rl1019Service.deleteTransaction(this.transaction.trnNo).subscribe(result => {
                    this.toastr.success('Transaction Deleted');
                    this.onClickAddNew();
                  }, err => { this.toastr.error('Unable to Delete'); }, () => { });
                }, err => { this.toastr.error('Unable to Delete'); }, () => { });

              }, err => { this.toastr.error('Unable to Delete'); }, () => { });
            }
          })
          .catch(console.log);
      }
    })
  }

  onChangeAddressCheckbox() {
    if (this.sameAsPresentAddress) {
      this.customer.presentAddress = this.customer.permanentAddress
    }
  }
  onChangeNomineeAddressCheckbox() {
    if (this.sameAsnomineePresentAddress) {
      this.nominee.nomineePresentAddress = this.nominee.nomineePermanentAddress
    }
  }

  generatePdf(pRepType) {
    let i = 0;
    let doc = new jsPDF();

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
