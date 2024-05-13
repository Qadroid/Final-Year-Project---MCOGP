import { z } from 'zod';

export const projectSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    kubeConfigType: z.enum(['upload', 'paste']),
    kubeConfigFile: z.any().optional(),
    kubeConfigPaste: z.string().optional(),
})
export type ProjectSchema = typeof projectSchema;