import { useState, useEffect, useRef } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board-tasks'

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [inputValue, setInputValue] = useState('')
  const nextId = useRef(Math.max(0, ...tasks.map(t => t.id)) + 1)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const text = inputValue.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: nextId.current++, text, completed: false }])
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const remaining = tasks.filter(t => !t.completed).length

  return (
    <div className="board">
      <h1 className="board-title">タスクボード</h1>

      <div className="input-row">
        <input
          className="task-input"
          type="text"
          placeholder="タスクを入力して Enter または「追加」..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTask}>追加</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty">タスクはまだありません</li>
        )}
        {tasks.map(task => (
          <li key={task.id} className={`task-item${task.completed ? ' completed' : ''}`}>
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="削除"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <p className="summary">
          未完了: <strong>{remaining}</strong> / {tasks.length} 件
        </p>
      )}
    </div>
  )
}

export default App
