import { supabase, TASKS_TABLE } from "../lib/supabase.js";

// service for all database operations
export class TaskService {
  // get all tasks
  static async getTasks() {
    try {
      const { data, error } = await supabase
        .from(TASKS_TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return { data: [], error };
    }
  }

  // add a new task
  static async addTask(taskData) {
    try {
      const { data, error } = await supabase
        .from(TASKS_TABLE)
        .insert([taskData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Error adding task:", error);
      return { data: null, error };
    }
  }

  // update a task
  static async updateTask(id, updates) {
    try {
      const { data, error } = await supabase
        .from(TASKS_TABLE)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Error updating task:", error);
      return { data: null, error };
    }
  }

  // delete a task
  static async deleteTask(id) {
    try {
      const { error } = await supabase.from(TASKS_TABLE).delete().eq("id", id);

      if (error) throw error;
      return { data: true, error: null };
    } catch (error) {
      console.error("Error deleting task:", error);
      return { data: null, error };
    }
  }

  // toggle task completion
  static async toggleTask(id, completed) {
    return this.updateTask(id, { completed });
  }

  // subscribe to real-time changes
  static subscribeToTasks(callback) {
    return supabase
      .channel("tasks_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TASKS_TABLE,
        },
        callback
      )
      .subscribe();
  }

  // unsubscribe from real-time changes
  static unsubscribe(subscription) {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  }
}
