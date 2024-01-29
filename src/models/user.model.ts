export class User implements UserModel {
  name: string;
  email: string;
  _id: string;
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this._id = id;
  }
}

export interface UserModel {
  name: string;
  email: string;
  _id: string;
}
