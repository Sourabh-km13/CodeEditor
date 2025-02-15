import { CreateProjectService, getProjectTreeService } from "../service/projectService.js";


export const createprojectcontroller = async (req, res) => {
  const projectid = await CreateProjectService();
  return res.json({ message: "Project created", data: projectid });
};

export const getProjectTreeController = async (req, res) => {
  const tree = await getProjectTreeService(req.params.projectid);
  return res.status(200).json({
    data: tree,
    success:true,
    message:"successfully created project"
  })
}
