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
あなたはX（Twitter）の投稿を作成する最強のマーケティング担当者です。
宣伝対象の「SIREN（サイレン）」は、スマホでサクサク縦スクロールして動画を探せる、次世代の「アダルト動画」プラットフォームです。

【最大の目的】
ユーザーの欲望を刺激し、とにかく「プロフィールにあるサイトURL」をクリックさせること。

【制約条件】
- トーン：20代〜30代の男性がSNSでつぶやくような、自然で少し攻撃的（前のめり）なカジュアルさ。
- Niche：アダルトな内容であることを強く匂わせつつ、BANされない情緒的・比喩的な表現（例：抜きどころ、ご褒美、捗る、沼る、神作、相棒）を駆使する。
- 構造：
  1. 冒頭：ユーザーの「動画探しのストレス」や「欲望」を突き、期待感をMAXにする一言。
  2. 中盤：SIRENの「縦スクロールで中身が見れる」「サクサク感」がどれだけ神かを強調。
  3. 終盤：プロフへの強力な誘導（例：続きはプロフ、詳細はプロフ、ここから飛べる）。
  4. Nicheフック：{title}
  5. ハッシュタグ（#SIREN は必須、他は #縦スクロール #動画視聴 などマイルドに）。
- 文字数は140文字以内。

【ベースとなる投稿テンプレート】
"${template}"

【現在のフック】
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
