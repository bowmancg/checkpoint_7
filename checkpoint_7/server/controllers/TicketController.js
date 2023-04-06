import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post("", this.create)
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
}