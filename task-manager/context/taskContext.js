'use client'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const { user } = useUserContext();

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(false);
    const [priority, setPriority] = useState('all');

    const getUserTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/tasks`, { withCredentials: true });
            setTasks(response.data);
        } catch (error) {
            console.log('Error getting user tasks:', error);
        } finally {
            setLoading(false)
        }
    }

    const getSingleTask = async (taskId) => {
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, { withCredentials: true });
            setTask(response.data);
        } catch (error) {
            console.log('Error getting single task:', error);
        } finally {
            setLoading(false)
        }
    };

    const createTask = async (taskData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/api/tasks`, taskData, { withCredentials: true });
            setTasks((prev) => ([...prev, response.data]))
        } catch (error) {
            console.log('Error creating task:', error);
        } finally {
            setLoading(false)
        }
    };

    const updateTask = async (task) => {
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/api/tasks/${task._id}`, task, { withCredentials: true });
            setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
        } catch (error) {
            console.log('Error updating task:', error);
        } finally {
            setLoading(false);
        }
    }

    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/api.tasks/${taskId}`, { withCredentials: true });
            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.log('Error deleting task:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user?._id) {
            getUserTasks();
        }
    }, [user?._id]);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                task,
                loading,
                priority,
                getUserTasks,
                getSingleTask,
                createTask,
                updateTask,
                deleteTask,
                setPriority
            }} >
            {children}
        </TaskContext.Provider>
    )
};

export const useTaskContext = () => {
    return useContext(TaskContext)
}