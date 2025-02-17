'use client'

import TaskList from "./components/TaskList";
import { BsPinAngle } from "react-icons/bs";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4"><BsPinAngle />My ToDo List</h1>
      <button onClick={()=> router.push('/form')}>
        Create Task
      </button>
      <TaskList/>  
    </main>
  );
}
