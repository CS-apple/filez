
import db from "#db/client"
// seed the database with 3 folders

export async function createFolder(name){
    const sql = `
    INSERT INTO folders (name) VALUES ($1) RETURNING *
    `;
    const {rows:[folder]}= await db.query(sql, [name]);
    return folder
};

export async function getFolders(){
    const sql = `
    SELECT * FROM folders
    `;
    const {rows:folders}= await db.query(sql);
    if (!folders.length === 0 ) return null; 
    return folders
};

export async function getFolder(id){
    const sql=`SELECT folders.id, folders.name, json_agg(files) AS files FROM folders Left JOIN files ON folders.id = files.folder_id  where folders.id = $1 GROUP BY folders.id`;
    const {rows:[folder]} = await db.query(sql, [id])
    if(!folder)return null
    return folder

}

export async function getFolderAndFiles(id){
    const sql = `
    SELECT folders.id, folders.name, json_agg(files.name) AS files FROM folders  JOIN files ON folders.id = files.folder_id  where folders.id = $1 GROUP BY folders.name
    `;
    const {rows:[folder]}= await db.query(sql, [id]);
    if (!folder) return null; 
    return folder
};

const folderList = [
    {
        name:"folder1"
    },
    {
        name:"folder2"
    },
    {
        name:"folder3"
    },
]