import { CartService } from './../../../services/add-to-cart.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public cartList: any = [];

  constructor(private cartService: CartService, private http: HttpClient) { }
  public itemList: any = [];
  public totalPrice = 0;
  uuid: string;

  public customerNo = null;
  ngOnInit() {

    if (JSON.parse(localStorage.getItem("user"))) {
      this.customerNo = JSON.parse(localStorage.getItem("user")).customerNo
    }

    this.uuid = uuidv4();
    let tempList = this.cartService.getCarts();
    this.cartList = Object.values(tempList);
    let allCartNo = ''
    let i = 0;
    if (this.cartList.length > 0) {
      this.cartList.forEach(element => {
        i++;
        console.log("element", element, " - ", i);
        allCartNo += element.itemNo + ',';
      });
      this.http.get(`${acConfig.apiUrl}/rl/cu/item/`, {
        params: {
          itemNoList: allCartNo
        },
        observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.itemList = response.body;
          this.getTotalPrice();
        })
        .catch(console.log);
    }
  }

  onClickRemoveItem(item, index) {
    this.itemList.splice(index, 1);
    this.getTotalPrice();
    localStorage.removeItem('carts');
    this.itemList.forEach(element => {
      this.cartService.addCart({ 'uuid': this.uuid, 'itemNo': element.itemNo });
    });
    document.getElementById('totalCart').innerText = this.itemList.length;
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.itemList.forEach(element => {
      this.totalPrice += Number(element.totalPrice);
    });
  }
}
