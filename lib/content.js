const fetch = require('node-fetch');

/**
 * Fetches sample video data from sirenav.com
 * Note: This is a placeholder implementation.
 * In a real scenario, this would call an API or query a database.
 */
async function fetchLatestSamples() {
    // Placeholder data - replace with actual API call or scrape logic
    // For now, returning a mock set of data to test the posting logic.
    return [
        {
            title: "サンプル動画 A",
            url: "https://sirenav.com/sample-a",
            thumbnail: "https://sirenav.com/thumb-a.jpg"
        },
        {
            title: "サンプル動画 B",
            url: "https://sirenav.com/sample-b",
            thumbnail: "https://sirenav.com/thumb-b.jpg"
        }
    ];
}

module.exports = {
    fetchLatestSamples
};
