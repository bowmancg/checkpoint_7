<template>
    <form @submit.prevent="createEvent()">
        <div class="m-3">
            <input v-model="editable.name" type="text" class="form-control" name="name" id="name" placeholder="Event Name...">
        </div>
        <div class="m-4">
            <input type="url" name="coverImg" id="coverImg" placeholder="Add an Image..." v-model="editable.coverImg" class="form-control">
        </div>
        <div class="m-4">
            <label for="type">Select an Event</label>
            <select name="type" id="type" class="form-select">
                <option value="concert">Concert</option>
                <option value="sport">Sport</option>
                <option value="convention">Convention</option>
                <option value="digital">Digital</option>
            </select>
        </div>
        <div class="text-end">
            <button class="btn btn-info" type="submit">Submit</button>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
export default {
    setup(){
        const editable = ref({})
    return {
        editable,
        async createEvent() {
            try {
                const eventData = editable.value
                await towerEventsService.createEvent(eventData)
            } catch (error) {
                Pop.error(('[error]'), error.message)
            }
        }
    }
    }
};
</script>


<style lang="scss" scoped>

</style>