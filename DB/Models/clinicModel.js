import {Types, Schema, model, mongoose } from "mongoose";
const clinicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {type: Types.ObjectId, ref: "User", required: true },
    updatedBy: {type: Types.ObjectId, ref: "User" }
}, {
    timestamps: true
});
const clinicModel = mongoose.models.Clinic || model("Clinic", clinicSchema);
export default clinicModel;
