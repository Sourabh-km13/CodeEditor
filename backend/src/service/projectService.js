
import fs from "fs/promises";
import uuid4 from "uuid4";
import execPromisified from "../utils/utilExecPromisify.js";
import directoryTree from 'directory-tree'
import path from "path";

export const CreateProjectService = async ()=>{

    const projectid = uuid4();
    console.log("new project:", projectid);
    await fs.mkdir(`./projects/${projectid}`);
    const response = await
     execPromisified('npm create vite@latest sandbox -- --template react',
        {
          cwd: `./projects/${projectid}`,
          shell:true
        }
    );
    return projectid;
}

export const getProjectTreeService = async (projectid)=>{
    const projectPath = path.resolve(`./projects/${projectid}`)
    const tree = directoryTree(projectPath);
    return tree;
}