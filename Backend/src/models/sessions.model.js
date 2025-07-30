import mongoose from "mongoose";
import { Schema } from "mongoose";

const sessionSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    tags:{
        type: [String],
        required: true,
    },
    json_file_url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'published'],
        default: 'draft'
    }
}, {
    timestamps: true
});

const Sessions = mongoose.model("Sessions", sessionSchema)

export default Sessions
