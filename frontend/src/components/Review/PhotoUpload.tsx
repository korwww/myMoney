import React, { useRef } from 'react';
import styled from 'styled-components';
import { Camera } from '@/assets/icons/Camera';
import { convertToBase64 } from '@/utils/base64';
import { X } from '@/assets/icons/X';
import Icon from '../common/Icon';

interface PhotoUploadProps {
  photoToAddList: string[];
  setPhotoToAddList: React.Dispatch<React.SetStateAction<string[]>>;
}

function PhotoUpload({ photoToAddList, setPhotoToAddList }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageArray: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await convertToBase64(file);
        imageArray.push(base64);
      }
      setPhotoToAddList((prevList) => [...prevList, ...imageArray]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoToAddList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const renderPhotoPreviews = () => {
    return photoToAddList.map((url: string, index: number) => (
      <PhotoPreview key={index}>
        <CloseButton onClick={() => handleRemovePhoto(index)}>
          <Icon width={12} fill="white" icon={<X />} />
        </CloseButton>
        <img src={url} alt={`Photo ${index}`} />
      </PhotoPreview>
    ));
  };

  return (
    <Container>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />
      <Button onClick={handleClick}>
        <Camera />
        <p>사진 첨부</p>
      </Button>

      {renderPhotoPreviews()}
    </Container>
  );
}

export default PhotoUpload;

const Container = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: white;
  margin-right: 10px;

  p {
    font-size: ${({ theme }) => theme.text.small.fontSize};
  }
`;

const PhotoPreview = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -5px;
  background-color: black;
  width: 18px;
  height: 18px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
