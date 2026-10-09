import { Router } from "express";
import { 
    createFolder,
    getFolders,
    getFolder,
    getFolderAndFiles
} from "#db/queries/folders";
import {createFile} from "#db/queries/files"
const router = Router()

router.get("/", async(req,res)=>{
    const allFolders = await getFolders()
    if (!allFolders) return res.status(404).send("no folders found")
    return res.status(200).json(allFolders)
})

router.get("/:id", async(req,res)=>{
    const {id} = req.params
    const folder = await getFolder(req.params.id)
    if(!folder)return res.status(404).send("folder not found")
    return res.status(200).json(folder)
})

router.post("/:id/files", async(req,res)=>{
    const {id} = req.params
    const folder = await getFolder(req.params.id)
    if(!folder)return res.status(404).send("folder not found")
    if(!req.body)return res.status(400).send("must have request body")
    const {name, size} = req.body
    if(!name || !size ){
        return res.status(400).send("body must have name, size for file")
    }
    const newFile = {
        name: req.body.name,
        size: req.body.size,
        folderId: req.params.id
    }
    const createdFile = await createFile(newFile)
    if(!createFile)return res.status(404).send("folder not found")
    return res.status(201).json(createdFile)
})

export default router