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
このサイトの具体的な機能を、あなたの言葉で自然に伝えてください。
主な機能：縦スクロールで動画が次々流れる、サンプル動画がその場で再生、スワイプで作品切替、スマホ最適化、爆速読み込み。
「この機能便利すぎ」「もう他のサイト使えない」と思わせることがゴールです。

【制約条件】
- トーン：あなたのキャラ設定に基づいた、自然な会話。
- 表現：興味を引くためにアダルトな雰囲気を出しつつ、SNSの規約に配慮した比喩（例：${APP_CONFIG.VIBE_KEYWORDS.join('、')}）を使ってください。
- 禁止ワード：「画像」「写真」「フォト」「📸」「イメージ」など画像に関するワードは絶対に使わないでください。また「オシャレ」「UIが綺麗」「デザインが良い」「SNS感覚」のような見た目・デザインの感想ではなく、具体的な機能を伝えてください。このサイトは動画専門です。
- 構造：
  1. 自分の感想や驚きから始める。
  2. ${APP_CONFIG.NAME}の使い心地を強調。
  3. 「詳細はプロフィールから」など、自然な導線を作る。
  4. 紹介する作品：${title}
  5. ハッシュタグ（${APP_CONFIG.TAGS.join(' ')} は必須）。
- 文字数は110〜140文字程度。
- テンプレートの文言に縛られすぎず、キャラに合わせた自然なリライトをしてください。

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
