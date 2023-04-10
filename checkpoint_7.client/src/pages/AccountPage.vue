<template>
  <div class="container">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <h3>My Events: </h3>
    <div class="row">
      <div v-for="m in myTowerEvents" :key="m.id" class="d-flex col-md-4 justify-content-start">
        <EventCard :towerEvent="m" />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Upcoming Events: </h3>
      </div>
    </div>
    <div v-for="m in nextEvents.slice(0, 5)" :key="m.id" class="row m-2">
      <div class="col-3">
        <TicketCard :towerEvent="m" />
      </div>
      <div v-for="m in myTowerEvents" :key="m.id" class="col-3">
        <TicketCard :towerEvent="m" />
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
import TicketCard from '../components/TicketCard.vue';
export default {
  setup() {
    const route = useRoute();

    // async function getMyEvents() {
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
      // getMyEvents();
      getEventTickets()
    });
    return {
      nextEvents: computed(() => {
        let now = new Date().getTime()
        return AppState.towerEvents.filter(t => {
          let startTime = new Date(t.startDate).getTime()
          return startTime > now
        }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      }),
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvent),
      myTowerEvents: computed(() => AppState.myTowerEvents),
      tickets: computed(() => AppState.tickets)
    };
  },
  components: { EventCard, TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
