import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { UserGroupRequest } from '../model/user-group-request';
import { UserGroupService } from '../service/user-group.service';
import { AuthenticateService } from '../service/authenticate.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserGroup } from '../model/user-group';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserGroupComponent implements OnInit {

  constructor(private fb: FormBuilder, private userGroupService: UserGroupService, private auth: AuthenticateService) { }

  dataSource: UserGroup[];
  columnsToDisplay = ['#', '名前', '作成日', '更新日'];
  expandedElement: string[] | null;

  userGroupRequest: UserGroupRequest;
  userGroupForm: FormGroup;
  userGroup: UserGroup[];

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
      userGroup => {
        this.userGroup = userGroup;
        this.dataSource = this.userGroup;
      }
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

  getColumn(column: string) {
    switch (column) {
      case '#':
        return 'id';
      case '名前':
        return 'name';
      case '作成日':
        return 'createdAt';
      case '更新日':
        return 'updatedAt';
    }
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
