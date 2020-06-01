import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { WishService } from 'src/app/service/wish.service';
import { WishItem } from 'src/app/model/wish-item';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wish-item-new',
  templateUrl: './wish-item-new.component.html',
  styleUrls: ['./wish-item-new.component.scss'],
})
export class WishItemNewComponent implements OnInit {

  wishItemForm = new FormGroup({
    url: new FormControl('', Validators.required),
    name: new FormControl(''),
    price: new FormControl(''),
    salePrice: new FormControl(''),
    imagePath: new FormControl('')
  });

  @Output() sendWishItem = new EventEmitter<WishItem>();

  wishItem: WishItem;
  imgPath = '/assets/images/default.png';
  flag = false;

  constructor(private wishService: WishService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  analysisUrl(e: Event): void {
    this.flag = true;
    this.wishService.save(this.url.value).subscribe((wishItem) => {
      console.log(wishItem);
      this.name.setValue(wishItem.name);
      this.price.setValue(wishItem.price);
      this.salePrice.setValue(wishItem.salePrice);
      this.imagePath.setValue(wishItem.imagePath);
      this.url.setValue(wishItem.url);
      this.checkImgPath(wishItem);
    },
      () => this.flag = false,
      () => this.flag = false
    );
    e.preventDefault();
  }

  saveWishItem() {
    this.wishItem = new WishItem();
    this.wishItem.name = this.name.value;
    this.wishItem.price = this.price.value;
    this.wishItem.salePrice = this.salePrice.value;
    this.wishItem.imagePath = this.imagePath.value;
    this.wishItem.url = this.url.value;
    this.wishService.saveWishItem(this.wishItem).subscribe(
      wishItem => {
        console.log(wishItem);
        this.snackBar.open('登録が完了しました！', '閉じる', { duration: 2500 });
        this.sendWishItem.emit(wishItem);
        this.imgPath = '/assets/images/default.png';
        this.wishItemForm.reset();
      },
      () => this.snackBar.open('登録に失敗しました', '閉じる', { duration: 2500 })
    );
  }

  get url(): AbstractControl {
    return this.wishItemForm.get('url');
  }

  get name(): AbstractControl { return this.wishItemForm.get('name'); }
  get price(): AbstractControl { return this.wishItemForm.get('price'); }
  get salePrice(): AbstractControl { return this.wishItemForm.get('salePrice'); }
  get imagePath(): AbstractControl { return this.wishItemForm.get('imagePath'); }

  private checkImgPath(wishItem: WishItem) {
    if (wishItem.imagePath !== '' && wishItem.imagePath !== null) {
      this.imgPath = wishItem.imagePath;
    } else {
      this.imgPath = '/assets/images/default.png';
    }
  }
}
