import styled from 'styled-components';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  title: string;
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  summary?: string;
  report?: boolean;
}

function Modal({ title, buttonText, isOpen, onClose, summary, report }: Props) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setIsFadingOut(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
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
          <div className="title">{title}</div>
          {summary && <div className="summary">{summary}</div>}
          {report && <div>신고 버튼 컴포넌트</div>}
          <div className="buttons">
            <button onClick={handleClose}>취소</button>
            <button>{buttonText}</button>
          </div>
        </div>
      </div>
    </ModalStyle>,
    document.body,
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
    transfrom: translate(-50%, -50%);
    width: 300px;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    background-color: #fff;
    max-width: 80%;
  }

  .modal-contents {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin: 16px auto;
    }

    .summary {
      color: #4b3a5a;
    }

    .buttons {
      margin: 16px auto 40px auto;
      display: flex;
      gap: 16px;
    }
  }
`;

export default Modal;
