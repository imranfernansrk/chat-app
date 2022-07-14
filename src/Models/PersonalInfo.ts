import mongoose, { Schema } from 'mongoose';

const PersonalInfoSchema: Schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

export default mongoose.model('personalInfo', PersonalInfoSchema)