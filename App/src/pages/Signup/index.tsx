import { useState, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import axios from "axios";

// axios 쿠키 설정 강제화
axios.defaults.withCredentials = true;

// axios 전용 인스턴스 생성
const api = axios.create({
  baseURL: "http://172.30.1.9:5133",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// axios 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    console.log("요청 전송 중:", config.url);
    console.log("현재 쿠키:", document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const postSignup = async (url: string, { arg }: { arg: SignupData }) => {
  const response = await api.post(url, arg);
  return response.data;
};

const requestEmailVerification = async (
  url: string,
  { arg }: { arg: { email: string } }
) => {
  try {
    console.log("이메일 인증 요청 시작...");
    const response = await api.post(url, arg);
    console.log("이메일 인증 응답:", response);

    // 응답에서 쿠키 확인
    console.log("응답 후 쿠키:", document.cookie);

    return response.data;
  } catch (error) {
    console.error("이메일 인증 요청 오류:", error);
    throw error;
  }
};

const verifyEmailCode = async (url: string, { arg }: { arg: string }) => {
  try {
    console.log("인증 코드 검증 요청 시작...");
    console.log("검증 요청 전 쿠키:", document.cookie);

    // 검증 요청 시 수동으로 쿠키 확인 및 헤더 설정
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find((row) => row.startsWith(".AspNetCore.Session="));
    const setCookie = cookies.find((row) => row.startsWith("set-cookie="));

    console.log("세션 쿠키 찾음:", sessionCookie);
    console.log("set-cookie 찾음:", setCookie);

    // 요청 헤더 설정
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    // set-cookie 값이 있으면 헤더에 추가
    if (setCookie) {
      const cookieValue = setCookie.split("=")[1];
      headers["Cookie"] = `set-cookie=${cookieValue}`;
    }

    const response = await api.post(
      url,
      { code: arg },
      {
        withCredentials: true,
        headers: headers
      }
    );

    console.log("검증 응답:", response);
    return response.data;
  } catch (error) {
    console.error("인증 코드 검증 오류:", error);
    throw error;
  }
};

interface SignupData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birth: string;
}

const Signup = () => {
  const { trigger: triggerSignup } = useSWRMutation(
    "/api/user/register",
    postSignup
  );

  const { trigger: triggerEmailVerification } = useSWRMutation(
    "/api/user/register/checkEmail",
    requestEmailVerification
  );

  const { trigger: triggerVerifyCode } = useSWRMutation(
    "/api/user/register/verifyEmail",
    verifyEmailCode
  );

  const [data, setData] = useState<SignupData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    birth: "",
  });
  // const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Countdown timer state
  const [timeRemaining, setTimeRemaining] = useState(5 * 60); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // 컴포넌트 마운트 시 쿠키 확인
  useEffect(() => {
    console.log("컴포넌트 마운트 시 쿠키:", document.cookie);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: number;

    if (timerActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining <= 0) {
      setTimerActive(false);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [timerActive, timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleRequestVerification = async () => {
    if (!data.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      console.log("인증 요청 전 쿠키:", document.cookie);

      // Call email verification API
      await triggerEmailVerification({ email: data.email });

      console.log("인증 요청 후 쿠키:", document.cookie);

      // Show verification code input and start timer
      // setShowVerification(true);
      setTimeRemaining(5 * 60); // Reset to 5 minutes
      setTimerActive(true);
      alert("인증 메일이 발송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      console.error("인증 메일 발송 실패:", error);
      alert("인증 메일 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      // Check if cookie exists
      console.log("검증 요청 직전 쿠키 확인:", document.cookie);

      // Call verification code API with only the code
      await triggerVerifyCode(verificationCode);

      // If successful
      setIsEmailVerified(true);
      setTimerActive(false);
      alert("이메일 인증이 완료되었습니다.");
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
      alert("인증번호가 일치하지 않거나 만료되었습니다.");
    }
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!isEmailVerified) {
    //   alert("이메일 인증이 필요합니다.");
    //   return;
    // }

    try {
      const res = await triggerSignup(data);
      console.log("등록 성공", res);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
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
            <div className="flex space-x-2">
              <input
                type="email"
                value={data.email}
                onChange={handleChange}
                name="email"
                placeholder="you@example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={handleRequestVerification}
                disabled={isEmailVerified}
                className={`px-4 py-2 text-white rounded-md transition ${
                  isEmailVerified
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isEmailVerified ? "인증완료" : "인증하기"}
              </button>
            </div>

            {/* 인증 코드 입력 영역 - 인증하기 버튼 클릭 시 표시 */}
            {
              <div className="mt-2">
                <div className="flex space-x-2 items-center">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    placeholder="인증번호 6자리"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    확인하기
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    이메일로 전송된 인증번호를 입력해주세요
                  </p>
                  <span
                    className={`text-xs font-medium ${
                      timeRemaining < 60 ? "text-red-500" : "text-orange-500"
                    }`}
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
            }
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호 (Phone Number)
            </label>
            <input
              type="tel"
              value={data.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
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

          {/* 생년월일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              생년월일 (Birthdate)
            </label>
            <input
              type="date"
              value={data.birth}
              onChange={handleChange}
              name="birth"
              placeholder="YYYY-MM-DD"
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
