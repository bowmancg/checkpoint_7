import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from '../services/TowerEventsService'


export class TowerEventController extends BaseController {
constructor(){
    super('api/events')
    this.router
    .get("", this.getAll)
    .get("/:id", this.getById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .put("/:towerEventId", this.editById)
    .post("", this.create)
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
}