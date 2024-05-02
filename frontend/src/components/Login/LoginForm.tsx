import { FieldErrors, UseFormRegister } from 'react-hook-form';

import AlertText from '@/components/common/AlertText';
import Checkbox from './Checkbox';
import {
  FindPassword,
  FormStyle,
  IDCheckbox,
  InputGroup,
  OptionStyle,
} from './LoginForm.style';
import { IUser } from '@/models/user.model';

interface LoginFormProps {
  onSubmit: () => void;
  register: UseFormRegister<IUser>;
  errors: FieldErrors<IUser>;
}

function LoginForm({ onSubmit, register, errors }: LoginFormProps) {
  return (
    <FormStyle onSubmit={onSubmit}>
      <InputGroup>
        <input type="email" placeholder="이메일을 입력해주세요" />
        <input type="password" placeholder="비밀번호를 입력해주세요" />
      </InputGroup>

      <OptionStyle>
        <IDCheckbox>
          <Checkbox />
          <p>아이디저장</p>
        </IDCheckbox>
        <FindPassword to="/password-reset">
          <p>비밀번호 찾기</p>
        </FindPassword>
      </OptionStyle>

      <button type="submit">로그인</button>
      <AlertText size="small">오류메세지</AlertText>
    </FormStyle>
  );
}
export default LoginForm;
