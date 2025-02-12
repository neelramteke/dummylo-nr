
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-slate-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span 
              className="text-xl font-bold cursor-pointer" 
              onClick={() => navigate("/")}
            >
              <span className="dark:text-white text-black">Data</span>
              <span className="text-purple-600">nr.</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            {!isContactPage && (
              <Button
                variant="ghost"
                onClick={() => navigate("/contact")}
                className="hover:bg-transparent"
              >
                Contact Me
              </Button>
            )}
            {isContactPage && (
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="hover:bg-transparent"
              >
                Back to Main
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
