import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CommentController extends BaseController {
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post("", this.createComment)
        .delete("/:id", this.deleteComment)
    }
    async createComment(req ,res, next) {
        try {
            let commentData = req.body
            commentData.creatorId = req.userInfo.id
            let comment = await commentsService.createComment(commentData)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {
            let commentId = req.params.id
            let userId = req.userInfo.id
            let comment = await commentsService.deleteComment(commentId, userId)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}