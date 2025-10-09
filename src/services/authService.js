import { supabase } from "../lib/supabase.js";

export class AuthService {
  /**
   * Sign up a new user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: Object|null, error: Error|null}>}
   */
  static async signUp(email, password) {
    if (!supabase) {
      return {
        user: null,
        error: new Error("Authentication not available in offline mode"),
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // redirect to app root after email confirmation
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      return { user: data.user, session: data.session, error: null };
    } catch (error) {
      console.error("Sign up error:", error);
      return { user: null, session: null, error };
    }
  }

  /**
   * sign in an existing user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: Object|null, error: Error|null}>}
   */
  static async signIn(email, password) {
    if (!supabase) {
      return {
        user: null,
        error: new Error("Authentication not available in offline mode"),
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user, session: data.session, error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      return { user: null, session: null, error };
    }
  }

  /**
   * sign out the current user
   * @returns {Promise<{error: Error|null}>}
   */
  static async signOut() {
    if (!supabase) {
      return {
        error: new Error("Authentication not available in offline mode"),
      };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error("Sign out error:", error);
      return { error };
    }
  }

  /**
   * get the current session
   * @returns {Promise<{session: Object|null, error: Error|null}>}
   */
  static async getSession() {
    if (!supabase) {
      return { session: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      return { session: data.session, error: null };
    } catch (error) {
      console.error("Get session error:", error);
      return { session: null, error };
    }
  }

  /**
   * get the current user
   * @returns {Promise<{user: Object|null, error: Error|null}>}
   */
  static async getCurrentUser() {
    if (!supabase) {
      return { user: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      return { user: data.user, error: null };
    } catch (error) {
      console.error("Get current user error:", error);
      return { user: null, error };
    }
  }

  /**
   * subscribe to authentication state changes
   * @param {Function} callback -
   * @returns {Object}
   */
  static onAuthStateChange(callback) {
    if (!supabase) {
      return { data: { subscription: null } };
    }

    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }

  /**
   * send password reset email
   * @param {string} email
   * @returns {Promise<{error: Error|null}>}
   */
  static async resetPassword(email) {
    if (!supabase) {
      return {
        error: new Error("Authentication not available in offline mode"),
      };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("Reset password error:", error);
      return { error };
    }
  }

  /**
   * check if user is authenticated
   * @returns {Promise<boolean>}
   */
  static async isAuthenticated() {
    const { session } = await this.getSession();
    return !!session;
  }
}
