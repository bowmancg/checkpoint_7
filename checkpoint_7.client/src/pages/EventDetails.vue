<template>
    <div class="mt-4 row" v-if="towerEvent.id">
        <div class="col-md-4">
            <div class="row">
                <div class="col-md-6">
                    <img :src="towerEvent.coverImg" alt="" class="img-fluid cover-img rounded">
                </div>
                <div class="col-md-6">
                    <div class="bg-info rounded p-3">
                        <h5>{{ towerEvent.name }}</h5>
                        <p><span>{{ towerEvent.creator?.name }}</span> is attending</p>
                        <p class="fs-5">{{ towerEvent.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-4 p-4">

                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
export default {
    setup(){
        const route = useRoute()
        async function getEventById() {
            try {
                const eventId = route.params.eventId
                await towerEventsService.getEventById(eventId)
            } catch (error) {
                Pop.error(('[error]'), error.message)
            }
        }
        onMounted(() => {
            getEventById()
        })
    return {
        towerEvent: computed(() => AppState.towerEvent),
        account: computed(() => AppState.account)
    }
    }
};
</script>


<style lang="scss" scoped>
.cover-img{
    height: 40vh;
    width: 40vh;
}
</style>