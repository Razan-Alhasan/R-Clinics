import { Types, Schema, model, mongoose } from "mongoose";
const billingSchema = new Schema({
    amount: {
        type: String,
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
    usersId:{type: Types.ObjectId, ref: "User"},
    clinicId: { type: Types.ObjectId, ref: "Clinic" }
}, {
    timestamps: true
});
const billingModel = mongoose.models.Billing || model("Billing", billingSchema);
export default billingModel;
