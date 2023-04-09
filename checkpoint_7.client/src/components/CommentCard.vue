<template>
    <div class="row d-flex justify-content-center">
        <div class="comment-card card elevation-5 col-3 rounded">
            <div class="card-body">
                {{ comment.body }}
            </div>
            <div class="card-footer">
                {{ comment.creator.name }}
                <button @click="deleteComment(creatorId)" class="btn btn-danger">Delete</button>
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
export default {
    props: {
        comment: { type: Comment, required: true }
    },
    setup(){
    return {
        async deleteComment(creatorId) {
            try {
                if (await Pop.confirm("Are you sure you want to delete this?")) {
                    await commentsService.deleteComment(creatorId)
                }
            } catch (error) {
                Pop.error(error.message)
            }
        }
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