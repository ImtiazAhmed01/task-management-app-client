import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AuthProvider from './Provider/authProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Login from './Login/Login.jsx'
import Root from './Root.jsx'
import Register from './Register/Register.jsx'
import Addtask from './AddTask/Addtask.jsx'
import EditTask from './EditTask/EditTask.jsx'
import WelcomeMsg from './WelcomeMsg/WelcomeMsg.jsx'
import PrivateRoute from './PrivateRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "/",
        element: <WelcomeMsg />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        element: <PrivateRoute />, // Protect routes inside this block
        children: [
          {
            path: "/home",
            element: <Home />
          },
          {
            path: "/addtask",
            element: <Addtask />
          },
          {
            path: "/edittask",
            element: <EditTask />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
