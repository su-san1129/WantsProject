export class UserGroupRequest {
  name: string;
  mailList: string[];
  constructor(name: string, mailList: string[]) {
    this.name = name;
    this.mailList = mailList;
  }
}
