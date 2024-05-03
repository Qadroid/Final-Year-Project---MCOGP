import { Client, Account } from 'appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { ID } from 'appwrite';

const server = {
    endpoint: PUBLIC_APPWRITE_ENDPOINT,
    project: PUBLIC_APPWRITE_PROJECT_ID,    
}

const client = new Client();
const account = new Account(client);
client.setEndpoint(server.endpoint).setProject(server.project);

export { ID, account, client } 
