import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserGroupService } from 'src/app/service/user-group.service';
import { RegisterUserFromGroupDialogComponent } from '../register-user-from-group-dialog/register-user-from-group-dialog.component';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-register-user-from-group',
  templateUrl: './register-user-from-group.component.html',
  styleUrls: ['./register-user-from-group.component.scss']
})
export class RegisterUserFromGroupComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private userGroupService: UserGroupService,
    public authService: AuthenticateService
  ) { }

  groupName = 'sample';
  groupId: string;
  preUser: User;

  ngOnInit(): void {
    const userId = atob(this.router.snapshot.params.userId);
    this.groupId = this.router.snapshot.queryParamMap.get('id');
    console.log(this.groupId);
    this.userGroupService.getPreUser(userId).subscribe(preUser => {
      this.preUser = preUser;
      console.log(this.preUser);
    });
    this.userGroupService.getGroupById(this.groupId).subscribe(
      userGroup => this.groupName = userGroup.name
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterUserFromGroupDialogComponent, {
      width: '500px',
      data: this.preUser
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
