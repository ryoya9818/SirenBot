const templates = [
  {
    category: 'reel_style',
    texts: [
      "TikTok感覚で神作をサクサク流し見 📱 縦スクロールで「抜きどころ」がすぐ見つかるの最高かよ。続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #縦スクロール #快適すぎる",
      "リール形式の無限プレビュー。スワイプするだけで今夜の「相棒」がすぐ決まる 🚀 詳細はプロフのサイトをチェック ✨\n\n{title}\n#SIREN #ご褒美タイム #無料サンプル",
    ]
  },
  {
    category: 'feed_style',
    texts: [
      "インスタ感覚で中身をディグる ✨ 画像ギャラリーで中身をガッツリ確認できるのが助かる。続きはプロフから 🔗\n\n{title}\n#SIREN #ディスカバリー #沼る",
      "この画像モード、破壊力がすごい 📸 SNS感覚で推しの表情までチェック。詳細はプロフのリンクへ 🚀\n\n{title}\n#SIREN #美少女 #神操作",
    ]
  },
  {
    category: 'discovery',
    texts: [
      "SNS感覚でオシャレに、かつ欲望に忠実に作品を探せる神プラットフォーム 🌈 続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #捗る #快適検索",
      "指先一つで、求めてた一本が降臨する ✨ 動画も画像もシームレスで没入感やばい。詳細はプロフをチェック ⚡\n\n{title}\n#SIREN #直感操作 #トレンド",
    ]
  },
  {
    category: 'organic_style',
    texts: [
      "これ、縦スクロールで本編前のチラ見ができるの捗りすぎるだろ。戻らなくていいのが神 📱 続きはプロフのリンクに貼っておく 🔗\n\n{title}\n#SIREN #推し活 #夜のお供",
      "プロフのサイト、リール感覚で抜ける動画が探せるのめっちゃいい。サンプル充実してて感謝 🙏\n\n{title}\n#SIREN #ディスカバリー #サンプル動画",
      "UIがオシャレすぎて、検索してるだけでテンション上がる 💎 中身のチラ見も一瞬。続きはプロフのリンクから飛べる 🚀\n\n{title}\n#SIREN #次世代UI #神作",
      "作品探しは全部プロフのサイト。縦にサクサク中身チェックできるの、マジで分かってる 🌊\n\n{title}\n#SIREN #神サイト #動画プレビュー"
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
