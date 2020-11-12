import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/models/order';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-order-refund',
  templateUrl: './order-refund.component.html',
  styleUrls: ['./order-refund.component.scss']
})
export class OrderRefundComponent implements OnInit {

  id: number;
  order: Order;
  errorMessage: string = null;

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<OrderRefundComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.order = data.order;
     }

  onOkClick(){
    this.orderService.deleteOrder(this.order.id).subscribe(result =>{
      if(result != null && result.validationMessages.length > 0)
        this.errorMessage = result.validationMessages[0];
      else{
        this.notificationService.showSuccess('Your order has been refunded.', 'Success!');
        this.dialogRef.close();
        window.location.reload()
      }
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
