import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../../../Services/Payment/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../Services/Cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { CreditOrder } from '../../../../Interfaces/Order/order';

@Component({
  selector: 'app-shipping-address-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address-details.component.html',
  styleUrl: './shipping-address-details.component.scss'
})
export class ShippingAddressDetailsComponent {
  isLoading:boolean = false;
  cartId!:string;
  platformId:Object = inject(PLATFORM_ID);
  constructor(private _PaymentService:PaymentService, private _ActivatedRoute:ActivatedRoute, private _Router:Router, private _ToastrService:ToastrService, private _CartService:CartService){}

  shippingAddressForm:FormGroup = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^((\+20)|(0))?(10|11|12|15){1}[0-9]{8}$/)]),
    city: new FormControl('', Validators.required)
  });

  paymentMethodForm:FormGroup = new FormGroup({
    payment: new FormControl('', Validators.required)
  });

  onSubmit():void {
    this.isLoading = true;
    this._ActivatedRoute.params.subscribe(res => {
      this.cartId = res['cartId'];
    })
    if(this.shippingAddressForm.valid && this.paymentMethodForm.valid) {
      if(this.paymentMethodForm.value.payment === 'cash') {
        this._PaymentService.createCashOrder(this.cartId, this.shippingAddressForm.value).subscribe(res => {
          this._ToastrService.success("Ordered created successfully.", "Order Created!", {
            progressBar: true,
            timeOut: 3000
          })
          this._Router.navigate(['/home-page']);
          this._CartService.cartItemsCount.next(0);
        })
      }
      else if(this.paymentMethodForm.value.payment === 'credit') {
        if(isPlatformBrowser(this.platformId)) {
          this._PaymentService.createCreditOrder(this.cartId, this.shippingAddressForm.value).subscribe(res => {
            window.location.href = (res as CreditOrder).session.url;
          })
        }
      }
    }
  }
}
