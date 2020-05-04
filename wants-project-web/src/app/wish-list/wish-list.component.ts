import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette, CanColorCtor } from '@angular/material/core';
import { WishItem } from '../model/wish-item';
import { WishService } from '../service/wish.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})

export class WishListComponent implements OnInit {

  constructor(private wishService: WishService) { }

  wishItems: WishItem[] = [];

  backGround = 'primary';
  ngOnInit(): void {
    console.log('onInit');
    this.wishService.getWishItems().subscribe(
      wishItems => this.wishItems = wishItems
    );
  }

  updateWishItems(wishItem: WishItem) {
    console.log('updateWishItems', wishItem);
    this.wishItems.push(wishItem);
  }

}
