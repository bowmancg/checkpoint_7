<template>
  <div class="container">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <h3>My Events: </h3>
    <div class="row">
      <div v-for="m in myTowerEvents" :key="m.id" class="d-flex col-lg-3 justify-content-start">
        <EventCard :towerEvent="m" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { TowerEvent } from '../models/TowerEvent';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
import { useRoute } from 'vue-router';
import EventCard from '../components/EventCard.vue';
import { ticketsService } from '../services/TicketsService';
export default {
    setup() {
        const route = useRoute();
        
        // async function getEventById() {
        //     try {
        //         await towerEventsService.getEventById(route.params.eventId);
        //     }
        //     catch (error) {
        //         Pop.error(error.message);
        //     }
        // }
        async function getEventTickets() {
          try {
            await ticketsService.getTicketsByUserId()
          } catch (error) {
            Pop.error(error.message)
          }
        }
        onMounted(() => {
            // getEventById();
            getEventTickets()
        });
        return {
            account: computed(() => AppState.account),
            towerEvent: computed(() => AppState.towerEvent),
            myTowerEvents: computed(() => AppState.myTowerEvents),
            tickets: computed(() => AppState.tickets)
        };
    },
    components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
