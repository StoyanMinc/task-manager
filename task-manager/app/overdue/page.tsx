'use client';
import { useTaskContext } from "@/context/taskContext";
import useRedirectUser from "@/hooks/useUserRedirect";
import { Task } from "@/types/user";
import { filterTasks } from "@/utils/filterTasks";
import Filters from "../components/filters/Filters";
import TaskItem from "../components/taskItem/TaskItem";
import { overDueTasks } from "@/utils/overdueTasks";

export default function Completed() {
    useRedirectUser('/login')
    const { tasks, showCreateModalTaskHandler, priority } = useTaskContext();

    const overDateTasks = overDueTasks(tasks);
    const taskToDisplay = filterTasks(overDateTasks, priority);

    return (
        <main className="m-6 min-h-screen pb-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Overdue tasks Tasks</h1>
                <Filters />
            </div>
            <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,max-content))] gap-[1.5rem]">
                {taskToDisplay.map((task: Task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
                <button
                    className="h-[16rem] px-4 py-3 flex items-center justify-center bg-[rgba(249,249,249,0.76)] rounded-xl border-2 border-dashed border-gray-400 text-gray-400 font-medium text-lg hover:bg-gray-300 hover:border-none transiotion duration-300 ease-in-out"
                    onClick={showCreateModalTaskHandler}
                >
                    Add task
                </button>
            </div>
        </main>
    );
}
