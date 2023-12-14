import "dotenv/config";
import express from 'express';
import initApp from './SRC/Routes/appRoutes.js';
const app = express()
const PORT = 3000 || process.env.PORT;
initApp(app, express);
app.listen( PORT, () => console.log(`Server is running at ${PORT} successfully`))
