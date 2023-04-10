<template>
    <div class="row">
        <div v-if="towerEvent.isCanceled" class="col-md-3">
            <h3 class="text-danger">This Event is Cancelled</h3>
        </div>
    </div>
    <div class="mt-4 row" v-if="towerEvent.id">
        <div class="col-md-4">
            <div class="row d-flex">
                <div class="col-md-6">
                    <img :src="towerEvent.coverImg" alt="" class="img-fluid cover-img rounded">
                </div>
                <div class="col-md-6">
                    <div class="bg-info rounded p-3">
                        <h5>{{ towerEvent.name }}</h5>
                        <p><span>{{ towerEvent.creator?.name }}</span> is attending</p>
                        <p>Starts on {{ towerEvent.startDate }}</p>
                        <p class="fs-5">{{ towerEvent.description }}</p>
                        <p class="fs-5">{{ towerEvent.capacity }} spots left</p>
                        <p class="fs-5">{{ towerEvent.location }}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="t in tickets" :key="t.id" class="col-xs-8">
                    <img :src="t.profile.picture" :alt="t.profile.name" height="40" class="rounded">
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <CommentForm :event="towerEvent" />
                </div>
            </div>
            <div class="row">
                <div v-for="c in comments" :key="c.id" class="col-xs-12 p-4 my-3">
                    <CommentCard :comment="c" :account="account" />
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-4 p-4">
                    <button class="btn btn-success" v-if="account.id && !isAttending && canAttend && !towerEvent.isCanceled" :disabled="towerEvent.isCanceled"
                        @click="createTicket()">Attend</button>
                    <button class="btn btn-danger" @click="deleteTicket(isAttending.ticketId)"
                        v-if="account && isAttending">Delete Ticket</button>
                </div>
                <div class="col-md-4 p-4 mt-3">
                    <button @click="cancelEvent()" class="btn btn-warning"
                        v-if="account.id && account.id == towerEvent.creatorId && !towerEvent.isCanceled">Cancel Event</button>
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
import CommentCard from '../components/CommentCard.vue';
import CommentForm from '../components/CommentForm.vue';
import { commentsService } from '../services/CommentsService';
export default {
    setup() {
        const route = useRoute();
        async function getCommentsByEvent() {
            try {
                const eventId = route.params.eventId
                await commentsService.getCommentsByEvent(eventId)
            } catch (error) {
                Pop.error(error.message)
            }
        }
        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await towerEventsService.getEventById(eventId);
            }
            catch (error) {
                Pop.error(("[error]"), error.message);
            }
        }
        async function getEventTickets() {
            try {
                const eventId = route.params.eventId
                await ticketsService.getEventTickets(eventId)
            } catch (error) {
                Pop.error(error.message)
            }
        }
        onMounted(() => {
            getEventById();
            getEventTickets()
            getCommentsByEvent()
        });
        return {
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            towerEvent: computed(() => AppState.towerEvent),
            account: computed(() => AppState.account),
            myTowerEvents: computed(() => AppState.myTowerEvents),
            isAttending: computed(() => AppState.myTowerEvents.find(t => t.id == AppState.towerEvent.id)),
            canAttend: computed(() => AppState.towerEvent.capacity > 0),
            async createTicket() {
                try {
                    if (!this.isAttending) {
                        await ticketsService.createTicket({ eventId: route.params.eventId });
                    }
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async deleteTicket(ticketId) {
                try {
                    if (await Pop.confirm("Are you sure you want to delete this?")) {
                        await ticketsService.deleteTicket(ticketId);
                    }
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async cancelEvent() {
                try {
                    if (this.towerEvent.creatorId !== this.account.id) {
                        throw new Error('You are not allowed to cancel this.')
                    } else {
                        const eventId = route.params.eventId
                        await towerEventsService.cancelEvent(eventId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                }
            },
            async deleteEvent() {
                try {
                    if (this.towerEvent.creatorId !== this.account.id) {
                        throw new Error('You are not allowed to delete this.')
                    } else {
                        const eventId = route.params.eventId
                        await towerEventsService.deleteEvent(eventId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                }
            }
        };
    },
    components: { CommentCard, CommentForm }
};
</script>


<style lang="scss" scoped>
.cover-img {
    height: 40vh;
    width: 40vh;
}
</style>