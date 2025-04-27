import { useState } from "react";
import useSWRMutation from "swr/mutation";
import axios from "axios";

const postSignup = async (url: string, { arg }: { arg: SignupData }) => {
  const response = await axios.post(url, arg);
  return response.data;
};

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const Signup = () => {
  const { trigger } = useSWRMutation("", postSignup);

  const [data, setData] = useState<SignupData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await trigger(data);
    console.log("등록 성공", res);
    console.log("res : ", res);
  };

  console.log("data : ", data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          회원가입(Sign Up)
        </h1>

        <form className="space-y-4" onSubmit={submitData}>
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름 (Name)
            </label>
            <input
              type="text"
              value={data.name}
              onChange={handleChange}
              name="name"
              placeholder="홍길동"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일 (Email)
            </label>
            <input
              type="email"
              value={data.email}
              onChange={handleChange}
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호 (Phone Number)
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={handleChange}
              name="phone"
              placeholder="010-1234-5678"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 (Password)
            </label>
            <input
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
