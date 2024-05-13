import { z } from 'zod';

export const projectSchema = z.object({
    name: z.string().min(3, "Minimum 3 characters").max(20, "Maximum 20 characters"),
    description: z.string().optional(),
    kubeConfigType: z.enum(['upload', 'paste']),
    kubeConfigFile: z.any().optional(),
    kubeConfigPaste: z.string().optional(),
})
export type ProjectSchema = z.infer<typeof projectSchema>;