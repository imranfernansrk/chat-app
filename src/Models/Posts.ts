import mongoose, { Schema } from 'mongoose';

const PostSchema: Schema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    mediaUrl: {
        url: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    postedBy: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('posts', PostSchema)