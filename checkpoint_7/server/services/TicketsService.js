import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"


class TicketsService{

    async create(ticketData) {
        const towerEvent = await towerEventsService.getById(ticketData.eventId)
        // if (towerEvent.isCanceled =  true) {
        //     throw new BadRequest('An error has occurred.')
        // }
        let ticket = await dbContext.Ticket.create(ticketData)
        towerEvent.capacity--
        await towerEvent.save()
        await ticket.populate({
            path: "event"
            // populate: {
            //     path: "creator"
            // }
        })
        await ticket.populate("profile")
        return ticket
    }

    async getTicketsByAccount(accountId) {
        let tickets = await dbContext.Ticket.find({accountId})
        .populate("event")
        return tickets
    }

    async getEventTickets(eventId) {
        let tickets = await dbContext.Ticket.find({ eventId })
        .populate("profile")
        return tickets
    }

    async deleteTicket(ticketId, userId, ticketData) {
        let ticket = await dbContext.Ticket.findById(ticketId)
        if (ticket == null) {
            throw new BadRequest("No tickets left.")
        }
        if (userId != ticket.accountId) {
            throw new Forbidden("You can't delete this.")
        }
        const towerEvent = await towerEventsService.getById(ticketData.eventId)
        towerEvent.capacity++
        await ticket.remove()

    }
}

export const ticketsService = new TicketsService()