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
                <div class="pt-4">
                    <button class="btn btn-info">Get Tickets</button>
                </div>
            </div>
            <div v-if="towerEvent.isCanceled" class="col-md-3">
                <h3 class="text-warning">This Event is Cancelled</h3>
            </div>
        </div>
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-4 p-4">
                    <button class="btn btn-success" v-if="account.id && !isAttending" :disabled="towerEvent.isCanceled"
                        @click="createTicket()">Attend</button>
                    <button class="btn btn-danger" @click="deleteTicket(isAttending.ticketId)" v-if="account && isAttending">Delete Ticket</button>    
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
import { ticketsService } from '../services/TicketsService';
export default {
    setup() {
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
            account: computed(() => AppState.account),
            myTowerEvents: computed(() => AppState.myTowerEvents),
            isAttending: computed(() => AppState.myTowerEvents.find(t => t.id == AppState.towerEvent.id)),
            async createTicket() {
                try {
                    if (!this.isAttending) {                        
                        await ticketsService.createTicket({ eventId: route.params.eventId })
                    }
                } catch (error) {
                    Pop.error(error.message)
                }
            },
            async deleteTicket(ticketId) {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this.')) {
                        await ticketsService.deleteTicket(ticketId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.cover-img {
    height: 40vh;
    width: 40vh;
}
</style>