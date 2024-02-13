/*
    serves a sveltekit GET request
*/


import type { RequestHandler } from '@sveltejs/kit';


export const GET: RequestHandler = async (request) => {
    const q = new URL(request.request.url).searchParams.get('q');
    const response = await fetch(`https://api.dehashed.com/search?query=${q}`, {
        headers: {
            'Authorization': `Basic ${import.meta.env.VITE_DEHASHED_API_KEY}`,
            "Accept": "application/json",
        }
    });
    const data = await response.json();
    return new Response(JSON.stringify(data.entries), {
        headers: {
            'content-type': 'application/json',
        }
    });
};
