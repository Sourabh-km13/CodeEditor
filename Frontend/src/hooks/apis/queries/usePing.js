import { useQuery } from "@tanstack/react-query"
import { pingApi } from "../../../apis/ping"

export default function usePing(){
  const {isPending, isError, data , error} = useQuery({
        queryFn:pingApi,
        queryKey: ['ping'],
        staleTime:10000,
    }
    )
    return {
        isPending,
        isError,
        data,
        error
    }

    
}