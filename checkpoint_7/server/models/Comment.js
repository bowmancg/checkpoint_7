import { Schema } from "mongoose";
import { TowerEventSchema } from "./TowerEvents";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: "TowerEvent" },
    body: { type: String, required: true, maxLength: 5000 },
    isAttending: { type: Boolean, required: true, default: false }
}, { timestamps: true, toJSON: {virtuals: true}})

TowerEventSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})