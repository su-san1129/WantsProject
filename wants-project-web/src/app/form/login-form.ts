export class LoginForm {
  mailAddress: string;
  password: string;
  constructor(mailAddress, password) {
    this.mailAddress = mailAddress;
    this.password = password;
  }
}
