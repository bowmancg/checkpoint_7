<template>
    <form @submit.prevent="createEvent()">
        <div class="m-3">
            <input v-model="editable.name" type="text" class="form-control" name="name" id="name"
                placeholder="Event Name...">
        </div>
        <div class="m-4">
            <input type="url" name="coverImg" id="coverImg" placeholder="Add an Image..." v-model="editable.coverImg"
                class="form-control">
        </div>
        <div class="m-4">
            <input type="text" name="location" id="location" placeholder="Add a Location..." v-model="editable.location"
                class="form-control">
        </div>
        <div class="m-4">
            <input type="number" name="capacity" id="capacity" placeholder="Add Capacity..." v-model="editable.capacity"
                class="form-control">
        </div>
        <div class="m-4">
            <input type="text" name="description" id="description" placeholder="Add Description..."
                v-model="editable.description" class="form-control">
        </div>
        <div class="m-4">
            <input type="datetime-local" name="startDate" id="startDate" placeholder="Add Date..."
                v-model="editable.startDate" class="form-control">
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
import { useRouter } from 'vue-router';
import { TowerEvent } from '../models/TowerEvent';
export default {
    // props: {
    //     event: {
    //         type: TowerEvent,
    //         default: {}
    //     }
    // },
    setup() {
        const router = useRouter()
        const editable = ref({})
        return {
            router,
            editable,
            async createEvent() {
                try {
                    const eventData = editable.value
                    const event = await towerEventsService.createEvent(eventData)
                    router.push({ name: 'EventDetails', params: { eventId: event.id } })
                } catch (error) {
                    Pop.error(('[error]'), error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>