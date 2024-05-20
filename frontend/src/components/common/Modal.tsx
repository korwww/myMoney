import styled from 'styled-components';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

interface Props {
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (selectedOption: string) => void;
  onCancel?: () => void;
  title?: string;
  imageSrc?: string;
  summary?: string;
  report?: boolean;
}

function Modal({
  buttonText,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  imageSrc,
  summary,
  report,
}: Props) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggleOption = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const handleClose = () => {
    setIsFadingOut(true);
  };

  const handleConfirm = () => {
    onConfirm?.(selectedOption ? selectedOption : '신고 사유가 없음');
    setIsFadingOut(true);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsFadingOut(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      setIsFadingOut(false);
      setSelectedOption(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalStyle
      className={isFadingOut ? 'fade-out' : 'fade-in'}
      onClick={handleOverlayClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="modal-body" ref={modalRef}>
        <div className="modal-contents">
          {title && <div className="title">{title}</div>}
          {imageSrc && (
            <div className="image">
              <img src={imageSrc} alt={'사진'} />
            </div>
          )}
          {summary && <div className="summary">{summary}</div>}
          {report && (
            <div className="reportButtons">
              <ToggleButton
                label="욕설"
                isActive={selectedOption === '욕설'}
                onClick={() => handleToggleOption('욕설')}
              />
              <ToggleButton
                label="광고"
                isActive={selectedOption === '광고'}
                onClick={() => handleToggleOption('광고')}
              />
              <ToggleButton
                label="법률위반"
                isActive={selectedOption === '법률위반'}
                onClick={() => handleToggleOption('법률위반')}
              />
            </div>
          )}
          <div className="buttons">
            <Button size={'small'} scheme={'border'} onClick={handleCancel}>
              취소
            </Button>
            <Button size={'small'} scheme={'primary'} onClick={handleConfirm}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </ModalStyle>,
    document.body,
  );
}

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
function ToggleButton({ label, isActive, onClick }: ToggleButtonProps) {
  return (
    <Button
      size="small"
      scheme={isActive ? 'primary' : 'border'}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

const ModalStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    @media (min-width: 1000px) {
      width: 800px;
      height: auto;
    }

    background-color: #fff;
    max-width: 90%;
    max-height: 90%;
  }

  .modal-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;

    .title {
      margin-bottom: 16px;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      white-space: pre-wrap;
    }

    .summary {
      color: #4b3a5a;
      text-align: center;
      white-space: pre-wrap;
    }

    .image {
      margin-bottom: 16px;
      width: 268px;
      max-height: 300px;
      text-align: center;
      overflow: scroll;

      -ms-overflow-style: none;
      scrollbar-width: none;
      ::-webkit-scrollbar {
        display: none;
      }

      @media (min-width: 1000px) {
        width: 600px;
        height: 100%;
        max-height: 550px;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    .buttons {
      margin-top: 16px;
      display: flex;
      gap: 16px;
    }

    .reportButtons {
      display: flex;
    }
  }
`;

export default Modal;
