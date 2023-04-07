<template>
  <div class="container">
    <div class="row justify-content-center p-4">
        <div class="col-md-10 p-3 rounded">
            <div class="d-flex justify-content-around">
                <button @click="changeFilterType('')" class="btn btn-outline-success">All</button>
                <button @click="changeFilterType(t)" v-for="t in types" class="btn btn-outline-success">{{ t.toUpperCase() }}</button>
            </div>
        </div>
    </div>
    <div class="flex-grow-1 p-4 d-flex row align-items-center justify-content-center">
      <div v-for="t in towerEvents" :key="t.id" class="p-3 my-3 col-md-2">
        <EventCard :towerEvent="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import EventCard from '../components/EventCard.vue';
import { towerEventsService } from '../services/TowerEventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
    setup() {
      const filterType = ref('')
      const types = ["concert", "sport", "convention", "digital"]
      async function getAllEvents() {
        try {
          await towerEventsService.getAllEvents()
        } catch (error) {
          Pop.error(error.message)
          logger.log(error.message)
        }
      }
      onMounted(() => {
        getAllEvents()
      })
        return {
          types,
          myTowerEvents: computed(() => AppState.myTowerEvents),
          account: computed(() => AppState.account),
          towerEvents: computed(() => {
            if (!filterType.value) {
              return AppState.towerEvents
            } else {
              return AppState.towerEvents.filter(t => t.type == filterType.value)
            }
          }),
          changeFilterType(type) {
            filterType.value = type
          }
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
