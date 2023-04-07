import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TowerEventsService {

    async getAllEvents() {
        const res = await api.get('api/events')
        AppState.towerEvents = res.data.map(t => new TowerEvent(t))
        logger.log('[all events]', AppState.towerEvents)
    }

    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        logger.log('[find an event]', res.data)
        AppState.towerEvent = new TowerEvent(res.data)
    }

    async createEvent(eventData) {
        const res = await api.post('api/events', eventData)
        logger.log('[create event]', res.data)
        AppState.towerEvent.push(new TowerEvent(res.data))
    }

    async cancelEvent() {
        const eventId = AppState.towerEvent.id
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('[cancel event]', res.data)
        AppState.towerEvent.isCanceled = true
    }
}

export const towerEventsService = new TowerEventsService()