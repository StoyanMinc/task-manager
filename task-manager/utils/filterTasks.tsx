import { Task } from "@/types/user";

export const filterTasks = (tasks: Task[], priority: string) => {
    const filteredTasks = () => {
        switch (priority) {
            case 'low':
                return tasks.filter((task) => task.priority === 'low');
            case 'medium':
                return tasks.filter((task) => task.priority === 'medium');
            case 'high':
                return tasks.filter((task) => task.priority === 'high');
            default:
                return tasks
        }
    }

    return filteredTasks();
}