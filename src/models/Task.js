import { Schema,model,models } from "mongoose";

const taskSchema = new Schema({
    title:{
        type: String,
        required: [true,'Title is required'],
        minlength: [3,'Title must be at least 3 characters long'],
        maxlength: [40,'Title must be at most 40 characters long'],
        unique: [true,'The title already exists'],
        trim: true,
    },
    description:{
        type: String,
        required: [true,'Description is required'],
        minlength: [3,'Description must be at least 3 characters long'],
        maxlength: [200,'Description must be at most 200 characters long'],
        trim: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

export default models.Task || model('Task',taskSchema);