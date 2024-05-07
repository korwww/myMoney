import { EyeClosed } from '@/assets/icons/EyeClosed';
import { Eye } from '@/assets/icons/Eye';
import React, { ForwardedRef, useState } from 'react';
import styled from 'styled-components';

type TinputType = 'text' | 'email' | 'password' | 'number';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType: TinputType;
}

interface IinputText extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword: TinputType;
}

const Input = React.forwardRef(
  (
    { placeholder, inputType, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [inputTypeState, setInputTypeState] = useState<TinputType>(inputType);

    const handleTogglePasswordType = () => {
      if (inputTypeState === 'password') {
        setInputTypeState('text');
      } else {
        setInputTypeState('password');
      }
    };

    return (
      <InputStyle>
        <InputTextStyle
          placeholder={placeholder}
          ref={ref}
          type={inputTypeState}
          onChange={onChange}
          isPassword={inputType}
          {...props}
        />
        {inputType === 'password' && (
          <IconButton type="button" onClick={handleTogglePasswordType}>
            <Icon
              fill="#aba7af"
              width={20}
              icon={inputTypeState === 'password' ? <EyeClosed /> : <Eye />}
            />
          </IconButton>
        )}
      </InputStyle>
    );
  },
);

const InputStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputTextStyle = styled.input<IinputText>`
  padding: 0.25rem 0.75rem;
  padding-right: ${({ isPassword }) =>
    isPassword === 'password' ? '42px' : '0px'};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
  width: 100%;
`;

const IconButton = styled.button`
  position: absolute;
  right: 10px;
  top: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default Input;
