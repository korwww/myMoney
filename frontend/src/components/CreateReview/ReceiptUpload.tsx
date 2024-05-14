import React, { useRef } from 'react';
import styled from 'styled-components';
import { convertToBase64 } from '@/utils/base64';
import Button from '../common/Button';

interface PhotoUploadProps {
  receiptImg: string;
  setReceiptImg: React.Dispatch<React.SetStateAction<string>>;
}

function ReceiptUpload({ receiptImg, setReceiptImg }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const receipt = await convertToBase64(files[0]);
      setReceiptImg(receipt);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <ButtonContainer onClick={handleClick}>
        <Button size="medium" scheme={receiptImg === '' ? 'disabled' : 'primary'} $fullWidth={true}>
          영수증 리뷰 인증
        </Button>
      </ButtonContainer>
    </>
  );
}

export default ReceiptUpload;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 358px;
`;
