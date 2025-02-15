import {create} from 'zustand'

import { QueryClient } from '@tanstack/react-query'
import { getProjectTree } from '../apis/project';

export const useTreeStructureStore = create(()=>{
    const queryClient = new QueryClient();
    return{
        treeStructure:null,
        setTreeStructure:async (projectid)=>{
            const [data]= await queryClient.fetchQuery({
                queryKey:[''],
                queryFn:()=>{getProjectTree({projectid})}
            })
            
            console.log(data);
            
        }
    }
})