# Day Task

A simple daily task management application built with React. The application strikes a good balance between simplicity and functionality, making it suitable for users who want a straightforward task management solution without the complexity of larger project management tools.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- **Task Categories/Tags**: Organize tasks by category (Personal, Work, Shopping, Health, Education, Finance, Home, Travel)
- **Priority Levels**: Set task priorities (High, Medium, Low) with visual indicators
- **Sidebar Navigation**: Intuitive left sidebar menu with all filtering options
- **Advanced Filtering**: Filter tasks by completion status, priority, and category
- **Sort Options**: Sort tasks by priority (High → Medium → Low)
- **Notes Support**: Add detailed notes to tasks
- **Real-time synchronization** with Supabase database (optional - see setup below)
- **Optimistic updates** for instant UI feedback
- **Offline mode** - works without database (tasks stored in memory)
- **Online mode** - persistent storage with automatic sync when Supabase is configured
- Responsive design for mobile and desktop with collapsible sidebar menu
