import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { WishService } from 'src/app/service/wish.service';
import { WishItem } from 'src/app/model/wish-item';

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
    imagePath: new FormControl(''),
  });

  wishItem: WishItem;
  imgPath = '/assets/images/default.png';

  constructor(private wishService: WishService) {}

  ngOnInit(): void {}

  submit(e: Event): void {
    console.log(this.wishItemForm.value.url);
    this.wishService.save(this.url.value).subscribe((wishItem) => {
      console.log(wishItem);
      this.wishItem = wishItem;
      if (wishItem.imagePath !== '' && wishItem.imagePath !== null) {
        this.imgPath = wishItem.imagePath;
      } else {
        this.imgPath = '/assets/images/default.png';
      }
    });
    e.preventDefault();
  }

  saveWishItem() {

  }

  get url(): AbstractControl {
    return this.wishItemForm.get('url');
  }
}
