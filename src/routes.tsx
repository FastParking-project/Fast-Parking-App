import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Welcome from '@/src/pages/Welcome';
import SessionSaver from '@/src/pages/SessionSaver';
import AccessibilityPrompt from '@/src/pages/AccessibilityPrompt';
import ParkingMap from '@/src/pages/ParkingMap';
import SpaceConfirmation from '@/src/pages/SpaceConfirmation';
import Navigation from '@/src/pages/Navigation';
import Dashboard from '@/src/pages/Dashboard';
import Payment from '@/src/pages/Payment';
import PaymentSuccess from '@/src/pages/PaymentSuccess';
import VehicleNavigation from '@/src/pages/VehicleNavigation';
import ExitNavigation from '@/src/pages/ExitNavigation';
import SessionSummary from '@/src/pages/SessionSummary';
import ErrorPage from '@/src/pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  { path: "/save-session", element: <SessionSaver /> },
  { path: "/accessibility", element: <AccessibilityPrompt /> },
  { path: "/map", element: <ParkingMap /> },
  { path: "/confirm-space", element: <SpaceConfirmation /> },
  { path: "/navigate", element: <Navigation /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/payment", element: <Payment /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/find-vehicle", element: <VehicleNavigation /> },
  { path: "/exit", element: <ExitNavigation /> },
  { path: "/summary", element: <SessionSummary /> },
  { path: "*", element: <ErrorPage /> },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;