"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { Task, TaskPriority, TaskStatus } from "@/types";
import { MOCK_TASKS } from "@/utils/mock-data";
import { t, getStoredLocale } from "@/i18n";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [loading, setLoading] = useState(false);

  const addTask = useCallback(
    (data: {
      title: string;
      description?: string;
      priority: TaskPriority;
      due_date?: string;
      tags: string[];
    }) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        user_id: "local",
        title: data.title,
        description: data.description,
        status: "todo",
        priority: data.priority,
        due_date: data.due_date,
        tags: data.tags,
        position: tasks.length,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, newTask]);
      toast.success(t(getStoredLocale(), "tasks.created"));
    },
    [tasks.length]
  );

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updates,
              updated_at: new Date().toISOString(),
              completed: updates.status === "done" ? true : updates.completed ?? t.completed,
            }
          : t
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success(t(getStoredLocale(), "tasks.deleted"));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const done = !t.completed;
        return {
          ...t,
          completed: done,
          status: done ? "done" : "todo",
          updated_at: new Date().toISOString(),
        };
      })
    );
  }, []);

  const reorderTasks = useCallback(
    (reordered: Task[]) => {
      setTasks(reordered.map((t, i) => ({ ...t, position: i })));
    },
    []
  );

  const moveTask = useCallback(
    (id: string, status: TaskStatus, position: number) => {
      setTasks((prev) => {
        const task = prev.find((t) => t.id === id);
        if (!task) return prev;
        const others = prev.filter((t) => t.id !== id);
        const updated = { ...task, status, position, completed: status === "done" };
        const inStatus = others.filter((t) => t.status === status);
        inStatus.splice(position, 0, updated);
        const rest = others.filter((t) => t.status !== status);
        return [...rest, ...inStatus.map((t, i) => ({ ...t, position: i }))];
      });
    },
    []
  );

  return {
    tasks,
    loading,
    setLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    moveTask,
    setTasks,
  };
}
