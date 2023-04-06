import { dbContext } from "../db/DbContext"


class TicketsService{

    async create(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate("creator", 'picture name')
        return ticket
    }
}

export const ticketsService = new TicketsService()