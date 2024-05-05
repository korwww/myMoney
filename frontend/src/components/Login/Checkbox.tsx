import styled from 'styled-components';

import { Checked } from '@/assets/icons/Checked';

function Checkbox() {
  return (
    <>
      <CheckboxLabel htmlFor="loginCheckbox">
        <Icon>
          <Checked />
        </Icon>
      </CheckboxLabel>
      <CheckboxInput id="loginCheckbox" type="checkbox" />
    </>
  );
}
const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 10px;
    height: 10px;
  }
`;

export default Checkbox;
