"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFixtures = getFixtures;
require("dotenv/config");
const baseUrl = process.env.BASE_URL || 'https://sv.hoiquantv.xyz';
const API_URL = `${baseUrl}/api/v1/internal/fixtures`;
async function getFixtures(url = API_URL) {
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
    return data.data;
}
