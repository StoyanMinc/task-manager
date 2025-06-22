'use client'
import { useTaskContext } from "@/context/taskContext"
import moment from 'moment'

export default function TaskModal() {

    const { task, handleInput, createTask, setShowTaskModal, updateTask, editTaskMode } = useTaskContext();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTask(task);
    }

    const updateTaskHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateTask(task);
    }
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setShowTaskModal(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#333]/30 overflow-hidden" onClick={handleOverlayClick}>
            <form
                onSubmit={editTaskMode ? updateTaskHandler : submitHandler}
                className="bg-white px-6 py-5 w-full rounded-lg shadow-lg max-w-[520px] gap-3 absolute left-1/2 top-1/2 flex flex-col transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="self-center text-[20px] font-bold">Create Task</h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                        className="bg-[#f9f9f9] border rounded-md p-2"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Task title"
                        value={task?.title}
                        onChange={(e) => handleInput('title')(e)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="bg-[#f9f9f9] border rounded-md p-2 resize-none"
                        id="description"
                        name="description"
                        placeholder="Task description"
                        rows={4}
                        value={task.description}
                        onChange={(e) => handleInput('description')(e)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="priority">Select priority</label>
                    <select
                        name="priority"
                        id="priority"
                        className="bg-[#f9f9f9] border rounded-md p-2 cursor-pointer"
                        value={task.priority}
                        onChange={(e) => handleInput('priority')(e)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="dueDate">dueDate</label>
                    <input
                        className="bg-[#f9f9f9] border rounded-md p-2"
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        // placeholder={task.dueDate ? moment("2025-06-22T00:00:00.000Z").format("DD.MM.YYYY") : ''}
                        value={task.dueDate ? moment(task.dueDate).format("YYYY-MM-DD") : ''}
                        onChange={(e) => handleInput('dueDate')(e)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="completed">Task completed</label>
                    <div className="flex items-center justify-between bg-[#f9f9f9] border rounded-md p-2 cursor-pointer">
                        <label htmlFor="completed">Completed</label>
                        <select
                            name="completed"
                            id="completed"
                            className="bg-[#f9f9f9] border rounded-md p-2 cursor-pointer"
                            value={task.completed ? 'true' : 'false'}
                            onChange={(e) => handleInput('completed')(e)}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                </div>
                <button
                    className=
                    "mt-7 bg-[#3aafae] self-center px-3 py-2 rounded-xl text-white hover:bg-[rgb(73,160,158)] ease-in-out transition duration-400"
                >
                    { editTaskMode ? 'Edit task' : 'Create task'}
                </button>

            </form>
        </div>
    )
}