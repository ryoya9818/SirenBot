require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const { fetchLatestSamples } = require('./lib/content');
const { getRandomTemplate } = require('./lib/templates');

// Initialize Twitter Client
const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_KEY_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

const rwClient = client.readWrite;

/**
 * Main function to post a random sample to X
 */
async function postToX() {
    try {
        console.log('--- Starting Post Process ---');

        // Adjust delay for GitHub Actions (10-20 mins) to avoid job timeout but keep randomness
        const minDelay = 10;
        const maxExtraDelay = 10;
        const delayMinutes = Math.floor(Math.random() * maxExtraDelay) + minDelay;

        if (process.env.NODE_ENV !== 'test') {
            console.log(`Waiting for ${delayMinutes} minutes to mimic human behavior and avoid automated detection...`);
            await new Promise(resolve => setTimeout(resolve, delayMinutes * 60 * 1000));
        }

        // 1. Fetch Latest Samples
        const samples = await fetchLatestSamples();
        if (!samples || samples.length === 0) {
            console.log('No samples found to post.');
            return;
        }

        // 2. Pick a random sample
        const sample = samples[Math.floor(Math.random() * samples.length)];
        console.log(`Selected Sample: ${sample.title}`);

        // 3. Generate Post Text
        const { generateAIPost } = require('./lib/ai');
        const template = getRandomTemplate();

        console.log('Generating content with AI...');
        const postText = await generateAIPost(template, sample.title);

        console.log(`Final Post Text:\n${postText}`);

        // 4. (Optional) Upload Media - Future improvement

        // 5. Post Tweet
        await rwClient.v2.tweet(postText);
        console.log('--- Successfully posted to X! ---');

    } catch (error) {
        console.error('Error during post process:', error);
        if (error.code === 401) {
            console.error('Check your X API credentials in .env');
        }
    }
}

// If run directly, execute the post
if (require.main === module) {
    postToX();
}

module.exports = { postToX };
