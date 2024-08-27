import { Button } from '@nextui-org/react';

type UnknownErrorProps = {
  onClick: () => void;
  useAt: 'login' | 'signUp' | 'upload';
};

const UnknownError = ({ onClick, useAt }: UnknownErrorProps) => {
  const getButtonText = () => {
    switch (useAt) {
      case 'login':
        return '로그인 페이지로 이동';
      case 'signUp':
        return '회원가입 페이지로 이동';
      case 'upload':
        return '업로드 페이지로 이동';
    }
  };

  return (
    <div className="w-2/5 mx-auto flex flex-col bg-yellow-100 p-4 mt-32 rounded-lg">
      <h1 className="mx-auto font-bold text-red-600 text-xl">오류</h1>
      <p className="mx-auto my-5 text-center">
        알 수 없는 오류가 발생했습니다.
        <br /> 다시 시도해 주세요.
      </p>
      <Button
        type="button"
        color="danger"
        onClick={onClick}
        className="font-semibold w-3/5 mx-auto"
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default UnknownError;
