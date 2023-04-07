import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {

    async getAllComments() {
        const res = await api.get('api/comments')
        AppState.comments = res.data.map(c => new Comment(c))
        logger.log('[all comments]', AppState.comments)
    }
}

export const commentsService = new CommentsService()