'use client'

import { TasksState } from "./tasksSlice"

export const loadState = ():  TasksState | undefined => {
    try {
        if(!window) return
        const seriliazedState = localStorage.getItem('tasksState')
        if (seriliazedState === null) {
            return undefined
        }
        const loadedState = JSON.parse(seriliazedState)
        
        return{
            tasks:{
                'need to do': [],
                'in process': [],
                'done': [],
                ...loadedState.tasks,
            }
        }
    } catch (error) {
        console.error("Could not load state", error)
        return undefined
    }
}

export const saveState = (state: { tasks: TasksState }) => {
    try {
        const seriliazedState = JSON.stringify(state.tasks)
        localStorage.setItem('tasksState', seriliazedState)
    } catch (error) {
        console.error("Could not save state", error)
    }
}