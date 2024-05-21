import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
  $positionLnR: 'left' | 'right';
  $positionValue?: number;
  $positionTopValue: number;
  $width?: number;
}

function Dropdown({
  children,
  toggleButton,
  isOpen = false,
  $positionLnR = 'right',
  $positionValue,
  $positionTopValue,
  $width,
}: Props) {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <DropdownStyle
      $open={open}
      ref={dropdownRef}
      $positionLnR={$positionLnR}
      $positionValue={$positionValue}
      $positionTopValue={$positionTopValue}
      $width={$width}
    >
      <button className="toggle" onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>
      {open && <div className="panel">{children}</div>}
    </DropdownStyle>
  );
}

interface DropdownStyleProps {
  $open: boolean;
  $positionLnR: 'left' | 'right';
  $positionValue?: number;
  $positionTopValue: number;
  $width?: number;
}

const DropdownStyle = styled.div<DropdownStyleProps>`
  position: relative;

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    svg {
      width: 24px;
      height: 24px;
      fill: ${({ theme, $open }) =>
        $open ? theme.color.primary : theme.color.text};
    }
  }

  .panel {
    position: absolute;
    ${({ $positionLnR, $positionValue }) =>
      $positionLnR === 'left'
        ? `left: ${$positionValue ? `${$positionValue}px` : '0px'}`
        : `right: ${$positionLnR ? `${$positionValue}px` : '0px'}`};
    top: ${({ $positionTopValue }) => `${$positionTopValue}px`};
    background: #fff;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 100;

    ul {
      li {
        width: ${({ $width }) => ($width ? `${$width}px` : '90px')};
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid ${({ theme }) => theme.color.border};
        padding: 6px 16px;
        font-size: ${({ theme }) => theme.text.medium.fontSize};
        color: ${({ theme }) => theme.color.darkGray};
        cursor: pointer;

        svg {
          width: 20px;
          height: 20px;
          margin-right: 3px;
          path {
            fill: ${({ theme }) => theme.color.darkGray};
          }
        }

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          color: ${({ theme }) => theme.color.secondary};
          svg {
            path {
              fill: ${({ theme }) => theme.color.secondary};
            }
          }
        }
      }
    }
  }
`;

export default Dropdown;
