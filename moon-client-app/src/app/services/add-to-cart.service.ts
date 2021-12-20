import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    
    constructor() { }

    getCarts() {
        if (this.checkCarts() === null) {
            return {};
        } else {
            return JSON.parse(this.checkCarts());
        }
    }

    addCart(cart: any) {
        let carts = {};
        if (this.checkCarts() === null) {
            carts[cart.uuid] = cart;
        } else {
            carts = JSON.parse(this.checkCarts());
            carts[cart.uuid] = cart;
        }
        localStorage.setItem('carts', JSON.stringify(carts));
    }

    checkCarts() {
        return localStorage.getItem('carts');
    }

    getCart(uuid) {
        let cart = null;
        if (this.checkCarts() !== null) {
            let carts = JSON.parse(this.checkCarts());
            cart = (carts.hasOwnProperty(uuid)) ? carts[uuid] : null;
        }
        return cart;
    }

}
