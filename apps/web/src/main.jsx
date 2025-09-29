import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import CmsHome from './features/blog/pages/CmsHome.jsx'
import BlogPost from './features/blog/pages/BlogPost.jsx'
import Foundry from './features/foundry/pages/Foundry.jsx'

console.log('main.jsx is loading');

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cms",
    element: <CmsHome />,
  },
  {
    path: "/foundry",
    element: <Foundry />,
  },
  {
    path: "/:slug",
    element: <BlogPost />,
  },
]);

console.log('Router created, mounting React app');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
