import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wish-list-show',
  templateUrl: './wish-list-show.component.html',
  styleUrls: ['./wish-list-show.component.scss']
})
export class WishListShowComponent implements OnInit {

  @Input()
  row: number;
  @Input()
  col: number;
  @Input()
  border: string;

  cards = [
    { col: 1, border: '1px solid' },
    { col: 1, border: '1px solid' },
    { col: 1, border: '1px solid' },
    { col: 1, border: '1px solid' },
    { col: 1, border: '1px solid' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
