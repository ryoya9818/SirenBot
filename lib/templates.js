const templates = [
  {
    category: 'vertical_scroll',
    texts: [
      "縦スクロールで動画がどんどん流れてくる。1本ずつ再生ボタン押す必要なし、スワイプだけで次の作品に切り替わる 📱 続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #縦スクロール #スワイプ操作",
      "サンプル動画がスクロールするだけで自動再生される。気になったらそのまま本編に飛べる導線がめちゃくちゃ便利 🚀 詳細はプロフへ 🔗\n\n{title}\n#SIREN #自動再生 #サンプル動画",
      "縦スクロールで次々プレビューが流れてくるから、手を止めずに一気にチェックできる。戻るボタン不要 📱 詳細はプロフのリンクから 🔗\n\n{title}\n#SIREN #高速ブラウジング #縦スクロール"
    ]
  },
  {
    category: 'preview',
    texts: [
      "動画のサンプルがその場で再生される。買う前にどんな動画か確認できるのがデカい 🔥 続きはプロフから 🔗\n\n{title}\n#SIREN #サンプル再生 #本編確認",
      "プレビューで抜きどころを先にチェックできる。ハズレ引く確率が激減した ✨ 詳細はプロフのリンクへ 🔗\n\n{title}\n#SIREN #動画プレビュー #ハズレなし"
    ]
  },

  {
    category: 'experience',
    texts: [
      "仕事終わりにスマホで縦スクロール。サンプル動画が次々流れてきて、気になったやつだけ本編チェック。この流れが最強 🔗 プロフから飛べるよ\n\n{title}\n#SIREN #サンプル視聴 #スマホ最適化",
      "寝る前に軽くチェックするつもりが1時間経ってた。スクロールするだけで次の動画が自動で流れてくるの中毒性やばい 😴 詳細はプロフのリンクに 🔗\n\n{title}\n#SIREN #自動再生 #無限スクロール"
    ]
  },
  {
    category: 'short_impact',
    texts: [
      "サンプル動画→本編の導線が神。スマホで縦スクロールするだけで全部完結する 🔗 続きはプロフ\n\n{title}\n#SIREN #スマホ完結 #サンプル再生",
      "スクロールだけで動画チェック、サンプルで雰囲気をチェック。スマホ一台で完結するサイト 🚀 詳細はプロフ\n\n{title}\n#SIREN #縦スクロール #動画プレビュー"
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
