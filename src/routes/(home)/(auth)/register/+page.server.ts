import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { registerSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"
import { login, signup } from "@/stores/user";
import { generateNewUserKubeConfig } from "@/kubernetes/kubernetes";
import { databases, ID, account } from "@/appwrite";

export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(zod(registerSchema)),
    };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const registerForm = await superValidate(request, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400, {
                registerForm,
            })
        }

        try {
            await signup(registerForm.data.email, registerForm.data.password)
        } catch (error) {
            console.error(error)
        }

        // try {
        //     await login(registerForm.data.email, registerForm.data.password)
        // } catch (error) {
        //     console.error(error)
        // }

        // try {
        //     const kubeConfig = await generateNewUserKubeConfig(registerForm.data.email)
        //     console.log("Kubeconfig generated")

        //     databases.createDocument(
        //         "mcogp",
        //         "projects",
        //         ID.unique(),
        //         {
        //             name: "default",
        //             description: "Cluster for testing",
        //             kubeConfig: Buffer.from(kubeConfig).toString('base64')
        //         },
        //         [`user:${(await account.get()).$id}`]
        //     )

        // } catch (error) {
        //     console.error(error)
        //     console.log("Kubeconfig generation failed")
        // }
        
    }
}