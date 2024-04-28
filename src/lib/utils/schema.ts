// import { superForm, type SuperValidated } from "sveltekit-superforms";
import { z } from "zod";

// Form schema
export const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" })
});

// Type for form data
export type FormSchema = typeof formSchema;

// // Initialize form with validation
// let data: SuperValidated<FormSchema> = superForm({
//     initialValues: {
//         email: ''
//     },
//     validators: formSchema
// });