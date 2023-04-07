<template>
    <div class="row d-flex justify-content-center">
        <router-link :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
        <div class="event-card elevation-5 col-3 rounded">
            <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid rounded">
        </div>
        <div class="p-1">
            <h5>{{ towerEvent.name }}</h5>
        </div>
    </router-link>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from '../models/TowerEvent';
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
export default {
    props: {
        towerEvent: { type: TowerEvent, required: true }
    },
    setup(){

    return {
        
        account: computed(() => AppState.account),
    }
    }
};
</script>


<style lang="scss" scoped>
.event-card{
    height: 30vh;
    width: 30vh;
}
</style>