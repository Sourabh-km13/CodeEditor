import {create} from 'zustand'

import { QueryClient } from '@tanstack/react-query'
import { getProjectTree } from '../apis/project';

export const useTreeStructureStore = create((set,get)=>{
    const queryClient = new QueryClient();
    return{
        ProjectId:null,
        treeStructure:null,
        
        setTreeStructure:async ()=>{
            const id = get().ProjectId;
            const data= await queryClient.fetchQuery({
                queryKey:['TreeStore'],
                queryFn:()=>getProjectTree({projectid:id})
            })
            console.log(data);
            set({
                treeStructure : data,
            })
        },
        setProjectId:(projectid)=>{
            
            set({
                ProjectId:projectid,
            })
        }
    }
})