'use client'
import { useDispatch } from "react-redux"
import { toggleTask, removeTask } from "../store/tasksSlice"
import { BsX } from "react-icons/bs";

interface Props {
    task: {
        id: string
        text: string
        completed: boolean
    }
}

export default function TaskItem({ task }: Props) {
    const dispatch = useDispatch()

    return (
        <li className="flex justify-between p-2 border-b">
            <span
                onClick={() => dispatch(toggleTask(task.id))}
                className={task.completed ? "line-through text-gray-500 cursor-pointer" : "cursor-pointer"}
            >
                {task.text}
            </span>
            <button onClick={() => dispatch(removeTask(task.id))} className="text-red-500">
                <BsX />
            </button>
        </li>
    )
}