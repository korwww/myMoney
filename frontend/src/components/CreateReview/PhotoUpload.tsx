import React, { useRef } from 'react';
import styled from 'styled-components';
import { Camera } from '@/assets/icons/Camera';
import { PhotoItem } from '@/pages/CreateReview';

interface PhotoUploadProps {
  onPhotoSelect: (files: FileList | null) => void;
  photoToAddList: PhotoItem[];
}

function PhotoUpload({ onPhotoSelect, photoToAddList }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPhotoSelect(e.target.files);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderPhotoPreviews = () => {
    return photoToAddList.map((photo: PhotoItem, index: number) => (
      <PhotoPreview key={index}>
        <img src={URL.createObjectURL(photo.file)} alt={`Photo ${index}`} />
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
  background-color: #4f4f4f;
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

  p {
    font-size: ${({ theme }) => theme.text.small.fontSize};
  }
`;

const PhotoPreview = styled.div`
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
