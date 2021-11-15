import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/interfaces';
import {ItemService} from "../shared/item.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Item[] =[]
  totalPrice = 0
  form : FormGroup
  submitted = false
  test = "https://blowfashion.com.ua/wp-content/uploads/2021/11/4FD48267-62E9-4E9A-844A-49E469596F73-scaled.jpeg"

  constructor(private itemsService: ItemService) { }

  ngOnInit(): void {
    this.cartItems = this.itemsService.cartItems
    for (let i = 0; i < this.cartItems.length; i++){
      this.totalPrice += +this.cartItems[i].price
    }
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartItems,
      price: this.totalPrice,
      date: new Date()
    }
    console.log('Order:', order)
    this.form.reset()
  }

  delete(item) {
    this.totalPrice -= +item.price
    this.cartItems.splice(this.cartItems.indexOf(item), 1)
  }
}
