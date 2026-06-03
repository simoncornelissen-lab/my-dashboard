import React, { useState } from 'react'
import { db } from '../firebase'
import {
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { Calendar, Trash2, Edit2, AlertCircle, Clock, FileText, Link as LinkIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import TaskModal from './TaskModal'

export default function TaskCard({ task }) {
  const [showModal, setShowModal] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteDoc(doc(db, 'tasks', task.id))
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900/30 border-red-700 text-red-400'
      case 'medium':
        return 'bg-yellow-900/30 border-yellow-700 text-yellow-400'
      case 'low':
        return 'bg-green-900/30 border-green-700 text-green-400'
      default:
        return 'bg-slate-800 border-slate-700 text-slate-400'
    }
  }

  const getCategoryColor = (category) => {
    return category === 'work'
      ? 'bg-blue-900/30 text-blue-400'
      : 'bg-purple-900/30 text-purple-400'
  }

  const dueDate = task.dueDate
    ? new Date(task.dueDate)
    : null

  const isOverdue = dueDate && dueDate < new Date() && task.status !== 'done'

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-slate-800 rounded-lg border border-slate-700 p-3 hover:border-slate-600 transition cursor-pointer group"
      >
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-medium text-slate-100 flex-1 line-clamp-2 group-hover:text-blue-400 transition">
            {task.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
              }}
              className="p-1 hover:bg-slate-700 rounded"
            >
              <Edit2 size={16} className="text-slate-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
              className="p-1 hover:bg-red-900/30 rounded"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-2">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <div className="space-y-1">
          {task.timeEstimate && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock size={14} />
              <span>{task.timeEstimate}h estimated</span>
            </div>
          )}

          {dueDate && (
            <div className={`flex items-center gap-2 text-xs ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}>
              {isOverdue && <AlertCircle size={14} />}
              <Calendar size={14} />
              <span>
                {formatDistanceToNow(dueDate, { addSuffix: true })}
              </span>
            </div>
          )}

          {task.attachments && task.attachments.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <LinkIcon size={14} />
              <span>{task.attachments.length} attachment(s)</span>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}