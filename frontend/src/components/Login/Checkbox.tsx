import styled from 'styled-components';

import { Checked } from '@/assets/icons/Checked';
import Icon from '../common/Icon';

interface CheckboxProps {
  checkedRememberEmail: boolean;
  toggleCheckedRememberEmail: () => void;
}

function Checkbox({
  checkedRememberEmail,
  toggleCheckedRememberEmail,
}: CheckboxProps) {
  return (
    <>
      <CheckboxLabel htmlFor="loginCheckbox">
        {checkedRememberEmail && (
          <Icon fill="#59b05f" width={12} icon={<Checked />} />
        )}
        <CheckboxInput
          onChange={toggleCheckedRememberEmail}
          type="checkbox"
          id="loginCheckbox"
        />
      </CheckboxLabel>
    </>
  );
}
const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
`;

const CheckboxLabel = styled.label`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  position: relative;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Checkbox;
