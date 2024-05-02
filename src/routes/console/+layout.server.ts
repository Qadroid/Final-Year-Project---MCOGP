
import { redirect } from "@sveltejs/kit";
import { account } from '$lib/appwrite';

if (!account) {
    alert('You need to be logged in to access this page');
    throw redirect(302, '/auth');
}