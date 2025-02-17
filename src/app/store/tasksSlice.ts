import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string
    text: string
    completed: boolean
    category: string
    status: string
}

interface TasksState {
    tasks: {
        [key: string]: Task[];
    }
}

const initialState: TasksState = {
    tasks: {
        'need to do': [],
        'in process': [],
        'done': [],
    }
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ text: string; category: string }>) => {
            const newTask: Task = {
                id: uuidv4(),
                text: action.payload.text,
                completed: false,
                category: action.payload.category,
                status: 'need to do',
            }
            state.tasks['need to do'].unshift(newTask)
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            for (const section of Object.keys(state.tasks)) {
                const task = state.tasks[section].find((t) => t.id === taskId);
                if (task) {
                    task.completed = !task.completed;
                    break;
                }
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            for (const section of Object.keys(state.tasks)) {
                const index = state.tasks[section].findIndex((t) => t.id === taskId);
                if (index !== -1) {
                    state.tasks[section].splice(index, 1);
                    break;
                }
            }
        },
        flatInitialData: (state, action: PayloadAction<TasksState>) => {
            state.tasks = {
                'need to do': [],
                'in process': [],
                'done': [],
                ...action.payload.tasks,
            };
        },
        updateTasks: (state, action: PayloadAction<TasksState['tasks']>) => {
            state.tasks = action.payload
        }
    }
})

export const { addTask, toggleTask, removeTask, flatInitialData, updateTasks } = tasksSlice.actions
export default tasksSlice.reducer
export type { TasksState }