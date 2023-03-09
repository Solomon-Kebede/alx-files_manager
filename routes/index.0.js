//const AppController = require("../controllers/AppController");
import getStatus from "../controllers/AppController";
import getStats from "../controllers/AppController";

app.use("/status", AppController.getStatus)
app.use("/stats", AppController.getStats)
