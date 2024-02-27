import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
    {
        listingName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        bedrooms: {
            type: Number,
            required: true
        },
        bathrooms: {
            type: Number,
            required: true
        },
        kitchens: {
            type: Number,
            required: true
        },
        furnishType: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true
        },
        images: [
            {
                type: String,
                required: true
            },
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

export const Listing = mongoose.model("Listing", listingSchema);