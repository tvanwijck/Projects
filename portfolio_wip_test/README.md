# Portfolio Website - Module 8

A modern, responsive portfolio website built with React, Node.js, and PostgreSQL. This project demonstrates full-stack development skills with a focus on clean, maintainable code and excellent user experience.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **React Router**: Client-side routing for seamless navigation
- **API Integration**: Full integration with Node.js backend
- **Blog System**: Dynamic blog posts with CRUD operations
- **Admin Dashboard**: User and blog management interface
- **Contact Form**: Interactive contact form with validation
- **Modern UI/UX**: Clean, professional design with smooth animations

## 📁 Project Structure

```
Portfolio/
├── client/                 # React frontend
│   ├── public/
│   │   ├── Assets/        # Images and static assets
│   │   └── index.html
│   ├── src/
│   │   ├── api/           # API service functions
│   │   │   └── blogs.js
│   │   ├── components/    # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Layout.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── SingleBlog.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.js         # Main App component with routing
│   │   ├── setupProxy.js  # API proxy configuration
│   │   └── index.js       # React entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── db/                # Database connection and queries
│   ├── routes/            # API route handlers
│   ├── scripts/           # Database initialization scripts
│   ├── index.js           # Express server
│   └── package.json
└── README.md
```

## 🛠️ Technologies Used

### Frontend

- **React 19.1.0**: Modern React with hooks and functional components
- **React Router DOM 7.6.2**: Client-side routing
- **Axios 1.10.0**: HTTP client for API requests
- **CSS3**: Custom styling with Grid, Flexbox, and animations
- **Google Fonts**: Oswald and Nunito for typography

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **PostgreSQL**: Relational database
- **pg**: PostgreSQL client for Node.js
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

### Development Tools

- **Concurrently**: Run frontend and backend simultaneously
- **http-proxy-middleware**: API proxy for development
- **Nodemon**: Auto-restart server during development

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Set up the database**

   ```bash
   # Create a .env file based on example.env
   cp example.env .env

   # Initialize the database
   npm run db:init

   # Seed the database with sample data
   npm run db:seed
   ```

4. **Install frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

5. **Start the development servers**
   ```bash
   # From the client directory
   npm run dev
   ```

This will start both the backend server (port 3000) and frontend development server (port 3001) concurrently.

## 📱 Available Scripts

### Backend (server/)

- `npm start`: Start the development server with nodemon
- `npm run db:init`: Initialize the database
- `npm run db:seed`: Seed the database with sample data
- `npm run build:frontend`: Build the React app for production
- `npm run prod`: Start the production server

### Frontend (client/)

- `npm start`: Start the development server
- `npm run build`: Build the app for production
- `npm test`: Run tests
- `npm run dev`: Start both frontend and backend concurrently

## 🎨 Component Architecture

### Layout Components

- **Layout.jsx**: Main wrapper component that includes Header, Footer, and main content
- **Header.jsx**: Contains logo and navigation
- **Navigation.jsx**: Navigation menu with active state management
- **Footer.jsx**: Contact information and links

### Page Components

- **Home.jsx**: Hero section and about overview
- **About.jsx**: Detailed information about skills and experience
- **Projects.jsx**: Portfolio of projects with technologies used
- **Blogs.jsx**: List of all blog posts with API integration
- **SingleBlog.jsx**: Individual blog post view with dynamic routing
- **Contact.jsx**: Contact form and contact information
- **AdminDashboard.jsx**: Admin interface for user and blog management
- **NotFound.jsx**: 404 error page

### API Integration

- **blogs.js**: Centralized API functions for blog operations
  - `getAllBlogs()`: Fetch all blog posts
  - `getBlogById(id)`: Fetch single blog post
  - `createBlog(blogData)`: Create new blog post
  - `updateBlog(id, blogData)`: Update existing blog post
  - `deleteBlog(id)`: Delete blog post

## 🔧 API Endpoints

### Blogs

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🎯 Key Features Implementation

### Routing

- React Router v6 with nested routes
- Dynamic routing for blog posts (`/blogs/:id`)
- 404 handling for unknown routes
- Active navigation state management

### State Management

- React hooks (useState, useEffect) for local state
- API integration with loading and error states
- Form state management with controlled components

### Responsive Design

- Mobile-first CSS approach
- CSS Grid and Flexbox for layouts
- Media queries for different screen sizes
- Touch-friendly navigation

### API Integration

- Axios for HTTP requests
- Proxy configuration for development
- Error handling and loading states
- Centralized API service functions

## 🚀 Production Deployment

### Build for Production

```bash
# Build the React app
cd client
npm run build

# The backend will serve the built files in production
cd ../server
npm run prod
```

### Environment Configuration

- Set `NODE_ENV=production` for production mode
- Configure database connection string
- Set up proper CORS settings for production domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Metana Full Stack Development Bootcamp - Module 8 Assignment.

## 👨‍💻 Author

**Tom van Wijck**

- Email: tvanwijck@gmail.com
- Phone: +31 616 050 466
- Location: Sagres, Portugal

---

_This portfolio showcases modern web development practices with React, Node.js, and PostgreSQL. The code is structured for maintainability, scalability, and follows industry best practices._
