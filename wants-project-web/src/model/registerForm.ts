export class RegisterForm {
  name: string;
  mailAddress: string;
  password: string;
  constructor(name, mailAddress, password) {
    this.name = name;
    this.mailAddress = mailAddress;
    this.password = password;
  }
}
