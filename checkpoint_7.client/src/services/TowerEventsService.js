import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TowerEventsService {

    async getAllEvents() {
        const res = await api.get('api/events')
        AppState.towerEvents = res.data.map(t => new TowerEvent(t))
        // logger.log('[all events]', AppState.towerEvents)
    }

    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        logger.log('[find an event]', res.data)
        AppState.towerEvent = new TowerEvent(res.data)
    }

    // async getEventsByCreatorId(creatorId) {
    //     const res = await api.get(`api/events/${creatorId}/tickets`)
    //     logger.log('[created events]', res.data)
        
    // }

    async createEvent(eventData) {
        const res = await api.post('api/events', eventData)
        logger.log('[create event]', res.data)
        const towerEvent = new TowerEvent(res.data)
        AppState.towerEvent = towerEvent
        AppState.towerEvents.push(towerEvent)
        AppState.myTowerEvents.push(towerEvent)
        return towerEvent
    }

    async deleteEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('[deleting event]')
    }

    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('[cancel event]', res.data)
        AppState.towerEvent.isCanceled = true
    }

    // async getEventsForAccount(eventId, eventQuery) {
    //     const res = await api.get(`api/account/${eventId}/events`, { params: eventQuery })
    //     logger.log('[account events]', res.data)
    //     AppState.towerEvents = res.data.towerEvents
    // }
}

export const towerEventsService = new TowerEventsService()