import mongoose, { Schema } from 'mongoose';
import { Gender, Status } from '../Utils/Types';

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
        enum: Gender,
        required: true
    },
    status: {
        type: String,
        enum: Status,
        required: true
    }
})

export default mongoose.model('personalInfo', PersonalInfoSchema)