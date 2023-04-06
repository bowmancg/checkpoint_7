import { Profile } from "./Account";

export class TowerEvent{
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator ? new Profile(data.creator) : null
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.type = data.type
        this.startDate = data.startDate
        this.isCanceled = data.isCanceled
    }
}

export class TowerEventTicket extends TowerEvent {
    constructor(data) {
        super(data.TowerEvent)
        this.ticketId = data.id
    }
}