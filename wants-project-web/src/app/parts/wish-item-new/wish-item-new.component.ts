import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-wish-item-new',
  templateUrl: './wish-item-new.component.html',
  styleUrls: ['./wish-item-new.component.scss']
})
export class WishItemNewComponent implements OnInit {

  wishItemForm = new FormGroup({
    url: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit(e: Event): void {
    console.log(this.wishItemForm.value.url);
    e.preventDefault();
  }

  get url(): AbstractControl {
    return this.wishItemForm.get('url');
  }

}
