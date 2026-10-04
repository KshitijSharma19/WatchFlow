import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Automatically scrolls window to top on every route change
 * Prevents pages (like DSA sheets) from opening at the previous scroll offset.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
