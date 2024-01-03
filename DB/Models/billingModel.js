import { Types, Schema, model, mongoose } from "mongoose";
const billingSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enym: ["Paid", "NotPaid"],
        default: "NotPaid"
    },
    services: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {type: Types.ObjectId, ref: "User"},
    updatedBy: { type: Types.ObjectId, ref: "User" },
    patientId:{type: Types.ObjectId, ref: "User", required: true},
    doctorId:{type: Types.ObjectId, ref: "User", required: true},
    clinicId: { type: Types.ObjectId, ref: "Clinic", required: true},
}, {
    timestamps: true
});
const billingModel = mongoose.models.Billing || model("Billing", billingSchema);
export default billingModel;
