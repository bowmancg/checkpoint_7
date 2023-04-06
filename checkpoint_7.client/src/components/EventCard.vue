<template>
    <div class="row d-flex justify-content-center">
        <div class="elevation-5 col-3 rounded">
            <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid rounded">
        </div>
        <div class="text-center p-1">
            <h5>{{ towerEvent.name }}</h5>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from '../models/TowerEvent';
export default {
    props: {
        towerEvent: { type: TowerEvent, required: true }
    },
    setup(){
    return {

    }
    }
};
</script>


<style lang="scss" scoped>

</style>