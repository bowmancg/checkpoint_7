import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post("", this.create)
        .delete("/:id", this.deleteTicket)
    }
    
    async create(req, res, next) {
        try {
            let ticketData = req.body
            ticketData.accountId = req.userInfo.id
            let ticket = await ticketsService.create(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(req, res, next) {
        try {
            let ticketId = req.params.id
            let userId = req.userInfo.id
            let ticket = await ticketsService.deleteTicket(ticketId, userId)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}