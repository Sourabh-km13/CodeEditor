
import { useQuery } from '@tanstack/react-query';
import { getProjectTree } from '../../../apis/project';
export default function useProjectTree(projectid) {
  
    const {isLoading,isError,error,data:projecttree} = useQuery({
        queryFn:()=>{getProjectTree(projectid)}
    })
    return({
        isLoading,
        isError,
        error,
        projecttree
    })
}
