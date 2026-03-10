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
      "動画のサンプルがその場で再生される。買う前に中身しっかり確認できるのがデカい 🔥 続きはプロフから 🔗\n\n{title}\n#SIREN #サンプル再生 #中身確認",
      "プレビューで抜きどころを先にチェックできる。ハズレ引く確率が激減した ✨ 詳細はプロフのリンクへ 🔗\n\n{title}\n#SIREN #動画プレビュー #ハズレなし"
    ]
  },
  {
    category: 'speed',
    texts: [
      "ページの読み込みが爆速。サンプル動画も一瞬で再生始まる。他のサイトに戻れなくなった 🚀 続きはプロフのリンクから 🔗\n\n{title}\n#SIREN #爆速読み込み #ストレスフリー",
      "スマホでもPC並みにサクサク動く。重くて固まるとかマジでない。続きはプロフのリンクから飛べる 📱\n\n{title}\n#SIREN #高速表示 #スマホ対応",
      "動画の読み込み待ちゼロ。タップした瞬間に再生始まるスピード感は他にない 🔥\n\n{title}\n#SIREN #即再生 #快適動作"
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
      "スクロールだけで動画チェック、サンプルで中身確認。スマホ一台で完結するサイト 🚀 詳細はプロフ\n\n{title}\n#SIREN #縦スクロール #動画プレビュー"
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
