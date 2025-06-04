import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailVerification } from "@/hooks/signup/useEmailVerification";
import { useTimer } from "@/hooks/signup/useTimer";

interface EmailVerificationProps {
  email: string;
  onVerificationComplete: () => void;
}

export const EmailVerification = ({
  email,
  onVerificationComplete,
}: EmailVerificationProps) => {
  const {
    verificationCode,
    isEmailVerified,
    showVerification,
    isRequestingVerification,
    isVerifyingCode,
    setVerificationCode,
    handleRequestVerification,
    handleVerifyCode,
  } = useEmailVerification();

  const timer = useTimer(5 * 60); // 5분

  const handleRequestClick = async () => {
    const success = await handleRequestVerification(email);
    if (success) {
      timer.startTimer();
    }
  };

  const handleVerifyClick = async () => {
    const success = await handleVerifyCode();
    if (success) {
      timer.stopTimer();
      onVerificationComplete();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          type="email"
          value={email}
          placeholder="example@email.com"
          className="flex-1"
          readOnly
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleRequestClick}
          disabled={isEmailVerified || isRequestingVerification}
          className="whitespace-nowrap"
        >
          {isRequestingVerification
            ? "발송중..."
            : isEmailVerified
            ? "인증완료"
            : "Verify"}
        </Button>
      </div>

      {/* 인증 코드 입력 영역 */}
      {showVerification && !isEmailVerified && (
        <div className="mt-2">
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호 6자리"
              className="flex-1"
              maxLength={6}
            />
            <Button
              type="button"
              onClick={handleVerifyClick}
              disabled={isVerifyingCode || timer.isExpired}
              className="whitespace-nowrap"
            >
              {isVerifyingCode ? "확인중..." : "확인하기"}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              이메일로 전송된 인증번호를 입력해주세요
            </p>
            <span
              className={`text-xs font-medium ${
                timer.timeRemaining < 60 ? "text-red-500" : "text-orange-500"
              }`}
            >
              {timer.formatTime()}
            </span>
          </div>
          {timer.isExpired && (
            <p className="text-xs text-red-500 mt-1">
              인증 시간이 만료되었습니다. 다시 요청해주세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
