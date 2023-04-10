<template>
    <div class="row d-flex justify-content-center">
        <div class="comment-card card elevation-5 col-3 rounded">
            <div class="card-body">
                {{ comment.body }}
            </div>
            <div class="card-footer">
                <img :src="account.picture" :alt="account.name" height="40" class="rounded"> |
                {{ comment.creator.name }} |
                <button @click="deleteComment(comment.id)" class="btn btn-danger">Delete</button>
            </div>

        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Comment } from '../models/Comment';
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop';
import { Account } from '../models/Account';
export default {
    props: {
        comment: { type: Comment, required: true },
        account: { type: Account, required: true }
    },
    setup(props){
    return {
        async deleteComment(commentId) {
            try {
                if (await Pop.confirm("Are you sure you want to delete this?")) {
                    await commentsService.deleteComment(commentId)
                }
            } catch (error) {
                Pop.error(error.message)
            }
        },
        account: computed(() => AppState.account)
        // comment: computed(() => AppState.comments)
    }
    }
};
</script>


<style lang="scss" scoped>
.comment-card {
    height: 40vh;
    width: 40vh;
}
</style>