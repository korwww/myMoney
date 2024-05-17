import { useState } from 'react';
import styled from 'styled-components';

import AdminContent from '@/components/Admin/AdminContent';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminTable, { TableHeadItem } from '@/components/Admin/AdminTable';
import { Image } from '@/assets/icons/Image';
import Icon from '@/components/common/Icon';
import { withAdminAuthenticatedUser } from '@/components/hocs/withAdminAuthenticatedUser';
import { useAdmin } from '@/hooks/useAdmin';
import Modal from '@/components/common/Modal';
import { IReviewItem } from '@/models/review.model';

const tableHead: TableHeadItem[] = [
  { name: 'No', $widthRatio: 5 },
  { name: '제목', $widthRatio: 44.5 },
  { name: '작성자(이메일)', $widthRatio: 23 },
  { name: '인증 사진', $widthRatio: 18.7 },
];

function UnverifiedReviewsDashboard() {
  const { unverifiedReviews, isLoadingUnverifiedReviews } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { approveReview } = useAdmin();

  const approve = async (reviewId: number) => {
    await approveReview(reviewId);
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
        {!unverifiedReviews.length && <p>미승인 후기가 없습니다.</p>}

        {unverifiedReviews.length > 0 && (
          <AdminTable tableHead={tableHead}>
            {unverifiedReviews.map((report: IReviewItem, idx: number) => (
              <>
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{report.title}</td>
                  <td>{report.userName}</td>
                  <td>
                    <IconButton onClick={() => setIsModalOpen(true)}>
                      <Icon width={22} icon={<Image />} />
                    </IconButton>
                  </td>
                </tr>
                <Modal
                  buttonText="승인"
                  imageSrc="https://www.press9.kr/news/photo/201910/30004_craw1.jpg"
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onCancel={closeModal}
                  onConfirm={() => approve(report.id)}
                />
              </>
            ))}
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
