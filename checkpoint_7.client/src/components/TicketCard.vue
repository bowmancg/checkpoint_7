<template>
    <div class="row d-flex justify-content-center">
        <div class="ticket-card elevation-5 col-5 text-light bg-info">
            <div class="p-2">
                <p class="fs-4">{{ towerEvent.name }}</p>
                <p class="fs-5">Starts on {{ towerEvent.startDate }}</p>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { TowerEvent } from '../models/TowerEvent';
export default {
    props: {
        towerEvent: { type: TowerEvent, required: true }
    },
    setup() {
        return {
            account: computed(() => AppState.account)
        }
    }
};
</script>


<style lang="scss" scoped>
.ticket-card {
    height: 20vh;
    width: 50vh;
}
</style>