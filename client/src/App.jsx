import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import PlaylistDetails from "./pages/PlaylistDetails";
import PlaylistPlayer from "./pages/PlaylistPlayer";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/common/ProtectedRoute";

const PROTECTED_ROUTES = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/playlist/:id",
    element: <PlaylistDetails />,
  },
  {
    path: "/playlist/:playlistId/video/:videoId",
    element: <PlaylistPlayer />,
  },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {PROTECTED_ROUTES.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
