import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path : '/',
//     element : <App />,
//   }
// ]);

createRoot(document.getElementById('root')!).render(

  <App />
  // <RouterProvider router={router}>
  // </RouterProvider>
)
