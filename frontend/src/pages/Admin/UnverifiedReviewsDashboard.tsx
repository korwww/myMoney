import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import AdminContent from '@/components/Admin/AdminContent';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminTable, { TableHeadItem } from '@/components/Admin/AdminTable';
import { Image } from '@/assets/icons/Image';
import Icon from '@/components/common/Icon';
import { withAdminAuthenticatedUser } from '@/components/hocs/withAdminAuthenticatedUser';
import { useAdmin } from '@/hooks/useAdmin';
import Modal from '@/components/common/Modal';
import { IUnverifiedReviewItem } from '@/models/review.model';

const tableHead: TableHeadItem[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '제목', $widthRatio: 45 },
  { name: '작성자(닉네임)', $widthRatio: 16 },
  { name: '작성일', $widthRatio: 16 },
  { name: '인증 사진', $widthRatio: 16 },
];

function UnverifiedReviewsDashboard() {
  const { unverifiedReviews, isLoadingUnverifiedReviews } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { approveReview } = useAdmin();

  const approve = async (reviewId: number) => {
    await approveReview(reviewId);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <AdminContent
        title="미승인 후기 관리"
        isLoading={isLoadingUnverifiedReviews}
      >
        {unverifiedReviews.length === 0 && (
          <tr>
            <td colSpan={tableHead.length}>미승인 후기가 없습니다.</td>
          </tr>
        )}

        {unverifiedReviews.length > 0 && (
          <AdminTable tableHead={tableHead}>
            {unverifiedReviews.map(
              (report: IUnverifiedReviewItem, idx: number) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{report.title}</td>
                    <td>{report.userName}</td>
                    <td>{dayjs(report.createdAt).format('YYYY-MM-DD')}</td>
                    <td>
                      <IconButton onClick={() => setIsModalOpen(true)}>
                        <Icon width={22} icon={<Image />} />
                      </IconButton>
                    </td>
                  </tr>
                  <Modal
                    buttonText="승인"
                    imageSrc={report.receiptImg}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onCancel={closeModal}
                    onConfirm={() => approve(report.id)}
                  />
                </React.Fragment>
              ),
            )}
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}
const IconButton = styled.div`
  &:hover {
    svg {
      fill: ${({ theme }) => theme.color.primary};
    }
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export default withAdminAuthenticatedUser(UnverifiedReviewsDashboard);
