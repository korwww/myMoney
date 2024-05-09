import AdminLayout from '@/components/Admin/AdminLayout';
import AdminContent from '@/components/Admin/AdminContent';
import AdminTable, { TableHeadItem } from '@/components/Admin/AdminTable';
import Button from '@/components/common/Button';
import { withAdminAuthenticatedUser } from '@/components/hocs/withAdminAuthenticatedUser';

interface ReportUserTd {
  email: string;
  reason: '광고용 후기' | '부적절한 단어 사용';
  count: number;
  state: '정지 종료' | '정지';
}

const tableHead: TableHeadItem[] = [
  { name: 'No', $widthRatio: 40 },
  { name: '이메일', $widthRatio: 295 },
  { name: '신고 사유', $widthRatio: 240 },
  { name: '횟수', $widthRatio: 50 },
  { name: '상태', $widthRatio: 150 },
  { name: '', $widthRatio: 135 },
];

const tableBody: ReportUserTd[] = [
  {
    email: 'myMoney@gmail.com',
    reason: '광고용 후기',
    count: 3,
    state: '정지 종료',
  },
  {
    email: 'prgms@gmail.com',
    reason: '부적절한 단어 사용',
    count: 1,
    state: '정지',
  },
];

function ReportedUsersDashboard() {
  return (
    <AdminLayout>
      <AdminContent title="신고된 유저 관리">
        <AdminTable tableHead={tableHead}>
          {tableBody.map((report, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{report.email}</td>
              <td>{report.reason}</td>
              <td>{report.count}</td>
              <td>{report.state}</td>
              <td>
                <Button
                  scheme="primary"
                  size="small"
                  disabled={report.state === '정지 종료'}
                >
                  정지해제
                </Button>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(ReportedUsersDashboard);
