import axios from '../config/axiosconfig.js'

export const createProject = async (res,req) => {
    try {
        const response = await axios.post('/api/v1/projects')
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        
    }
}
export const getProjectTree = async ({projectid})=>{
    try {
        const response = await axios.get(`/api/v1/projects/${projectid}/tree`)
        console.log(response.data);
        return response.data
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
}