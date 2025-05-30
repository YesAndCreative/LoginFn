import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/LoginModal";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 h-[60px]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="w-[100px] ">
          <img
            src="../../public/Logo/MainLogo.webp"
            alt="Main Logo"
            className="object-contain w-full h-auto"
          />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <LoginModal />
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
