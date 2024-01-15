import { Types, Schema, model, mongoose } from "mongoose";
const prescriptionSchema = new Schema({
    instructions: {
        type: String,
        required: true
    },
    medications: {
        type: String,
        required: true,
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
    updatedBy: { type: Types.ObjectId, ref: "User"},
    patientId:{type: Types.ObjectId, ref: "User", required: true},
    appointmentId: { type: Types.ObjectId, ref: "Appointment", required: true }, 
    clinicId: { type: Types.ObjectId, ref: "Clinic", required: true }
}, {
    timestamps: true
});
const prescriptionModel = mongoose.models.Prescription || model("Prescription", prescriptionSchema);
export default prescriptionModel;
