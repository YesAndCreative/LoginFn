import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          로고
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                홈
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">
                로그인
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-gray-300">
                회원가입
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
