'use client'

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addTask } from "../store/tasksSlice"

type TaskFormValues = {
    task: string
}

export default function TaskForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormValues>()

    const onSubmit = (data: TaskFormValues) => {
        dispatch(addTask(data.task))
        reset()
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input 
                {...register('task',{required:'Task is required'})}
                placeholder="Enter your task"
                className="border p-2 w-full"
            />
            {errors.task && <p className="text-red-500">{errors.task.message}</p>}
            <button type="submit" className="bg-blue-500 text-white p-2">
                Add Task
            </button>
        </form>
    )
}