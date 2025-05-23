import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 h-[60px]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="w-[100px] ">
          <img
            src="../../public/Logo/MainLogo.webp"
            alt="Main Logo"
            className="ob
          "
          />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button asChild>
                <Link to="/login">
                  <span className="text-white">Login</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link to="/signup">Signup</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
