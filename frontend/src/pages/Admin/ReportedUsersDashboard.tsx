import AdminLayout from '@/components/Admin/AdminLayout';
import AdminContent from '@/components/Admin/AdminContent';
import AdminTable, { TableHeadItem } from '@/components/Admin/AdminTable';
import Button from '@/components/common/Button';
import { withAdminAuthenticatedUser } from '@/components/hocs/withAdminAuthenticatedUser';
import { useAdmin } from '@/hooks/useAdmin';
import { ISuspendedUsers } from '@/models/admin.model';

const tableHead: TableHeadItem[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '이메일', $widthRatio: 36 },
  { name: '신고 사유', $widthRatio: 13 },
  { name: '횟수', $widthRatio: 13 },
  { name: '상태', $widthRatio: 14 },
  { name: '', $widthRatio: 20 },
];

function ReportedUsersDashboard() {
  const { isLoadingSuspendedUsers, suspendedUsers, deleteReportAction } =
    useAdmin();

  const transformData = (users: ISuspendedUsers[]) => {
    return users.map((data: ISuspendedUsers) => ({
      ...data,
      status: data.isSuspended ? '정지' : '정지 종료',
    }));
  };

  const handleDeleteReport = (reportId: number) => {
    deleteReportAction(reportId);
  };
  return (
    <AdminLayout>
      <AdminContent
        title="신고된 유저 관리"
        isLoading={isLoadingSuspendedUsers}
      >
        {!suspendedUsers.length && (
          <tr>
            <td colSpan={tableHead.length}>신고된 유저가 없습니다.</td>
          </tr>
        )}

        {suspendedUsers.length > 0 && (
          <AdminTable tableHead={tableHead}>
            {transformData(suspendedUsers).map((report, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{report.reportedUserEmail}</td>
                <td>{report.reportReason}</td>
                <td>{report.reportCount}</td>
                <td>{report.status}</td>
                <td>
                  <Button
                    scheme="primary"
                    size="small"
                    disabled={report.status === '정지 종료'}
                    onClick={() => handleDeleteReport(report.reportId)}
                  >
                    정지해제
                  </Button>
                </td>
              </tr>
            ))}
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(ReportedUsersDashboard);
