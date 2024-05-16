import { z } from 'zod';

export const projectSchema = z.object({
    name: z.string().min(1, { message: "Project name is required" }),
    description: z.string().optional(),
    kubeConfig: z.string(),  
    owner: z.string(),
})

export type ProjectSchema = typeof projectSchema;