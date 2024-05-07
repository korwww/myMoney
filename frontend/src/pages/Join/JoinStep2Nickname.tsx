import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import JoinTemplate from '@/components/Join/JoinTemplate';
import AlertText from '@/components/common/AlertText';
import Layout from '@/layout/Layout';
import { IUserRegistration } from '@/models/user.model';
import { VALIDATE } from '@/constance/validate';
import Input from '@/components/common/Input';

const JoinStep2Nickname = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<IUserRegistration, 'nickname'>>({ mode: 'onChange' });

  const nicknameValidation = {
    required: '닉네임을 입력하세요',
    validate: (nickname: string) => {
      const containsBannedWord = VALIDATE.BANNED_WORDS.some((word) =>
        nickname.includes(word),
      );
      return containsBannedWord
        ? '부적절한 단어가 포함되어있습니다'
        : undefined;
    },
  };

  const onSubmit = handleSubmit(() => {
    // if (errors.nickname) return;
    // 다음 단계로 이동, zustand에 유저 정보 저장
    navigate('/join/step3');
  });

  return (
    <Layout title="회원가입" showBackButton>
      <JoinTemplate
        current={2}
        title="닉네임을\n입력해주세요."
        onSubmit={onSubmit}
        isValid={isValid}
      >
        <fieldset>
          <Input
            $inputType="text"
            {...register('nickname', nicknameValidation)}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          {errors.nickname && (
            <AlertText size="small">{errors.nickname.message}</AlertText>
          )}
        </fieldset>
      </JoinTemplate>
    </Layout>
  );
};

export default JoinStep2Nickname;
