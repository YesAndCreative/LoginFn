import { useState, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import axios from "axios";

// Axios Instance
const api = axios.create({
  baseURL: "http://172.30.1.6:5133",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


// ================ API Request Handler START ================
const postSignup = async (url: string, { arg }: { arg: SignupData }) => {
  const response = await api.post(url, arg);
  return response.data;
};

const requestEmailVerification = async (
  url: string,
  { arg }: { arg: { email: string } }
) => {
  try {
    const response = await api.post(url, arg);
    return response.data;
  } catch (error) {
    console.error("이메일 인증 요청 오류:", error);
    throw error;
  }
};

const verifyEmailCode = async (url: string, { arg }: { arg: { code: string, authKey: string } }) => {
  try {
    const response = await api.post(url, arg);
    return response.data;
  } catch (error) {
    console.error("인증 코드 검증 오류:", error);
    throw error;
  }
};
// ================ API Request Handler END ================


interface SignupData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birth: string;
}

const Signup = () => {
  // ================ SWR Mutation START ================
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
  // ================ SWR Mutation END ================


  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authKey, setAuthKey] = useState(""); 
  const [showVerification, setShowVerification] = useState(false);
  const [data, setData] = useState<SignupData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    birth: "",
  });

  // Countdown timer state
  const [timeRemaining, setTimeRemaining] = useState(5 * 60); 
  const [timerActive, setTimerActive] = useState(false);

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
      const result = await triggerEmailVerification({ email: data.email });
      
      // authKey는 result.data 안에 있음
      if (result && result.data && result.data.authKey) {
        const key = result.data.authKey;
        setAuthKey(key);
      }

      // Show verification UI and start timer
      setShowVerification(true);
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
    
    if (!authKey) {
      alert("인증키가 없습니다. 이메일 인증을 다시 요청해주세요.");
      return;
    }

    try {
      const requestData = { code: verificationCode, authKey: authKey };
    
      await triggerVerifyCode(requestData);

      setIsEmailVerified(true);
      setTimerActive(false);
      alert("이메일 인증이 완료되었습니다.");
      
    } catch (error) {
      console.error("인증 코드 검증 실패:", error);
      alert("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
    }
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!isEmailVerified) {
    //   alert("이메일 인증이 필요합니다.");
    //   return;
    // }

    try {
    await triggerSignup(data);
      alert("회원가입이 완료되었습니다.");
    } catch {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  console.log("data : ", data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          회원가입
        </h1>

        <form className="space-y-4" onSubmit={submitData}>
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
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
              이메일
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
            {showVerification && (
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
            )}
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호
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
              비밀번호
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
              생년월일
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
