import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
    id: string
    text: string
    completed: boolean
}

interface TasksState {
    tasks: Task[]
}

const initialState: TasksState = {
    tasks: []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.tasks.push({
                id: crypto.randomUUID(),
                text: action.payload,
                completed: false,
            })
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find((t) => t.id === action.payload)
            if (task) task.completed = !task.completed
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload)
        }
    }
})

export const {addTask, toggleTask, removeTask} = tasksSlice.actions
export default tasksSlice.reducer