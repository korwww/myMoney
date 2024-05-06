import { useLocation } from 'react-router-dom';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import AlertText from '@/components/common/AlertText';
import Checkbox from './Checkbox';
import Button from '../common/Button';
import InputPassword from '../common/InputPassword';
import { IUserLogin } from '@/models/user.model';
import {
  FindPassword,
  FormStyle,
  IDCheckbox,
  InputGroup,
  OptionStyle,
} from './LoginForm.style';

interface LoginFormProps {
  onSubmit: () => void;
  register: UseFormRegister<IUserLogin>;
  errors: FieldErrors<IUserLogin>;
  checkedRememberEmail: boolean;
  toggleCheckedRememberEmail: () => void;
}

function LoginForm({
  checkedRememberEmail,
  toggleCheckedRememberEmail,
  onSubmit,
  register,
  errors,
}: LoginFormProps) {
  const { pathname } = useLocation();
  const $isUserLoginPage = pathname === '/login';

  return (
    <FormStyle onSubmit={onSubmit}>
      <InputGroup $isUserLoginPage={$isUserLoginPage}>
        <fieldset>
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </fieldset>
        <fieldset>
          <InputPassword
            {...register('password', { required: true })}
            placeholder="비밀번호를 입력해주세요"
          />
        </fieldset>
      </InputGroup>

      {$isUserLoginPage && (
        <OptionStyle>
          <IDCheckbox>
            <Checkbox
              checkedRememberEmail={checkedRememberEmail}
              toggleCheckedRememberEmail={toggleCheckedRememberEmail}
            />
            <p onClick={toggleCheckedRememberEmail}> 아이디저장</p>
          </IDCheckbox>
          <FindPassword to="/password-reset">
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
