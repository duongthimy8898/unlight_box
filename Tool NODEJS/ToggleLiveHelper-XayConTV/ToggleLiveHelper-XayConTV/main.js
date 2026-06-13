"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const getFixtures_1 = require("./getFixtures");
const REFRESH_INTERVAL_MS = 5000;
const PRE_LIVE_INTERVAL_MS = 1500000; // 25 minutes in milliseconds
const onLiveEndpoint = `${process.env.BASE_URL}/api/v1/internal/fixtures/acts?act=live&id=`;
async function refreshFixtures() {
    try {
        const data = await (0, getFixtures_1.getFixtures)();
        // console.clear();
        console.log(`${new Date().toISOString()} - Fixtures refreshed`);
        // console.log(JSON.stringify(data, null, 2));
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching fixtures:', error.message);
        }
        else {
            console.error('Unknown error fetching fixtures');
        }
        return [];
    }
}
async function main() {
    console.log(`Starting ToggleLiveHelper for ${process.env.BASE_URL}...`);
    setInterval(async () => {
        const data = await refreshFixtures();
        data.forEach(async (fixture) => {
            console.log(`Fixture ID: ${fixture.id}, Name: ${fixture.title}, Start Time: ${fixture.startTime}, LiveStatus: ${fixture.isLive}`);
            const timeToLive = Math.round((new Date(fixture.startTime).getTime() - Date.now()));
            console.log(`Time to Live: ${timeToLive}`);
            if (timeToLive - PRE_LIVE_INTERVAL_MS <= 0 && fixture.isLive === false) {
                console.log(`Fixture ${fixture.id} is about to go live!`);
                try {
                    console.log(`Turn on live status for ${onLiveEndpoint}${fixture.id}...`);
                    await fetch(`${onLiveEndpoint}${fixture.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(`Live status turned on for fixture ${fixture.id}`);
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(`Error turning on live status for fixture ${fixture.id}:`, error.message);
                    }
                    else {
                        console.error(`Unknown error turning on live status for fixture ${fixture.id}`);
                    }
                }
            }
        });
    }, REFRESH_INTERVAL_MS);
}
main().catch((error) => {
    console.error('Unexpected error in main:', error);
    process.exit(1);
});
