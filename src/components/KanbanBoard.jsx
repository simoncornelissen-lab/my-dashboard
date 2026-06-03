import React from 'react'
import KanbanColumn from './KanbanColumn'

const STATUSES = [
  { id: 'todo', label: 'To Do', color: 'slate' },
  { id: 'in-progress', label: 'In Progress', color: 'blue' },
  { id: 'done', label: 'Done', color: 'green' },
]

export default function KanbanBoard({ tasks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {STATUSES.map((status) => (
        <KanbanColumn
          key={status.id}
          status={status}
          tasks={tasks.filter((task) => task.status === status.id)}
        />
      ))}
    </div>
  )
}