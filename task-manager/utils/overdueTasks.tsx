import { Task } from "@/types/user";
import moment from "moment";

export const overDueTasks = (tasks: Task[]) => {
    const today = moment();
    return tasks.filter((task) => !task.completed && moment(task.dueDate).isBefore(today));
}