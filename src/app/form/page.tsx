'use client'

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addTask } from '@/app/store/tasksSlice'
import { BsArrowReturnLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";

type TaskFormValues = {
    task: string
    category: string
}

export default function TaskForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormValues>()
    const router = useRouter()

    const onSubmit = (data: TaskFormValues) => {
        dispatch(addTask({ text: data.task, category: data.category }))
        reset()
    }

    return (
        <>
            <h1>Task Form</h1>
            <button onClick={() => router.push('/')}>
                <BsArrowReturnLeft />
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input
                    {...register('task', { required: 'Task is required' })}
                    placeholder="Enter your task"
                    className="border p-2 w-1/2"
                />
                <label htmlFor="category">Choose category:</label>
                <select id="category" {...register('category', { required: 'Choose category' })} className="border p-2">
                    <option value="default">-- Choose --</option>
                    <option value="urgent">Urgent</option>
                    <option value="medium urgency">Medium urgency</option>
                    <option value="not urgent">Not urgent</option>
                </select>
                {errors.task && <p className="text-red-500">{errors.task.message}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Add Task
                </button>
            </form>

        </>
    )
}