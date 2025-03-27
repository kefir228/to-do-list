'use client'
import { useDispatch } from "react-redux"
import { toggleTask, removeTask } from "../store/tasksSlice"
import { BsX } from "react-icons/bs";

interface Props {
    task: {
        id: string
        text: string 
        completed: boolean
        category:string
    }
}

export default function TaskItem({ task }: Props) {
    const dispatch = useDispatch()

    const categoryColors: { [key: string]: string } = {
        'urgent': 'bg-red-200',
        'medium urgency': 'bg-yellow-200',
        'not urgent': 'bg-green-200',
        'default':'bg-gray-700'
    };

    const bgColorClass = task.completed ? categoryColors['default'] : categoryColors[task.category] || ''

    return (
        <li className={`flex justify-between p-2  ${bgColorClass}`}>
            <span
                onClick={() => dispatch(toggleTask(task.id))}
                className={task.completed ? "line-through text-gray-500 cursor-pointer truncate" : "cursor-pointer truncate"}
            >
                {task.text}
            </span>
            <button onClick={() => dispatch(removeTask(task.id))} className="text-2xl">
                <BsX />
            </button>
        </li>
    )
}