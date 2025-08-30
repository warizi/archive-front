import { WORKSPACE_QUERY_KEY } from "@/entities/workspace";
import { useQuery } from "@tanstack/react-query";
import { getListWorkspaces } from "../api/getApi";

export const useGetListWorkspaces = () => useQuery({
    queryKey: WORKSPACE_QUERY_KEY.ALL,
    queryFn: getListWorkspaces,
});
