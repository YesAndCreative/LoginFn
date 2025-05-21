import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 h-[60px]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          로고
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button asChild>
                <Link to="/">홈</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link to="/login">로그인</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link to="/signup">회원가입</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
