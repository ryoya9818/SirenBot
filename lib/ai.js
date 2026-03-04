const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * AI logic to generate tweet text using Gemini
 */
async function generateAIPost(template, title) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.log("GEMINI_API_KEY not found. Falling back to template-only mode.");
        return template.replace('{title}', title).replace('{url}', '');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
あなたはX（Twitter）の投稿を作成するマーケティング担当者です。
以下の「ベースとなる投稿テンプレート」と「作品タイトル」をもとに、
無限に新しいバリエーションの投稿文を生成してください。

【制約条件】
- トーン：20代〜30代の男性がSNSでつぶやくような、自然で少しカジュアルな口調。
- 禁止：不自然な語尾（「〜だね」「〜だよ」を過剰に使うなど）は避ける。自然な体言止めや、「〜だ」「〜だわ」「〜かも」などを使う。
- 構造：
  1. 冒頭にユーザーを惹きつける一言（共感や驚き）。
  2. サイト（SIREN）の利便性（縦スクロール、UIの良さ、サクサク見れる等）への言及。
  3. 「続きはプロフのリンクから」などの誘導。
  4. 作品タイトル：{title}
  5. ハッシュタグ（#SIREN は必須、他は適宜）。
- URLは絶対に含めない。
- 文字数はXの制限（140文字以内）に収める。

【ベースとなる投稿テンプレート】
"${template}"

【作品タイトル】
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
