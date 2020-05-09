import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { UserGroupRequest } from '../model/user-group-request';
import { UserGroupService } from '../service/user-group.service';
import { AuthenticateService } from '../service/authenticate.service';

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

  constructor(private fb: FormBuilder, private userGroupService: UserGroupService, private auth: AuthenticateService) { }

  userGroupRequest: UserGroupRequest;
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
    this.userGroupService.getGroupByuserId(this.auth.userId).subscribe(
      userGroup => console.log(userGroup)
    );
  }

  submit(e: Event): void {
    console.log('submit method');
    const mailList: string[] = this.options.value.filter(ary => ary.mailAddress).map(ary => ary.mailAddress);
    mailList.push(this.userGroupForm.get('mailAddress').value);
    this.userGroupRequest = new UserGroupRequest(this.groupName.value, mailList);
    console.log(this.userGroupRequest);
    this.userGroupService.saveUserGroup(this.userGroupRequest).subscribe(
      belongsToGroupUsers => console.log(belongsToGroupUsers)
    );
    e.preventDefault();
  }

  addOptionForm() {
    this.options.push(this.optionForm);
  }

  removeOptionForm(index: number) {
    this.options.removeAt(index);
  }

  get groupName(): AbstractControl {
    return this.userGroupForm.get('groupName');
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
