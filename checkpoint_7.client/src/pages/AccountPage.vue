<template>
  <div class="container">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="row d-flex justify-content-start">
      <div class="col-md-2">
        <h3>My Events: </h3>
        
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { TowerEvent } from '../models/TowerEvent';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
export default {
  setup() {
    async function getEventById() {
      try {
        await towerEventsService.getEventById()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
