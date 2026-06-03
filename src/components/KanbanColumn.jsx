import React, { useState } from 'react'
import TaskCard from './TaskCard'
import { GripVertical } from 'lucide-react'

export default function KanbanColumn({ status, tasks }) {
  const [draggedTask, setDraggedTask] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('bg-slate-800')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-slate-800')
  }

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 rounded-full bg-${status.color}-500`}
        ></div>
        <h2 className="text-lg font-semibold text-slate-200">{status.label}</h2>
        <span className="ml-auto bg-slate-800 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div
        className="space-y-3 min-h-[400px] rounded-lg bg-slate-800/30 p-2 transition"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p className="text-sm">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  )
}