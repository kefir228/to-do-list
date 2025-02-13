import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { BsPinAngle } from "react-icons/bs";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4"><BsPinAngle />My ToDo List</h1>
      <TaskForm/>
      <TaskList/>    
    </main>
  );
}
