
import db from "#db/client"

export async function createFile({name, size, folderId}){
    const sql=`
    INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3) RETURNING *
    `;
    const {rows:[file]} = await db.query(sql, [name, size, folderId]);
    return file
}

export async function getFiles(){
    const sql = `
    SELECT files.id, files.name, size, folders.id AS folder_id, folders.name AS folder_name FROM files LEFT JOIN folders ON folder_id = folders.id;
    `;
    const {rows:files}= await db.query(sql);
    if (!files.length === 0 ) return null; 
    return files
};

//SELECT files.id, files.name, size, folders.name FROM files LEFT JOIN folders ON folder_id = folders.id;
// seed the databse with 5 files per folder

export const fileList = [
    {
    name: 'One.txt',
    size: 1,
    },
    {
    name: 'Two.txt',
    size: 2,
    },
    {
    name: 'Three.txt',
    size: 3,
    },
    {
    name: 'Four.txt',
    size: 4,
    },
    {
    name: 'Five.txt',
    size: 5,
    }
]