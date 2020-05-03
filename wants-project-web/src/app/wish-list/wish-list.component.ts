import { Component, OnInit } from '@angular/core';
import { ThemePalette, CanColorCtor } from '@angular/material/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})

export class WishListComponent implements OnInit {

  constructor() { }

  backGround = 'primary';
  ngOnInit(): void {
  }

}
