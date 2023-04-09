<template>
    <form @submit.prevent="createComment(event.id)">
        <div class="m-3">
            <div class="form-outline">
                <textarea name="comment-body" placeholder="Leave a Comment" v-model="editable.body" id="comment-body" rows="4" class="form-control"></textarea>
            </div>
        </div>
        <div class="pt-4">
            <button class="btn btn-info" type="submit">Leave Comment</button>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { TowerEvent } from '../models/TowerEvent';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';
export default {
    props: {
        event: { type: TowerEvent, required: true }
    },
    setup(props) {
        const editable = ref({})
        return {
            editable,
            async createComment(eventId) {
                try {
                    const commentData = editable.value
                    commentData.eventId = eventId
                    const comment = await commentsService.createComment(commentData)
                } catch (error) {
                    Pop.error(error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>