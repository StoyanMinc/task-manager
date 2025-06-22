import { useTaskContext } from "@/context/taskContext";
import { Task } from "@/types/user";
import { edit, star, trash } from "@/utils/icons";
import { parseTime } from "@/utils/parseTime";

interface Props {
    task: Task;
}

export default function TaskItem({ task }: Props) {

    const { deleteTask, setTask, setShowTaskModal, setEditTaskMode } = useTaskContext();

    const colorPriority = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'text-red-500';
            case 'medium':
                return 'text-yellow-500';
            case 'low':
                return 'text-green-500';
            default:
                return 'text-gray-300';
        }
    }

    const showUpdateModalTaskHandler = async () => {
        setTask(task);

        setShowTaskModal(true);
        setEditTaskMode(true);
    }
    const deleteTaskHandler = async () => {
        await deleteTask(task._id)
    }

    return (
        <div className="h-[16rem] px-3 py-2 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-xl border-2 border-white">
            <div>
                <h4 className="font-bold text-1xl">{task.title}</h4>
                <p className="mt-5">{task.description}</p>
            </div>
            <div className="mt-auto flex justify-between items-center">
                <p className="text-gray-400 text-sm">{parseTime(task.createdAt)}</p>
                <p className={`${colorPriority(task.priority)} font-bold text-sm`}>{task.priority}</p>
                <div className="flex gap-2">
                    <button className={`${task.completed ? 'text-yellow-400' : 'text-gray-300'}`}>{star}</button>
                    <button className="text-blue-500" onClick={showUpdateModalTaskHandler}>{edit}</button>
                    <button className="text-red-500 cursor-pointer" onClick={deleteTaskHandler}>{trash}</button>
                </div>
            </div>
        </div>
    )
}