import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
        localAddress: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
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
        carpetArea: {
            type: Number,
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

listingSchema.plugin(mongooseAggregatePaginate)

export const Listing = mongoose.model("Listing", listingSchema);