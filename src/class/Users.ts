export class Users {
  public name: String;
  public job: String;
  public id?: string;
  public createdAt?: string;

  constructor(name: String, job: String) {
    this.name = name;
    this.job = job;
  }
  UserCompleto(name: string, job: string, id: string, createdAt: string) {
    this.name = name;
    this.job = job;
    this.id = id;
    this.createdAt = createdAt;
  }
}
