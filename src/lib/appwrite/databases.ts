import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { APPWRITE_API_KEY } from '$env/static/private';

export function databases() {
}

// Init SDK
const client = new sdk.Client();

const databases = new sdk.Databases(client);

client
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY)
;

const promise = databases.create('<DATABASE_ID>', '[NAME]');

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
