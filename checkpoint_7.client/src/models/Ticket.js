import { Profile } from "./Account"


export class Ticket {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = new Profile(data.profile)
    }
}