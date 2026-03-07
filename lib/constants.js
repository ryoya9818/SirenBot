/**
 * Centralized constants and configurations for SirenBot
 */

const PERSONAS = [
    {
        name: "AVに超詳しいマニア",
        trait: "とにかく作品数に詳しく、新作チェックが趣味。良い作品を共有したい情熱がある。"
    },
    {
        name: "AVに詳しいファン",
        trait: "新作チェックが日課で、使いやすさに感動している。専門用語は使わず、直感的な良さを強調する。"
    },
    {
        name: "カジュアルなヘビーユーザー",
        trait: "友人にお勧めを教えるような、フランクで共感重視のトーン。日常感がある。"
    },
    {
        name: "深夜に語るエモいユーザー",
        trait: "少し詩的、または欲望に忠実ながらも言葉を選んでいる。没入感を重視。"
    }
];

const APP_CONFIG = {
    NAME: "SIREN（サイレン）",
    DESCRIPTION: "スマホで動画がサクサク見れる、使い勝手最高の動画サイトです。",
    VIBE_KEYWORDS: ["抜きどころ", "ご褒美", "捗る", "沼る", "神作", "相棒"],
    TAGS: ["#SIREN", "#縦スクロール", "#動画視聴"]
};

const CTA_TEXTS = [
    "続きはここから 🔗",
    "全編チェックはこちら 🚀",
    "今すぐ中身を確認 ✨",
    "詳細はこちらのサイトで 👇",
    "続きが気になる方はこちら 🔗",
    "最速でディグるならここ ⚡"
];

module.exports = {
    PERSONAS,
    APP_CONFIG,
    CTA_TEXTS
};
