import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Inject } from '@angular/core';
import { WishItem } from 'src/app/model/wish-item';
import { WishService } from 'src/app/service/wish.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-wish-list-show',
  templateUrl: './wish-list-show.component.html',
  styleUrls: ['./wish-list-show.component.scss']
})
export class WishListShowComponent implements OnInit {

  @Input() wishItems: WishItem[];
  @Output() wishItemsChange: EventEmitter<WishItem[]> = new EventEmitter<WishItem[]>();

  isMouseEnter = false;

  constructor(private wishService: WishService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public deleteWishItem(id: number) {
    this.wishService.deleteWishItem(id).subscribe(
      () => {
        this.wishItems = this.wishItems.filter(item => item.id !== id);
        this.wishItemsChange.emit(this.wishItems);
      },
      () => this.snackBar.open('削除に失敗しました', '閉じる', { duration: 2500 })
    );

  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  cardMouseEnter() {
    this.isMouseEnter = true;
  }

  cardMouseLeave() {
    this.isMouseEnter = false;
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWishItem(result);
      }
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DeleteDialog {

  constructor(public dialogRef: MatDialogRef<DeleteDialog>, @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.dialogRef.close(this.data);
  }

}
