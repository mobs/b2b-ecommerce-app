import mongoose, { Schema, mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // cloudinary url
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        required: true
    },
    offer: {
        type: String
    }
}, {timestamps: true})

productSchema.plugin(mongooseAggregatePaginate)

export const Product = mongoose.model("Product", productSchema)