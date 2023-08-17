export default class UserDto {
  public email: string;
  public id: number;
  public name: string;

  constructor(email: string, id: number, name: string) {
    this.email = email;
    this.id = id;
    this.name = name;
  }
}
