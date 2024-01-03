import { Types, Schema, model, mongoose } from "mongoose";
const appointmentSchema = new Schema({
    time: {
        type: String,
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
    createdBy: {type: Types.ObjectId, ref: "User"},
    updatedBy: {type: Types.ObjectId, ref: "User"},
    patientId:{type: Types.ObjectId, ref: "User", required: true},
    doctorId:{type: Types.ObjectId, ref: "User", required: true},
    clinicId: { type: Types.ObjectId, ref: "Clinic", required: true }
}, {
    timestamps: true
});
const appointmentModel = mongoose.models.Appointment || model("Appointment", appointmentSchema);
export default appointmentModel;
