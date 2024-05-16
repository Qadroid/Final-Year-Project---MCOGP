import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { registerSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"

export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(zod(registerSchema)),
    };
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
