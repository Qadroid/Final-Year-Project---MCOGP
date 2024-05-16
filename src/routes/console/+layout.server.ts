// // import { account, databases, ID } from "@/appwrite";
// import { generateNewUserKubeConfig } from "@/kubernetes/kubernetes";
// import { Query } from "appwrite";

// async function doesDefaultExist() {
//     const projects = await databases.listDocuments(
//         'mcogp', 
//         'projects', 
//         [
//             Query.equal('name', 'default')
//         ]
//     )

//     if (projects.documents.length > 0) {
//         return true;
//     } else {
//         return false;
//     }
// }

// async function createDefaultProject() {
//     const email = (await account.get()).email;
//     const kubeConfig = await generateNewUserKubeConfig(email);

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
// }

// if (!doesDefaultExist()) {
//     createDefaultProject();
// }
