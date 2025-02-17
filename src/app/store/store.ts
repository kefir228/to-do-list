'use client'

import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { TasksState } from '@/app/store/tasksSlice'
import { saveState } from "./localStorage";

const preloadedState: { task: TasksState } | undefined = undefined

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    preloadedState,
})

store.subscribe(() => {
    saveState({ tasks: store.getState().tasks })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch