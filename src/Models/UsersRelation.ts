import mongoose, { Schema } from 'mongoose';

const UsersRelationSchema: Schema = new mongoose.Schema({
    followerId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

export default mongoose.model('usersRelation', UsersRelationSchema)