import { Types, Schema, model, mongoose } from "mongoose";
const appointmentSchema = new Schema({
    time: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enym: ["Active", "InActive"],
        default: "Active"
    },
    date: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    usersId:{type: Types.ObjectId, ref: "User"},
    clinicId: { type: Types.ObjectId, ref: "Clinic" }
}, {
    timestamps: true
});
const appointmentModel = mongoose.models.Appointment || model("Appointment", appointmentSchema);
export default appointmentModel;
