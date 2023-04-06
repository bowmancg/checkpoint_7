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

    
}

export const towerEventsService = new TowerEventsService()