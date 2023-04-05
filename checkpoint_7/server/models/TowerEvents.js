import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    name: { type: String, required: true, minLength: 3, maxLength: 1000 },
    description: { type: String, required: true, minLength: 10, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 1000 },
    location: { type: String, required: true, minLength: 10, maxLength: 500 },
    capacity: { type: Number, required: true },
    type: { type: String, required: true, enum: ["concert", "sport", "convention", "digital"], default: "concert"},
    startDate: { type: String, required: true },
    isCanceled: { type: Boolean, required: true, default: false},

}, { timestamps: true, toJSON: {virtuals: true}})

TowerEventSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})