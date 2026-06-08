"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  GripVertical,
  Calendar,
  Tag,
  Trash2,
  Check,
  Pencil,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { useApp } from "@/providers/app-provider";
import type { Task, TaskPriority, TaskStatus } from "@/types";
import { getPriorityColor } from "@/services/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { useTranslation } from "@/providers/locale-provider";

function DroppableColumn({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={cn(className, isOver && "ring-1 ring-violet-500/30")}
    >
      {children}
    </div>
  );
}

const COLUMN_CONFIG: { id: TaskStatus; color: string }[] = [
  { id: "todo", color: "border-white/20" },
  { id: "in_progress", color: "border-violet-500/30" },
  { id: "done", color: "border-emerald-500/30" },
];

function TaskCard({ task, onEdit, onDelete }: {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
}) {
  const { toggleComplete } = useApp().tasks;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={cn(
        "group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20",
        isDragging && "opacity-50 shadow-2xl"
      )}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 cursor-grab text-slate-300 dark:text-white/20 hover:text-fg-muted active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          onClick={() => toggleComplete(task.id)}
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
            task.completed
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-white/20 hover:border-violet-500"
          )}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </button>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-medium text-fg",
              task.completed && "line-through text-fg-subtle"
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 text-xs text-fg-subtle line-clamp-2">{task.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-medium capitalize",
                getPriorityColor(task.priority)
              )}
            >
              {task.priority}
            </span>
            {task.due_date && (
              <span className="flex items-center gap-1 text-[10px] text-fg-subtle">
                <Calendar className="h-3 w-3" />
                {format(new Date(task.due_date), "MMM d")}
              </span>
            )}
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-0.5 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-fg-muted"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            className="rounded p-1 text-fg-subtle hover:bg-white/10 hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded p-1 text-fg-subtle hover:bg-red-500/20 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function TaskBoard() {
  const { t } = useTranslation();
  const { tasks: taskApi } = useApp();
  const { tasks, addTask, updateTask, deleteTask, moveTask } = taskApi;

  const COLUMNS = COLUMN_CONFIG.map((col) => ({
    ...col,
    title: t(`tasks.columns.${col.id}`),
  }));

  const priorities: TaskPriority[] = ["low", "medium", "high", "urgent"];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium" as TaskPriority,
    due_date: "",
    tags: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (e: DragStartEvent) => setActiveId(e.active.id as string);
  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    let newStatus: TaskStatus = "todo";
    if (COLUMN_CONFIG.some((c) => c.id === overId)) {
      newStatus = overId as TaskStatus;
    } else {
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask) newStatus = overTask.status;
    }

    const columnTasks = tasks.filter((t) => t.status === newStatus && t.id !== taskId);
    moveTask(taskId, newStatus, columnTasks.length);
  };

  const submitForm = () => {
    if (!form.title.trim()) return;
    const data = {
      title: form.title,
      description: form.description || undefined,
      priority: form.priority,
      due_date: form.due_date || undefined,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    if (editing) {
      updateTask(editing.id, data);
      setEditing(null);
    } else {
      addTask(data);
    }
    setForm({ title: "", description: "", priority: "medium", due_date: "", tags: "" });
    setShowForm(false);
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-fg">{t("tasks.title")}</h1>
          <p className="text-sm text-fg-subtle">
            {t("tasks.activeCompleted", {
              active: tasks.filter((tk) => !tk.completed).length,
              completed: tasks.filter((tk) => tk.completed).length,
            })}
          </p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditing(null); }}>
          <Plus className="h-4 w-4" /> {t("tasks.addTask")}
        </Button>
      </div>

      <AnimatePresence>
        {(showForm || editing) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-fg">
                {editing ? t("tasks.editTask") : t("tasks.newTask")}
              </h3>
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="text-fg-subtle hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder={t("tasks.titlePlaceholder")}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Input
                placeholder={t("tasks.descriptionPlaceholder")}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as TaskPriority })
                }
                className="rounded-xl border border-default bg-surface px-4 py-2.5 text-sm text-fg"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {t(`tasks.priority.${p}`)}
                  </option>
                ))}
              </select>
              <Input
                type="date"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              />
              <Input
                placeholder={t("tasks.tagsPlaceholder")}
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="sm:col-span-2"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => { setShowForm(false); setEditing(null); }}>
                {t("common.cancel")}
              </Button>
              <Button onClick={submitForm}>
                {editing ? t("common.save") : t("common.create")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <DroppableColumn
                key={col.id}
                id={col.id}
                className={cn("rounded-2xl border bg-white/[0.02] p-4", col.color)}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-fg/70">{col.title}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-fg-muted">
                    {colTasks.length}
                  </span>
                </div>
                <SortableContext
                  items={colTasks.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="min-h-[100px] space-y-3">
                    {colTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={(t) => {
                          setEditing(t);
                          setForm({
                            title: t.title,
                            description: t.description ?? "",
                            priority: t.priority,
                            due_date: t.due_date?.split("T")[0] ?? "",
                            tags: t.tags.join(", "),
                          });
                          setShowForm(true);
                        }}
                        onDelete={deleteTask}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DroppableColumn>
            );
          })}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="rounded-xl border border-violet-500/30 bg-[#0c0c12] p-4 shadow-2xl">
              <p className="text-sm font-medium text-fg">{activeTask.title}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
