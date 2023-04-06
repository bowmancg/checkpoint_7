import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowerEventsService{

    async create(towerEventData) {
        const towerEvent = await dbContext.TowerEvents.create(towerEventData)
        await towerEvent.populate("creator", 'picture name')
        return towerEvent
    }

    async getAll() {
        const towerEvents = await dbContext.TowerEvents.find()
        .populate("creator", 'picture name')
        return towerEvents
    }

    async getById(towerEventId){
        const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
        .populate("creator", 'picture name')
        if (towerEvent == null) {
            throw new BadRequest('This event does not exist.')
        } else{

            return towerEvent
        }
    }

    async editById(towerEventEdit, towerEventId) {
        const originalEvent = await this.getById(towerEventId)
        
        if (originalEvent.isCanceled) {
            throw new BadRequest('Cannot edit cancelled event.')
        }
        originalEvent.name = towerEventEdit.name ? towerEventEdit.name : originalEvent.name
        originalEvent.description = towerEventEdit.description ? towerEventEdit.description : originalEvent.description
        await originalEvent.save()
        return originalEvent
    }

    async cancelEvent(towerEventId, userId) {
        let towerEvent = await this.getById(towerEventId)
        if (towerEvent.creatorId != userId) {
            throw new Forbidden('You cannot cancel this event.')
        }
        if (towerEvent.isCanceled == true) {
            throw new Forbidden('This event has been cancelled.')
        }
        towerEvent.isCanceled = true
        await towerEvent.save()
        return `${towerEvent.name} has been cancelled.`
    }
}

export const towerEventsService = new TowerEventsService()