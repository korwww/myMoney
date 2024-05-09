import { useState } from 'react';
import styled from 'styled-components';

import AdminContent from '@/components/Admin/AdminContent';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminTable, { TableHeadItem } from '@/components/Admin/AdminTable';
import { Image } from '@/assets/icons/Image';
import Icon from '@/components/common/Icon';
import { withAdminAuthenticatedUser } from '@/components/hocs/withAdminAuthenticatedUser';

interface ReportUserTd {
  title: string;
  author: string;
  imageURL: string;
  isVerified: boolean;
}

const tableHead: TableHeadItem[] = [
  { name: 'No', $widthRatio: 5 },
  { name: '제목', $widthRatio: 44.5 },
  { name: '작성자(이메일)', $widthRatio: 23 },
  { name: '인증 사진', $widthRatio: 18.7 },
];

const tableBody: ReportUserTd[] = [
  {
    author: 'myMoney@gmail.com',
    title: '이것은 갈비인가 통닭인가',
    imageURL: '정지 종료',
    isVerified: false,
  },
];

function UnverifiedReviewsDashboard() {
  const [isModalopen, setIsModalOpen] = useState(false);
  return (
    <AdminLayout>
      <AdminContent title="미승인 후기 관리">
        <AdminTable tableHead={tableHead}>
          {tableBody.map((report, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{report.title}</td>
              <td>{report.author}</td>
              <td>
                <IconButton>
                  <Icon width={22} icon={<Image />} />
                </IconButton>

                {/* <Button  scheme="transparent" size="small">
                </Button> */}
              </td>
            </tr>
          ))}
        </AdminTable>
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
