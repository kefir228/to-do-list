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
        <div>
            <div className="flex justify-between p-4 max-w-3xl mx-auto mt-10">
                <h1 className="font-bold text-2xl">Task Form</h1>
                <button className="text-2xl" onClick={() => router.push('/')}>
                    <BsArrowReturnLeft />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center pt-40 gap-3">
                <input
                    {...register('task', { required: 'Task is required' })}
                    placeholder="Enter your task"
                    className="border p-2 w-2/3"
                />
                <label htmlFor="category" className="font-bold">Choose category:</label>
                <select id="category" {...register('category', { required: 'Choose category' })} className="border p-2 w-2/3">
                    <option value="default">-- Choose --</option>
                    <option value="urgent">Urgent</option>
                    <option value="medium urgency">Medium urgency</option>
                    <option value="not urgent">Not urgent</option>
                </select>
                {errors.task && <p className="text-red-500">{errors.task.message}</p>}
                <button type="submit" className="bg-blue-900 text-white p-2 w-1/2">
                    Add Task
                </button>
            </form>

        </div>
    )
}