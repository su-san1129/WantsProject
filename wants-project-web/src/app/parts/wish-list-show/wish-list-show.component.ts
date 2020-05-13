import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { WishItem } from 'src/app/model/wish-item';
import { WishService } from 'src/app/service/wish.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wish-list-show',
  templateUrl: './wish-list-show.component.html',
  styleUrls: ['./wish-list-show.component.scss']
})
export class WishListShowComponent implements OnInit {

  @Input() wishItems: WishItem[];
  @Output() wishItemsChange: EventEmitter<WishItem[]> = new EventEmitter<WishItem[]>();

  constructor(private wishService: WishService, private snackBar: MatSnackBar) { }

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

}
