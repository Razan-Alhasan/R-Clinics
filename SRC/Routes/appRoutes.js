import authRoutes from "../Routes/authRoutes.js";
import clinicRoutes from "../Routes/clinicRoutes.js";
import userRoutes from "../Routes//userRoutes.js";
import connectDB from "../../DB/connection.js";
import { globalErrorHandling } from "../Utils/errorHandling.js";
const initApp = (app, express) => {
    app.use(express.json());
    connectDB();
    app.get('/', (req, res) => res.json({ message: "Welcome to R-Clinics" }))
    app.use('/auth', authRoutes);
    app.use('/clinic', clinicRoutes);
    app.use('/users', userRoutes);
    app.get('*', (req, res) => res.json({ message: "Page Not Found" }))
    app.use(globalErrorHandling);
};
export default initApp;