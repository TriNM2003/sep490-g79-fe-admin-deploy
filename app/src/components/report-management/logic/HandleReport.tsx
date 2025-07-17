import type { UserReportDetailDialog, DetailDialog } from '@/types/DetailDialog';

const HandleReport = ({reportData}: {reportData: DetailDialog<unknown>}) => {
    const handleApproveUserReport = (reportData: UserReportDetailDialog) => {
      try {
        console.log(reportData);
      } catch (error: any) {
        console.log(error?.response.data.message);
      }
    };

    const handleRejectUserReport = (reportData: UserReportDetailDialog) => {
      try {
        console.log(reportData);
      } catch (error: any) {
        console.log(error?.response.data.message);
      }
    };

  return {
    handleApproveUserReport,
    handleRejectUserReport
  }
}

export default HandleReport