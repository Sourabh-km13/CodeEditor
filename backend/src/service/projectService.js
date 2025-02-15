
import fs from "fs/promises";
import uuid4 from "uuid4";
import { REACT_PROJECT_COMMAND } from "../config/serverconfig.js";
import execPromisified from "../utils/utilExecPromisify.js";
import directoryTree from 'directory-tree'
import path from "path";

export const CreateProjectService = async ()=>{

    const projectid = uuid4();
    console.log("new project:", projectid);
    await fs.mkdir(`./projects/${projectid}`);
    const response = await execPromisified(REACT_PROJECT_COMMAND,
        {
          cwd: `./projects/${projectid}`,
        }
    );
    return projectid;
}

export const getProjectTreeService = async (projectid)=>{
    const projectPath = path.resolve(`./projects/${projectid}`)
    const tree = directoryTree(projectPath);
    return tree;
}