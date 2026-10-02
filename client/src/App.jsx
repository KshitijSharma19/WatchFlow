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
import SheetsPage from "./pages/Sheets";
import SheetDetailPage from "./pages/SheetDetail";
import RoadmapPage from "./pages/Roadmap";
import NotesHub from "./pages/NotesHub";

import ProtectedRoute from "./components/common/ProtectedRoute";

const PROTECTED_ROUTES = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/notes",
    element: <NotesHub />,
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
        <Route path="/auth/callback" element={<AuthPage />} />
        <Route path="/sheets" element={<SheetsPage />} />
        <Route path="/sheets/:sheetId" element={<SheetDetailPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />

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
