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

    async getCommentsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.comments = res.data.map(c => new Comment(c))
        logger.log('[found comments]', AppState.comments)
    }

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        AppState.comments.push(new Comment(res.data))
    }

    async deleteComment(eventId) {
        const res = await api.delete(`api/comments/${eventId}`)        
        logger.log('[deleting comment]', res.data)
    }
}

export const commentsService = new CommentsService()