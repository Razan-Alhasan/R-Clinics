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
    usersId:{type: Types.ObjectId, ref: "User"},
    appointmentsId: { type: Types.ObjectId, ref: "Appointment" }, 
    clinicId: { type: Types.ObjectId, ref: "Clinic" }
}, {
    timestamps: true
});
const prescriptionModel = mongoose.models.Prescription || model("Prescription", prescriptionSchema);
export default prescriptionModel;
