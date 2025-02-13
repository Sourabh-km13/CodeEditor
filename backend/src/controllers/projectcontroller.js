import util from "util";
import child_process from "child_process";
import fs from "fs/promises";
import uuid4 from "uuid4";

const execpromisified = util.promisify(child_process.exec);

export const createprojectcontroller = async (req, res) => {
  const projectid = uuid4();
  console.log("new project:", projectid);
  await fs.mkdir(`./projects/${projectid}`);
  const response = await execpromisified('npm create vite@latest sandbox -- --template react',
    {
      cwd: `./projects/${projectid}`,
    }
  );
  return res.json({ message: "Project created", data: projectid });
};
