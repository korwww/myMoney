export interface ISuspendedUsers {
  reportId: number;
  reportedUserId: number;
  reportedUserEmail: string;
  reportCount: number;
  reportReason: string;
  isSuspended: boolean;
}
