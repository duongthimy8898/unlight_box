import 'dotenv/config';
import { getFixtures } from './getFixtures';

const REFRESH_INTERVAL_MS = 5_000;
const PRE_LIVE_INTERVAL_MS = 1_500_000; // 25 minutes in milliseconds

const onLiveEndpoint = (fixtureId: string) => `${process.env.BASE_URL}/internal/api/matches/${fixtureId}/actions?act=live`;

async function refreshFixtures(): Promise<any[]> {
    try {
        const data = await getFixtures();
        // console.clear();
        console.log(`${new Date().toISOString()} - Fixtures refreshed`);
        // console.log(JSON.stringify(data, null, 2));
        return data as any[];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching fixtures:', error.message);
        } else {
            console.error('Unknown error fetching fixtures');
        }
        return [];
    }
}

async function main(): Promise<void> {
    console.log(`Starting ToggleLiveHelper for ${process.env.BASE_URL}...`);
    setInterval(async () => {
        const data = await refreshFixtures() as [];
        data.forEach(async (fixture: any) => {
            console.log(`Fixture ID: ${fixture.id}, Name: ${fixture.title}, Start Time: ${fixture.startTime}, LiveStatus: ${fixture.isLive}`);
            const timeToLive = Math.round((new Date(fixture.startTime).getTime() - Date.now()));
            console.log(`Time to Live: ${timeToLive}`);
            if (timeToLive - PRE_LIVE_INTERVAL_MS <= 0 && fixture.isLive === false) {
                console.log(`Fixture ${fixture.id} is about to go live!`);
                try {
                    console.log(`Turn on live status for ${onLiveEndpoint(fixture.id)}...`);
                    await fetch(onLiveEndpoint(fixture.id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(`Live status turned on for fixture ${fixture.id}`);
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(`Error turning on live status for fixture ${fixture.id}:`, error.message);
                    } else {
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
