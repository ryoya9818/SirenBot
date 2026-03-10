const { GoogleGenerativeAI } = require("@google/generative-ai");
const { PERSONAS, APP_CONFIG } = require("./constants");

/**
 * AI logic to generate tweet text using Gemini
 */
async function generateAIPost(template, title) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.log("GEMINI_API_KEY not found. Falling back to template-only mode.");
        return template.replace('{title}', title).replace('{url}', '');
    }

    const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
あなたはX（Twitter）の投稿を作成する「${persona.name}」です。
性格・特徴：${persona.trait}

あなたに紹介してほしい「${APP_CONFIG.NAME}」は、${APP_CONFIG.DESCRIPTION}

【伝えたいこと】
このサイトを紹介するキャッチーなSNS投稿を作成してください。
主な機能：縦スクロールで動画が次々流れる、サンプル動画がその場で再生、スワイプで作品切替。

【制約条件】
- トーン：敬語は使わず、SNSで目を引くような短くパンチのある文体（タメ口・体言止めなど）にしてください。ただし「〜だわ」「〜かしら」などの女性言葉を使うと不自然になるため絶対に禁止です。
- 多様性：【超重要】毎回「最高かよ」「TikTok感覚」「神作」など同じ言葉ばかり使うのは絶対やめてください。テンプレ化を避けるため、毎回違った角度（「操作感がいい」「探す手間が省ける」「没入感がある」等）から、独自性のある新しい表現を考えてください。
- 絵文字：💨、🔥、✨、📱などの絵文字を文章のアクセントとして1〜2個自然に使用してください。
- 誘導句（CTA）：文章の最後には必ず「詳細はプロフのリンクへ 🔗」「続きはプロフから🚀」など、プロフィールへの誘導を入れてください（この誘導文自体も毎回少し変えてください）。
- 定型文禁止：「〜機能の良さ」「〜をアピール」というような説明的な書き方はNGです。直接ユーザーに刺さるキャッチコピーを書いてください。
- 構造：
  1. 思わずスクロールを止めるキャッチーなフック（1〜2文程度で完結させる）
  2. プロフへの短い誘導（例：「詳細はプロフのリンクから🔗」）
  3. 紹介する作品名：${title}
  4. ハッシュタグ（${APP_CONFIG.TAGS.join(' ')} は必須）。
- 文字数はタイトル・ハッシュタグを除いて50〜80文字程度に短く収めてください。

【ベースとなる投稿テンプレート】
"${template}"

【現在のフック（作品タイトル等）】
"${title}"

生成された投稿文のみを返してください。
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();

        // Clean up markdown if AI returns it
        text = text.replace(/```/g, '').replace(/^tweet\n/i, '');

        return text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback if API fails
        return template.replace('{title}', title).replace('{url}', '');
    }
}

module.exports = { generateAIPost };
