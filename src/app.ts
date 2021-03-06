import express from "express"
import connectDB from "./config/db"
import morgan from "morgan"
import dotenv from "dotenv"
import routes from "./routes"
const cors = require('cors');


dotenv.config();
connectDB()

//middleware
const port = process.env.PORT || 5000
const app = express();
app.use(cors());
app.use(express.json())
morgan("common")


//Routes

app.get('/', (req, res) => {
    res.status(200).json({ api: 'UP' });
})

app.use("/fd", routes)


app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
