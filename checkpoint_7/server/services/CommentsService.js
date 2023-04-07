import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"


class CommentsService{

    async createComment(commentData) {
        let comment = await dbContext.Comment.create(commentData)
        await comment.populate("creator", 'picture name')
        return comment
    }

    async getEventComments(eventId) {
        let comments = await dbContext.Comment.find({eventId})
        .populate("creator")
        return comments
    }

    async deleteComment(commentId, userId) {
        let comment = await dbContext.Comment.findById(commentId)
        if (comment == null) {
            throw new BadRequest("No comments here.")
        }
        if (userId != comment.creatorId) {
            throw new Forbidden("You can't delete this.")
        }
        const eventId = comment.eventId
        await comment.remove()
    }
}

export const commentsService = new CommentsService()