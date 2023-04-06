<template>
  <div class="container-fluid">
    <div class="home flex-grow-1 p-4 d-flex row flex-column align-items-center justify-content-center">
      <div v-for="t in towerEvents" :key="t.id" class="p-3 my-3 col-md-2">
        <EventCard :towerEvent="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import EventCard from '../components/EventCard.vue';
import { towerEventsService } from '../services/TowerEventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
    setup() {

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
          towerEvents: computed(() => AppState.towerEvents)
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
