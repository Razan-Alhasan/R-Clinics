import { Types, Schema, model, mongoose } from "mongoose";
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    DateOfBirth: {
        type: Date,
        required: true,
    },
    image: {
        type: Object,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Doctor", "Patient", "Employee", "User"],
        default: "User"
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    sendCode: {
        type: String,
        default: null
    },
    changePasswordTime: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    doctorDetails: {
        availability: { type: String, default: null },
        speciality: { type: String, default: null }
    },
    patientDetails: {
        medicalHistory: { type: String, default: null }
    },
    clinicId:{type: Types.ObjectId, ref: "Clinic"}
}, {
    timestamps: true
});
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
