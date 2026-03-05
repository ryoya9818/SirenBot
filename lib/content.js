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
            title: "スマホに最適化された縦スク動画",
            url: "https://sirenav.com/scrolling",
            thumbnail: "https://sirenav.com/thumb-scrolling.jpg"
        },
        {
            title: "インスタ感覚で抜ける神UI体験",
            url: "https://sirenav.com/experience",
            thumbnail: "https://sirenav.com/thumb-exp.jpg"
        },
        {
            title: "縦読み動画で最速ディグ可能",
            url: "https://sirenav.com/digging",
            thumbnail: "https://sirenav.com/thumb-dig.jpg"
        },
        {
            title: "欲望をスワイプで探す快感",
            url: "https://sirenav.com/swipe",
            thumbnail: "https://sirenav.com/thumb-swipe.jpg"
        }
    ];
}

module.exports = {
    fetchLatestSamples
};
