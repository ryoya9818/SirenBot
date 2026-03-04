const templates = [
  {
    category: 'reel_style',
    texts: [
      "TikTok感覚で動画をサクサク流し見 📱 縦スクロールがかなり快適。続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #TikTok風 #動画プレビュー",
      "リール形式の無限プレビュー。スワイプするだけでお気に入りがすぐ見つかる 🚀 詳細はプロフのサイトをチェック ✨\n\n{title}\n#SIREN #リール動画 #無料サンプル",
    ]
  },
  {
    category: 'feed_style',
    texts: [
      "インスタ感覚で中身をチェック ✨ 画像ギャラリーで流し見できるのがいい。続きはプロフから 🔗\n\n{title}\n#SIREN #インスタ風 #ギャラリー形式",
      "画像モードがかなり便利 📸 SNS感覚でサンプル画像をディスカバリー。詳細はプロフのリンクへ 🚀\n\n{title}\n#SIREN #画像検索 #快適操作",
    ]
  },
  {
    category: 'discovery',
    texts: [
      "SNS感覚でオシャレに、かつ快適に作品を探せるプラットフォーム 🌈 続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #オシャレ #快適検索",
      "指先一つで、欲しかった一本が見つかる ✨ 動画も画像もシームレス。詳細はプロフをチェック �\n\n{title}\n#SIREN #直感操作 #トレンド",
    ]
  },
  {
    category: 'organic_style',
    texts: [
      "これ、縦スクロールで動画見れるの捗る。戻らなくていいのが最高 📱 続きはプロフのリンクに貼っておく 🔗\n\n{title}\n#SIREN #推し活 #快適すぎ",
      "プロフのサイト、リール感覚で作品探せるのめっちゃいい。サンプル充実してて助かる 🙏\n\n{title}\n#SIREN #ディスカバリー #サンプル動画",
      "UIがオシャレで検索してるだけで楽しい 💎 詳細ボタンも便利。続きはプロフのリンクから飛べる 🚀\n\n{title}\n#SIREN #次世代UI #動画検索",
      "作品探しは全部プロフのサイト。縦にサクサク動画チェックできるのが神 🌊\n\n{title}\n#SIREN #神サイト #動画プレビュー"
    ]
  }
];

function getRandomTemplate() {
  const category = templates[Math.floor(Math.random() * templates.length)];
  const text = category.texts[Math.floor(Math.random() * category.texts.length)];
  return text;
}

module.exports = {
  templates,
  getRandomTemplate
};
