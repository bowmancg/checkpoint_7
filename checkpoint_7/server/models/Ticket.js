import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: "TowerEvents" },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Profile" }
}, { timestamps: true, toJSON: {virtuals: true}})

TicketSchema.virtual("profile", {
    localField: "accountId",
    foreignField: "_id",
    justOne: true,
    ref: "Profile"
})

TicketSchema.virtual("event", {
    localField: "eventId",
    foreignField: "_id",
    justOne: true,
    ref: "TowerEvents"
})