import z from "zod";

export const workspaceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(50),
});

export type Workspace = z.infer<typeof workspaceSchema>;

export type WorkspaceIdPresent = Workspace & Required<Pick<Workspace, "id">>;

export type WorkspaceCreateType = Omit<Workspace, "id">;
