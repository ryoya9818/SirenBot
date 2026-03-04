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

// Check if credentials are provided (without leaking them)
console.log('Checking X API Credentials...');
console.log(`X_API_KEY: ${process.env.X_API_KEY ? 'Present' : 'MISSING'}`);
console.log(`X_API_KEY_SECRET: ${process.env.X_API_KEY_SECRET ? 'Present' : 'MISSING'}`);
console.log(`X_ACCESS_TOKEN: ${process.env.X_ACCESS_TOKEN ? 'Present' : 'MISSING'}`);
console.log(`X_ACCESS_TOKEN_SECRET: ${process.env.X_ACCESS_TOKEN_SECRET ? 'Present' : 'MISSING'}`);

const rwClient = client.readWrite;

/**
 * Main function to post a random sample to X
 */
async function postToX() {
    try {
        console.log('--- Starting Post Process ---');

        const isDryRun = process.env.DRY_RUN === 'true';
        if (isDryRun) {
            console.log('DRY RUN MODE: Enabled');
        }

        // Adjust delay for GitHub Actions (10-20 mins) to avoid job timeout but keep randomness
        const minDelay = 10;
        const maxExtraDelay = 10;
        const delayMinutes = Math.floor(Math.random() * maxExtraDelay) + minDelay;

        if (process.env.NODE_ENV !== 'test' && !isDryRun) {
            console.log(`Waiting for ${delayMinutes} minutes to mimic human behavior and avoid automated detection...`);
            await new Promise(resolve => setTimeout(resolve, delayMinutes * 60 * 1000));
        } else if (isDryRun) {
            console.log('Skipping delay due to DRY_RUN mode.');
        }

        // 1. Fetch Latest Samples
        const samples = await fetchLatestSamples();
        if (!samples || samples.length === 0) {
            throw new Error('No samples found to post.');
        }

        // 2. Pick a random sample
        const sample = samples[Math.floor(Math.random() * samples.length)];
        console.log(`Selected Sample: ${sample.title}`);

        // 3. Generate Post Text
        const { generateAIPost } = require('./lib/ai');
        const template = getRandomTemplate();

        console.log('Generating content with AI...');
        const postText = await generateAIPost(template, sample.title);

        console.log('--- Post Content ---');
        console.log(postText);
        console.log('--- End of Content ---');

        // 4. (Optional) Upload Media - Future improvement

        // 5. Post Tweet
        if (isDryRun) {
            console.log('DRY RUN: Skipping actual tweet posting.');
        } else {
            const { data: createdTweet } = await rwClient.v2.tweet(postText);
            console.log('--- Successfully posted to X! ---');
            console.log(`Tweet ID: ${createdTweet.id}`);
            console.log(`Tweet Text: ${createdTweet.text}`);
        }

    } catch (error) {
        console.error('CRITICAL: Error during post process:');
        console.error(error);

        if (error.code === 401 || (error.data && error.data.status === 401)) {
            console.error('AUTHENTICATION ERROR: Check your X API credentials (API Key, Secret, Access Token, etc.) in .env or GitHub Secrets.');
        }

        if (error.data) {
            console.error('API Response Data:', JSON.stringify(error.data, null, 2));
        }

        // Exit with non-zero status to signal failure to GitHub Actions
        process.exit(1);
    }
}

// If run directly, execute the post
if (require.main === module) {
    postToX();
}

module.exports = { postToX };
