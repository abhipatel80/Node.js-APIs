import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const noteModel = mongoose.model("note", noteSchema);

export default noteModel;
