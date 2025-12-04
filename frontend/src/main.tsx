import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'; 
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import PropertyForm from './pages/PropertyForm';

const router = createBrowserRouter([
  { path: '/', element: <PropertyList /> },
  { path: '/property/:id', element: <PropertyDetail /> },
  { path: '/create', element: <PropertyForm /> },
  { path: '/edit/:id', element: <PropertyForm /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);