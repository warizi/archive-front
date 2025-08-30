export const WORKSPACE_QUERY_KEY = {
  ALL: ["workspace"],
  DETAILS: (id: string) => [...WORKSPACE_QUERY_KEY.ALL, id],
};