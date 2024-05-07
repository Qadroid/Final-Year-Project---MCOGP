import { z } from "zod";

export const minecraftSchema = z.object({
    name: z.string().min(6, { message: "Minimum 6 characters" }),
    storage: z.number().min(1, { message: "Minimum 1 GB" }).max(10, { message: "Maximum 10 GB" }),
    ram: z.number().min(1, { message: "Minimum 1 GB" }).max(4, { message: "Maximum 4 GB" }),
    cpu: z.number().min(1, { message: "Minimum 1 core" }).max(4, { message: "Maximum 4 cores" })
});

export type MinecraftSchema = typeof minecraftSchema;