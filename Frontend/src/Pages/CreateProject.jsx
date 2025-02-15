import React from 'react'
import { useCreateProject} from '../hooks/apis/mutations/useCreateproject.js'
import { useNavigate } from 'react-router-dom';




export default function CreateProject() {
const navigate = useNavigate();
const{createProjectMutation , isPending}=useCreateProject();
async function handleCreateProject() {
    console.log('going to trigger create project mutation');
    try {
        const response= await createProjectMutation();
        console.log('now we should redirect to the editor');
        navigate(`/project/${response.data}`)
    } catch (error) {
        console.log(error);
        throw error;
        
    }
    
}
return (
    <div>
        <button onClick={handleCreateProject}>
            CreateProject
        </button>
        {
            isPending&&(<div>pending</div>)
        }
    </div>
 )
}
