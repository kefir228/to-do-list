'use client'

import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import TaskItem from "./TaskItem"

export default function TaskList() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks)

    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    )
}

