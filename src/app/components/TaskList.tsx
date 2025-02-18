'use client'

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/store"
import { useEffect } from "react"
import { loadState } from "../store/localStorage"
import { flatInitialData, updateTasks } from "../store/tasksSlice"
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import TaskItem from "./TaskItem"

export default function TaskList() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        const storedData = loadState();
        if (storedData && storedData.tasks) {
            dispatch(flatInitialData(storedData));
        } else {
            dispatch(flatInitialData({
                tasks: {
                    'need to do': [],
                    'in process': [],
                    'done': [],
                }
            }));
        }
    }, [dispatch]);


    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        
        const sourceList = [...tasks[source.droppableId]]
        const destinationList = [...tasks[destination.droppableId]]
        
        const [movedTask] = sourceList.splice(source.index, 1);
        
        const updatedTask = { ...movedTask, status: destination.droppableId }
        destinationList.splice(destination.index, 0, updatedTask);

        dispatch(updateTasks({
            ...tasks,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList,
        }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4">
                {['need to do', 'in process', 'done'].map((section) => (
                    <Droppable key={section} droppableId={section}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="w-1/3 bg-gray-500 p-2 rounded-md"
                            >
                                <p className="text-2xl font-bold">{section}</p>
                                {tasks[section]?.length > 0 ? tasks[section].map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskItem task={task} />
                                            </div>
                                        )}
                                    </Draggable>
                                )) : <p>No tasks</p>}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    )
}

