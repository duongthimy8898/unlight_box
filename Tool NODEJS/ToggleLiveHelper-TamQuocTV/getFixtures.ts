import 'dotenv/config';

const baseUrl = process.env.BASE_URL || 'https://sv.hoiquantv.xyz';
const API_URL = `${baseUrl}/internal/api/matches`;

export async function getFixtures(url = API_URL): Promise<any> {
    console.log(`Fetching fixtures from ${url}...`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data as any;
}

