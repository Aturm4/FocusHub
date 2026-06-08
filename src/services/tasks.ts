import { createClient } from "@/lib/supabase/client";
import type { Task, TaskPriority, TaskStatus } from "@/types";

export async function fetchTasks(userId: string): Promise<Task[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createTask(
  userId: string,
  task: Partial<Task>
): Promise<Task> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...task, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(
  id: string,
  updates: Partial<Task>
): Promise<Task> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderTasks(
  tasks: { id: string; position: number; status: TaskStatus }[]
): Promise<void> {
  const supabase = createClient();
  const updates = tasks.map((t) =>
    supabase.from("tasks").update({ position: t.position, status: t.status }).eq("id", t.id)
  );
  await Promise.all(updates);
}

export function getPriorityColor(priority: TaskPriority): string {
  const colors: Record<TaskPriority, string> = {
    low: "text-blue-400 bg-blue-400/10",
    medium: "text-yellow-400 bg-yellow-400/10",
    high: "text-orange-400 bg-orange-400/10",
    urgent: "text-red-400 bg-red-400/10",
  };
  return colors[priority];
}
