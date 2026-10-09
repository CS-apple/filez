import { Router } from "express";
import {
    createFile,
    getFiles
} from "#db/queries/files"

const router = Router();

router.get("/", async(req,res)=>{
    const allFiles= await getFiles()
    if (!allFiles) return res.status(404).send("no files found")
    return res.status(200).json(allFiles)
})

export default router