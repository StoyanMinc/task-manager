'use client'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const { user } = useUserContext();

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'low',
        dueDate: '',
        completed: false,
        _id: ''

    });
    const [loading, setLoading] = useState(false);
    const [priority, setPriority] = useState('all');
    const [editTaskMode, setEditTaskMode] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);

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
            if (!taskData.title || !taskData.description || !taskData.priority || !taskData.dueDate) {
                toast.error('All fields are required!');
                return
            }
            const response = await axios.post(`${BASE_URL}/api/tasks/create`, taskData, { withCredentials: true });
            setTasks((prev) => ([...prev, response.data]))
            setTask({
                title: '',
                description: '',
                priority: 'low',
                dueDate: '',
                completed: false,
            })
            toast.success('Successfully created a new task!');
            setShowTaskModal(false);
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
            setEditTaskMode(false);
            setShowTaskModal(false);
        } catch (error) {
            console.log('Error updating task:', error);
        } finally {
            setLoading(false);
        }
    }

    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, { withCredentials: true });
            setTasks(tasks.filter((task) => task._id !== taskId));
            toast.success('Successfully delete a task!');
        } catch (error) {
            console.log('Error deleting task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (name) => (e) => {
        const value = e.target.value;
        setTask((prev) => ({
            ...prev,
            [name]: value
        }))
    }
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
                showTaskModal,
                editTaskMode,
                getUserTasks,
                getSingleTask,
                createTask,
                updateTask,
                deleteTask,
                setTask,
                setPriority,
                handleInput,
                setShowTaskModal,
                setEditTaskMode
            }} >
            {children}
        </TaskContext.Provider>
    )
};

export const useTaskContext = () => {
    return useContext(TaskContext)
}