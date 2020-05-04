import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WishItem } from 'src/app/model/wish-item';
import { WishService } from 'src/app/service/wish.service';

@Component({
  selector: 'app-wish-list-show',
  templateUrl: './wish-list-show.component.html',
  styleUrls: ['./wish-list-show.component.scss']
})
export class WishListShowComponent implements OnInit {

  @Input() wishItems: WishItem[];

  constructor() { }

  ngOnInit(): void {
  }
}
