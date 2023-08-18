import app from "./config/app.js";
import { connectDB } from "./connection/connection.js";
import { PORT } from "./config/config.js";

connectDB();

app.listen(PORT);
console.log(`Server running in port ${PORT}`);
