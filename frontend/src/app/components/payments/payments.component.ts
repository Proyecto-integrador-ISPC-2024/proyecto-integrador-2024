import { Component } from '@angular/core';
import { payments } from '../../../data/db.json'

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  paymentLogo = [""];
  paymentsAssets = payments;
  ngOnInit(){
    payments.forEach(payment => {
      this.paymentLogo.push(payment.americanExpress, payment.mastercard, payment.paypal, payment.visa);
    });
    console.log(this.paymentLogo);
  }

}
