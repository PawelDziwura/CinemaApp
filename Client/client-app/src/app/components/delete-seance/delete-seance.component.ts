import { Component, OnInit, Inject } from '@angular/core';
import { SeanceService } from 'src/app/services/seance.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-delete-seance',
  templateUrl: './delete-seance.component.html',
  styleUrls: ['./delete-seance.component.scss']
})
export class DeleteSeanceComponent implements OnInit {

  id: number;

  constructor(
    private seanceService: SeanceService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DeleteSeanceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
     }

  onOkClick(){
    this.seanceService.deleteSeance(this.id).subscribe(result => {
      this.notificationService.showSuccess('Seance deleted.', 'Success!');
      this.dialogRef.close();
      window.location.reload();
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
