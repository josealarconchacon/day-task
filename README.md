# Day Task

A simple daily task management application built with React. The application strikes a good balance between simplicity and functionality, making it suitable for users who want a straightforward task management solution without the complexity of larger project management tools.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- **Task Categories/Tags**: Organize tasks by category (Personal, Work, Shopping, Health, Education, Finance, Home, Travel)
- **Priority Levels**: Set task priorities (High, Medium, Low) with visual indicators
- **Advanced Filtering**: Filter tasks by completion status, priority, and category
- **Notes Support**: Add detailed notes to tasks
- **Real-time synchronization** with Supabase database
- **Optimistic updates** for instant UI feedback
- **Offline-capable** with automatic sync when connection restored
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v16 or higher)
- A Supabase account and project

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd day-task
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory with your Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**To get your Supabase credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy your Project URL and anon/public key

### 4. Set up the database
Run this SQL in your Supabase SQL Editor to create the tasks table:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  category TEXT CHECK (category IN ('personal', 'work', 'shopping', 'health', 'education', 'finance', 'home', 'travel')),
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for development (or set up proper policies for production)
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file is provided as a template
- For production, consider implementing proper Row Level Security policies
- Consider adding user authentication for multi-user support
