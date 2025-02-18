'use client'

import TaskList from "./components/TaskList";
import { BsPinAngle } from "react-icons/bs";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <>
      <main className="max-w-5xl p-4 mx-auto mt-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2"><BsPinAngle />My ToDo List</h1>
        <button className="mb-4 font-bold" onClick={() => router.push('/form')}>
          Create Task
        </button>
      </main>
      <TaskList />
    </>
  );
}
