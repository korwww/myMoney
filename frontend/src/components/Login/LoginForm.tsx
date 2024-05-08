import { useLocation } from 'react-router-dom';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import AlertText from '@/components/common/AlertText';
import Checkbox from './Checkbox';
import Button from '../common/Button';
import { IUserLogin } from '@/models/user.model';
import {
  FindPassword,
  FormStyle,
  IDCheckbox,
  InputGroup,
  OptionStyle,
} from './LoginForm.style';
import Input from '../common/Input';

interface ILoginFormProps {
  onSubmit: () => void;
  register: UseFormRegister<IUserLogin>;
  errors: FieldErrors<IUserLogin>;
  checkedRememberEmail?: boolean;
  toggleCheckedRememberEmail?: () => void;
}

function LoginForm({
  checkedRememberEmail = false,
  toggleCheckedRememberEmail,
  onSubmit,
  register,
  errors,
}: ILoginFormProps) {
  const { pathname } = useLocation();
  const $isUserLoginPage = pathname === '/login';

  return (
    <FormStyle onSubmit={onSubmit}>
      <InputGroup $isUserLoginPage={$isUserLoginPage}>
        <fieldset>
          <Input
            $inputType="text"
            {...register('email', { required: true })}
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </fieldset>
        <fieldset>
          <Input
            $inputType="password"
            {...register('password', { required: true })}
            placeholder="비밀번호를 입력해주세요"
          />
        </fieldset>
      </InputGroup>

      {$isUserLoginPage && toggleCheckedRememberEmail && (
        <OptionStyle>
          <IDCheckbox>
            <Checkbox
              checkedRememberEmail={checkedRememberEmail}
              toggleCheckedRememberEmail={toggleCheckedRememberEmail}
            />
            <p onClick={toggleCheckedRememberEmail}> 아이디저장</p>
          </IDCheckbox>
          <FindPassword
            onClick={() =>
              alert(
                '준비 중인 서비스입니다. 비밀번호를 잊으셨다면 관리자에게 문의해주세요.',
              )
            }
          >
            <p>비밀번호 찾기</p>
          </FindPassword>
        </OptionStyle>
      )}

      <Button $fullWidth type="submit" scheme="primary" size="large">
        로그인
      </Button>
      <AlertText size="small">오류메세지</AlertText>
    </FormStyle>
  );
}
export default LoginForm;
