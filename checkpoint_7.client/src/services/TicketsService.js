import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {

    async getAllTickets() {
        const res = await api.get('api/tickets')
        AppState.tickets = res.data.map(t => new Ticket(t))
        logger.log('[all tickets]', AppState.tickets)
    }
}

export const ticketsService = new TicketsService()