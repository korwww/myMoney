import React from 'react';
import styled from 'styled-components';

import Button from '../common/Button';

interface JoinFormProps {
  children: React.ReactNode;
  isLastStep: boolean;
  onSubmit: () => void;
  isValid: boolean;
}

function JoinForm({ children, isLastStep, onSubmit, isValid }: JoinFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <InputWrapper>{children}</InputWrapper>

      <Button
        type="submit"
        scheme="primary"
        size="large"
        $fullWidth
        onSubmit={onSubmit}
        disabled={!isValid}
      >
        {isLastStep ? '회원가입' : '계속하기'}
      </Button>
    </Form>
  );
}
const Form = styled.form`
  margin-bottom: 35px;
`;

const InputWrapper = styled.div`
  margin-bottom: 55px;
  fieldset {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
export default JoinForm;
