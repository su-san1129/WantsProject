export class RegisterPreUserForm {
  userId: string;
  name: string;
  mailAddress: string;
  password: string;
  constructor(userId, name, mailAddress, password) {
    this.userId = userId;
    this.name = name;
    this.mailAddress = mailAddress;
    this.password = password;
  }
}
