
import db from "#db/client"
// seed the database with 3 folders

export async function createFolder(name){
    const sql = `
    INSERT INTO folders (name) VALUES ($1) RETURNING *
    `;
    const {rows:[folder]}= await db.query(sql, [name]);
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