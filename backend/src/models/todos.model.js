import mongoose, {Schema} from "mongoose";

const todosSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "moderate", "high"],
        default: "low"
    },
    dueDate: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
}, {timestamps: true})

export const Todos = mongoose.model("Todos", todosSchema)