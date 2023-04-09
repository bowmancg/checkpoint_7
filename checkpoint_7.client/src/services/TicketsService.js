import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { TowerEventTicket } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {

    async getEventTickets(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map(e => new Ticket(e))
        logger.log('[ticket to an event]', AppState.tickets)
    }

    // async getEventTicketByUserId(userId) {
    //     const res = await api.get(`api/tickets/`)
    // }

    async getTicketsByUserId() {
        const res = await api.get(`account/tickets`)
        AppState.myTowerEvents = res.data.map(t => new TowerEventTicket(t))
        logger.log('[user ticket]', AppState.myTowerEvents)
    }

    async createTicket(eventData) {
        const res = await api.post('api/tickets', eventData)
        AppState.tickets.push(new Ticket(res.data))
        AppState.myTowerEvents.push(new TowerEventTicket(res.data))
        logger.log('[added ticket]', res.data)
    }

    async deleteTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('[deleting ticket]', res.data)
        const ticketIndex = AppState.tickets.findIndex(t => t.ticketId == ticketId)
        if (ticketIndex !== -1) {
            AppState.tickets.splice(ticketIndex, 1)
        }
        const myTowerEventIndex = AppState.myTowerEvents.findIndex(m => m.ticketId == ticketId)
        if (myTowerEventIndex !== -1) {
            AppState.tickets.splice(myTowerEventIndex, 1)
        }
    }


}

export const ticketsService = new TicketsService()