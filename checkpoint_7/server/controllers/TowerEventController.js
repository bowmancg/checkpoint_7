import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from '../services/TowerEventsService'
import { ticketsService } from '../services/TicketsService'


export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get("", this.getAll)
            .get("/:id", this.getById)
            .get("/:id/tickets", this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put("/:towerEventId", this.editById)
            .post("", this.create)
            .delete("/:towerEventId", this.cancelEvent)
    }

    async create(req, res, next) {
        try {
            let towerEventData = req.body
            towerEventData.creatorId = req.userInfo.id
            let towerEvent = await towerEventsService.create(towerEventData)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            let towerEvents = await towerEventsService.getAll()
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            let towerEventId = req.params.id
            let towerEvent = await towerEventsService.getById(towerEventId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async editById(req, res, next) {
        try {
            const towerEventEdit = req.body
            const towerEventId = req.params.towerEventId
            const towerEvent = await towerEventsService.editById(towerEventEdit, towerEventId)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            let userId = req.userInfo.id
            let towerEventId = req.params.towerEventId
            let message = await towerEventsService.cancelEvent(towerEventId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            let eventId = req.params.id
            let tickets = await ticketsService.getEventTickets(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
}