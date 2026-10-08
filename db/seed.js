import db from "#db/client";
import { createFolder } from "#db/queries/folders";
import { createFile, fileList} from "#db/queries/files";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  //loop 3 times and create a folder for each loop
    //for file of files, file = ...file, folder_id: newFolder.id,
  for (let i =0; i<3; i++){
    const newFolder = await createFolder(`folder ${i+1}`)
    for(let file of fileList){
      file = {...file, folderId: newFolder.id}
      const newFile = await createFile(file);
    }
  }
}
