const templates = [
  {
    category: 'reel_style',
    texts: [
      "TikTok感覚で神作をサクサク流し見 📱 縦スクロールで「抜きどころ」がすぐ見つかるの最高かよ。続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #縦スクロール #快適すぎる",
      "リール形式の無限プレビュー。スワイプするだけで今夜の「相棒」がすぐ決まる 🚀 詳細はプロフのサイトをチェック ✨\n\n{title}\n#SIREN #ご褒美タイム #無料サンプル",
      "このサクサク感、マジで中毒性ある。動画の美味しいとこだけつまみ食いできるの最高すぎる 🌊 詳細はプロフへ 🔗\n\n{title}\n#SIREN #動画プレビュー #使いやすさ抜群"
    ]
  },
  {
    category: 'feed_style',
    texts: [
      "インスタ感覚で中身をディグる ✨ 画像ギャラリーで中身をガッツリ確認できるのが助かる。続きはプロフから 🔗\n\n{title}\n#SIREN #ディスカバリー #沼る",
      "この画像モード、破壊力がすごい 📸 SNS感覚で推しの表情までチェック。詳細はプロフのリンクへ 🚀\n\n{title}\n#SIREN #美少女 #操作性抜群"
    ]
  },
  {
    category: 'discovery',
    texts: [
      "SNS感覚でオシャレに、かつ欲望に忠実に作品を探せるサイト 🌈 続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #捗る #快適検索",
      "指先一つで、求めてた一本が降臨する ✨ 動画も画像もシームレスで没入感やばい。詳細はプロフをチェック ⚡\n\n{title}\n#SIREN #直感操作 #トレンド",
    ]
  },
  {
    category: 'organic_style',
    texts: [
      "これ、縦スクロールで本編前のチラ見ができるの捗りすぎるだろ。戻らなくていいのが最高 📱 続きはプロフのリンクに貼っておく 🔗\n\n{title}\n#SIREN #推し活 #夜のお供",
      "サイトが使いやすすぎて、検索してるだけでテンション上がる 💎 中身のチラ見も一瞬。続きはプロフのリンクから飛べる 🚀\n\n{title}\n#SIREN #最新の使い心地 #最高かよ",
      "作品探しは全部プロフのサイト。縦にサクサク中身チェックできるの、マジで分かってる 🌊\n\n{title}\n#SIREN #使いやすい #動画プレビュー"
    ]
  },
  {
    category: 'lifestyle',
    texts: [
      "仕事終わりのご褒美タイム 🍻 スマホでサクサク好みの動画が流れてくるこの時間が至福。プロフから飛べるよ 🔗\n\n{title}\n#SIREN #自分へのご褒美 #リラックス",
      "寝る前の5分が、気づいたら1時間経ってる件 😴 縦スクロールの魔力やばい。詳細はプロフのリンクに ✨\n\n{title}\n#SIREN #夜更かし #やめられない"
    ]
  },
  {
    category: 'short_impact',
    texts: [
      "これ、全人類使った方がいいレベルで快適。続きはプロフ 🔗\n\n{title}\n#SIREN #最高 #感動",
      "圧倒的感謝。動画探しがストレスフリー。詳細はプロフ 🚀\n\n{title}\n#SIREN #ライフハック #爆速"
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
