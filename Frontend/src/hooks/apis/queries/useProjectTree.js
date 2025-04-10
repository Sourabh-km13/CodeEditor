
import { useQuery } from '@tanstack/react-query';
import { getProjectTree } from '../../../apis/project';
export default function useProjectTree(projectId) {
  
    const {isLoading,isError,error,data:projecttree} = useQuery({
        queryFn:()=>{getProjectTree(projectId)},
        queryKey:['tree']
    })
    return({
        isLoading,
        isError,
        error,
        projecttree
    })
}
