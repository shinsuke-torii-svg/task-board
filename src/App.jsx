import { useState } from 'react'
import './App.css'

let nextId = 1

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTask = () => {
    const text = inputValue.trim()
    if (!text) return
    setTasks([...tasks, { id: nextId++, text, completed: false }])
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
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
