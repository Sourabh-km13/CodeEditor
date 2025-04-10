
import { Route,Routes } from "react-router-dom";
import CreateProject from "../Pages/CreateProject";
import ProjectPlayground from "../Pages/ProjectPlayground";



export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
      <Route path="/project/:projectId" element={<ProjectPlayground />} />

    </Routes>
  )
}
