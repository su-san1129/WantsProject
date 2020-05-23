import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserGroupService } from '../service/user-group.service';

@Component({
  selector: 'app-user-group-confirm',
  templateUrl: './user-group-confirm.component.html',
  styleUrls: ['./user-group-confirm.component.scss']
})
export class UserGroupConfirmComponent implements OnInit {

  constructor(private router: ActivatedRoute, private userGroupService: UserGroupService) { }
  groupName = 'sample';
  groupId: string;

  ngOnInit(): void {
    this.groupId = this.router.snapshot.queryParamMap.get('id');
    console.log(this.groupId);
    this.userGroupService.getGroupById(this.groupId).subscribe(
      userGroup => this.groupName = userGroup.name
    );

  }

  join() {

  }

}
