import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Ensure you have node-fetch installed

const app = express();
const port = process.env.PORT || 8000
// Allow your frontend origin
app.use(
  cors({
    origin:process.env.CORS_ORIGIN , // Only allow your frontend
    credentials: true,
  })
);

app.use(express.json());



app.listen(port, () => {
  console.log("Server is running on port ",port);
});
