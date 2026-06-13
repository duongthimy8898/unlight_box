import 'dotenv/config';

const baseUrl = process.env.BASE_URL || 'https://sv.saomaitv.xyz';
const API_URL = `${baseUrl}/api/v1/internal/fixtures`;

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

