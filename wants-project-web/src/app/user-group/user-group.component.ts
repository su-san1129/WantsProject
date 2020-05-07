import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  userGroupForm: FormGroup;
  initForm() {
    this.userGroupForm = this.fb.group({
      groupName: [''],
      mailAddress: [''],
      options: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  submit(e: Event): void {
    console.log('submit method');
    e.preventDefault();
  }

  addOptionForm() {
    this.options.push(this.optionForm);
  }

  removeOptionForm(index: number) {
    this.options.removeAt(index);
  }

  get optionForm(): FormGroup {
    return this.fb.group({
      mailAddress: [''],
    });
  }

  get options(): FormArray {
    return this.userGroupForm.get('options') as FormArray;
  }

}
