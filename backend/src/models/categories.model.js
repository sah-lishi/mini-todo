import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {timestamps: true})

// category name unique per user
categorySchema.index({owner: 1, name: 1}, {unique: true})

export const Category = mongoose.model("Category", categorySchema)