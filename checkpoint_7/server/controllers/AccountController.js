import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService'


export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get("/tickets", this.getTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getTickets(req, res, next) {
    try {
        let accountId = req.userInfo.id
        let tickets = await ticketsService.getTicketsByAccount(accountId)
        return res.send(tickets)
    } catch (error) {
        next(error)
    }
}
}
