import { supabase, TASKS_TABLE } from "../lib/supabase.js";

// service for all database operations
export class TaskService {
  static _offlineWarningShown = false;

  // check if Supabase is available
  static isSupabaseAvailable() {
    if (!supabase) {
      if (!this._offlineWarningShown) {
        console.warn(
          "📱 Running in offline mode - tasks will not be saved to database"
        );
        this._offlineWarningShown = true;
      }
      return false;
    }
    return true;
  }

  // get all tasks for the current user
  static async getTasks(userId = null) {
    if (!this.isSupabaseAvailable()) {
      return { data: [], error: null };
    }

    try {
      let query = supabase.from(TASKS_TABLE).select("*");

      // Filter by user_id if authenticated
      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return { data: [], error };
    }
  }

  // add a new task
  static async addTask(taskData, userId = null) {
    if (!this.isSupabaseAvailable()) {
      return { data: null, error: new Error("Supabase not configured") };
    }

    try {
      // add user_id in task data if authenticated
      const taskWithUser = {
        ...taskData,
        ...(userId && { user_id: userId }),
      };

      const { data, error } = await supabase
        .from(TASKS_TABLE)
        .insert([taskWithUser])
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
    if (!this.isSupabaseAvailable()) {
      return { data: null, error: new Error("Supabase not configured") };
    }

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
    if (!this.isSupabaseAvailable()) {
      return { data: null, error: new Error("Supabase not configured") };
    }

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

  // migrate anonymous tasks to authenticated user
  static async migrateAnonymousTasks(taskIds, userId) {
    if (!this.isSupabaseAvailable() || !taskIds.length || !userId) {
      return { success: false, error: new Error("Invalid parameters") };
    }

    try {
      // Update all anonymous tasks to have the user's ID
      const { data, error } = await supabase
        .from(TASKS_TABLE)
        .update({ user_id: userId })
        .in("id", taskIds)
        .is("user_id", null)
        .select();

      if (error) throw error;

      console.log(
        `Migrated ${data?.length || 0} anonymous tasks to user ${userId}`
      );

      return { success: true, migratedCount: data?.length || 0, error: null };
    } catch (error) {
      console.error("Error migrating anonymous tasks:", error);
      return { success: false, migratedCount: 0, error };
    }
  }

  // subscribe to real-time changes
  static subscribeToTasks(callback, userId = null) {
    if (!this.isSupabaseAvailable()) {
      return null;
    }

    const channel = supabase.channel("tasks_changes");

    // user is authenticated, filter by user_id
    if (userId) {
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TASKS_TABLE,
          filter: `user_id=eq.${userId}`,
        },
        callback
      );
    } else {
      // anonymous users, listen to all changes
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TASKS_TABLE,
        },
        callback
      );
    }

    return channel.subscribe();
  }

  // unsubscribe from real-time changes
  static unsubscribe(subscription) {
    if (subscription && supabase) {
      supabase.removeChannel(subscription);
    }
  }
}
