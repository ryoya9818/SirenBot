import React, { useState, useEffect } from 'react'
import { Power, Send, Clock, List, Settings, Save } from 'lucide-react'
import './App.css'

// --- GitHub API Configuration ---
// These should ideally be set in environment variables or a settings UI
const DEFAULT_OWNER = 'USER_REPLACE_ME' // e.g., your GitHub username
const DEFAULT_REPO = 'SirenBot'
const WORKFLOW_ID = 'bot.yml'

function App() {
    const [isActive, setIsActive] = useState(true)
    const [lastPost, setLastPost] = useState('--:--')
    const [logs, setLogs] = useState([
        { time: '--:--', msg: 'ダッシュボードを初期化中...', type: 'info' }
    ])
    const [showSettings, setShowSettings] = useState(false)
    const [config, setConfig] = useState({
        owner: localStorage.getItem('gh_owner') || '',
        repo: localStorage.getItem('gh_repo') || DEFAULT_REPO,
        token: localStorage.getItem('gh_token') || ''
    })

    // Fetch Status from GitHub
    const fetchStatus = async () => {
        if (!config.token || !config.owner) return

        try {
            const res = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/actions/runs?workflow=${WORKFLOW_ID}&per_page=5`, {
                headers: { 'Authorization': `token ${config.token}` }
            })
            const data = await res.json()

            if (data.workflow_runs && data.workflow_runs.length > 0) {
                const lastRun = data.workflow_runs[0]
                const date = new Date(lastRun.created_at)
                setLastPost(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

                const newLogs = data.workflow_runs.map(run => ({
                    time: new Date(run.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    msg: `ワークフロー ${run.status === 'completed' ? (run.conclusion === 'success' ? '成功' : '失敗') : '進行中'}`,
                    type: run.conclusion === 'success' ? 'success' : 'error'
                }))
                setLogs(newLogs)
            }
        } catch (err) {
            console.error('Failed to fetch status:', err)
        }
    }

    useEffect(() => {
        fetchStatus()
        const interval = setInterval(fetchStatus, 60000) // 1分ごとに更新
        return () => clearInterval(interval)
    }, [config])

    const handlePostNow = async () => {
        if (!config.token || !config.owner) {
            alert('設定画面からGitHubの情報を入力してください。')
            setShowSettings(true)
            return
        }

        try {
            const res = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/actions/workflows/${WORKFLOW_ID}/dispatches`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${config.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({ ref: 'main' })
            })

            if (res.ok) {
                alert('手動投稿ワークフローを起動しました！')
                fetchStatus()
            } else {
                const errData = await res.json()
                alert(`エラー: ${errData.message}`)
            }
        } catch (err) {
            alert('通信エラーが発生しました。')
        }
    }

    const saveConfig = () => {
        localStorage.setItem('gh_owner', config.owner)
        localStorage.setItem('gh_repo', config.repo)
        localStorage.setItem('gh_token', config.token)
        setShowSettings(false)
        fetchStatus()
    }

    return (
        <div className="simple-container">
            <header className="simple-header">
                <h1>SirenAI Bot Control</h1>
                <div className="header-right">
                    <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
                        <Settings size={20} />
                    </button>
                    <div className={`status-dot ${isActive ? 'active' : ''}`}></div>
                </div>
            </header>

            <main className="simple-main">
                {showSettings ? (
                    <section className="settings-section">
                        <div className="control-card">
                            <h3>GitHub 連携設定</h3>
                            <div className="input-group">
                                <label>GitHub ユーザー名</label>
                                <input
                                    type="text"
                                    value={config.owner}
                                    onChange={(e) => setConfig({ ...config, owner: e.target.value })}
                                    placeholder="例: apple"
                                />
                            </div>
                            <div className="input-group">
                                <label>リポジトリ名</label>
                                <input
                                    type="text"
                                    value={config.repo}
                                    onChange={(e) => setConfig({ ...config, repo: e.target.value })}
                                    placeholder="SirenBot"
                                />
                            </div>
                            <div className="input-group">
                                <label>Personal Access Token</label>
                                <input
                                    type="password"
                                    value={config.token}
                                    onChange={(e) => setConfig({ ...config, token: e.target.value })}
                                    placeholder="ghp_xxxxxxxxxxxx"
                                />
                                <p className="help-text">※リポジトリ操作権限が必要です</p>
                            </div>
                            <button className="big-post-btn save-btn" onClick={saveConfig}>
                                <Save size={20} /> 保存する
                            </button>
                        </div>
                    </section>
                ) : (
                    <>
                        <section className="control-section">
                            <div className="control-card">
                                <div className="control-header">
                                    <Power size={20} />
                                    <span>自動投稿システム</span>
                                </div>
                                <div className="control-body">
                                    <p>1日3回のスケジュール投稿</p>
                                    <label className="switch">
                                        <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <button className="big-post-btn" onClick={handlePostNow}>
                                <Send size={24} />
                                今すぐ投稿
                            </button>
                        </section>

                        <section className="status-section">
                            <div className="info-card">
                                <Clock size={20} />
                                <div className="info-content">
                                    <span className="info-label">最終投稿</span>
                                    <span className="info-value">{lastPost}</span>
                                </div>
                            </div>

                            <div className="log-card">
                                <div className="log-header">
                                    <List size={18} />
                                    <span>アクティビティログ</span>
                                </div>
                                <div className="log-list">
                                    {logs.slice(0, 5).map((log, i) => (
                                        <div key={i} className="log-item">
                                            <span className="log-time">{log.time}</span>
                                            <span className="log-msg">{log.msg}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    )
}

export default App
