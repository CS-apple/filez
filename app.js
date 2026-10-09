import express from "express";
import folderRouter from "#api/folders"
import filesRouter from "#api/files"
const app = express();

app.use(express.json())
app.use("/folders", folderRouter)
app.use("/files", filesRouter )


export default app;
