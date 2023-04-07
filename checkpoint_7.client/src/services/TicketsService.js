import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { TowerEventTicket } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {

    async getEventMembers(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.eventTickets = res.data.map(e => new Ticket(e))
        logger.log('[ticket to an event]', AppState.eventTickets)
    }

    async createTicket(eventData) {
        const res = await api.post('api/tickets', eventData)
        AppState.eventTickets.push(new Ticket(res.data))
        AppState.myTowerEvents.push(new TowerEventTicket(res.data))
        logger.log('[added ticket]', res.data)
    }

    
}

export const ticketsService = new TicketsService()