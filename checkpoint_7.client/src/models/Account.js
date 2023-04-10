export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    // TODO add additional properties if needed
    this.subs = data.subs
    this.picture = data.picture
  }
}

export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
  }
}