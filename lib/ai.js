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
宣伝対象の「SIREN（サイレン）」は、スマホでサクサク縦スクロールして動画を探せる、次世代の「アダルト動画」プラットフォームです。

以下の「ベースとなる投稿テンプレート」と「作品タイトル」をもとに、
ユーザーの期待感を煽り、クリックしたくなるようなバリエーション豊かな投稿文を生成してください。

【制約条件】
- トーン：20代〜30代の男性がSNSでつぶやくような、自然で少しカジュアルな口調。
- Niche：アダルトな内容であることを匂わせつつ、XのBANを避けるために過度に直接的な卑猥語は避け、情緒的・比喩的な表現（例：抜きどころ、ご褒美、捗る、沼る、神作）を使う。
- 構造：
  1. 冒頭にユーザーを惹きつける一言（期待、興奮、共感）。
  2. サイト（SIREN）の利便性（縦スクロールで中身が見れる、UIがオシャレ、サクサク探せる等）への言及。
  3. 「続きはプロフのリンクから」などの誘導。
  4. 作品タイトル：{title}
  5. ハッシュタグ（#SIREN は必須、他は適宜。アダルト関連のタグは避けるかマイルドに）。
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
