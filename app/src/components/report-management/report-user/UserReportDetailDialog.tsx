import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { UserReportDetailDialog } from '@/types/DetailDialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';


const UserReportDetailDialogUI = ({
  dialogDetail,
  setDialogDetail,
  handleAprroveReport,
  handleRejectReport,
  loading,
  setCurrentIndex,
  setIsPreview,

}: {
  dialogDetail: UserReportDetailDialog;
  setDialogDetail: Function;
  handleAprroveReport : Function;
  handleRejectReport: Function;
  loading: boolean;
  setCurrentIndex: Function;
  setIsPreview: Function;
}) => {

  const statusTiengViet = (statusName: string) => {
    if (statusName === "approved") {
      return (
        <p className="uppercase font-semibold text-green-600">Chấp thuận</p>
      );
    } else if (statusName === "rejected") {
      return <p className="uppercase font-semibold text-red-600">Từ chối</p>;
    } else {
      return (
        <p className="uppercase font-semibold text-amber-600">Chờ xử lý</p>
      );
    }
  };
  
  return (
    <Dialog
      open={dialogDetail.isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setDialogDetail({ ...dialogDetail, isOpen: false });
        }
      }}
    >
      <DialogContent className="!max-w-[40vw] !max-h-[80vh] overflow-y-auto border border-8 border-white">
        <DialogHeader>
          <DialogTitle>Chi tiết báo cáo tài khoản</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về báo cáo tài khoản người dùng
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-6 py-4 text-sm">
          {/* Tài khoản bị báo cáo */}
          <div className="col-span-12">
            <h3 className="text-base font-semibold mb-2">
              Tài khoản bị báo cáo
            </h3>
            <div className="grid grid-cols-12 gap-4 bg-muted p-4 rounded-lg">
              <div className="col-span-4 space-y-3">
                <div>
                  <p className="font-medium">Ảnh đại diện</p>
                  <Avatar className="w-20 h-20 mt-1">
                    <AvatarImage src={dialogDetail.detail?.user?.avatar} />
                  </Avatar>
                </div>
                <div>
                  <p className="font-medium">Họ và tên</p>
                  <p>{dialogDetail.detail?.user?.fullName || "Không có"}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p>{dialogDetail.detail?.user?.email || "Không có"}</p>
                </div>
              </div>
              <div className="col-span-8 space-y-3 text-end">
                <div>
                  <p className="font-medium">Số điện thoại</p>
                  <p>{dialogDetail.detail?.user?.phoneNumber || "Không có"}</p>
                </div>
                <div>
                  <p className="font-medium">Giới thiệu</p>
                  <p>{dialogDetail.detail?.user?.bio || "Không có"}</p>
                </div>
                <div>
                  <p className="font-medium">Địa chỉ</p>
                  <p>{dialogDetail.detail?.user?.address || "Không có"}</p>
                </div>
                <div>
                  <p className="font-medium">Ngày tạo tài khoản</p>
                  <p>
                    {
                    dialogDetail.detail?.user?.createdAt &&
                    new Date(
                      dialogDetail.detail?.user?.createdAt
                    ).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chi tiết báo cáo */}
          <div className="col-span-12">
            <h3 className="text-base font-semibold mb-2">Chi tiết báo cáo</h3>
            <div className="grid grid-cols-12 gap-4 bg-muted p-4 rounded-lg">
              <div className="col-span-6 space-y-3">
                <div>
                  <p className="font-medium">Tài khoản báo cáo</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={dialogDetail.detail?.reportedBy?.avatar}
                      />
                    </Avatar>
                    <p>
                      {dialogDetail.detail?.reportedBy?.fullName || "Không có"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Lý do báo cáo</p>
                  <p>{dialogDetail.detail?.reason || "Không có"}</p>
                </div>
              </div>
              <div className="col-span-6 space-y-3 text-end">
                <div>
                  <p className="font-medium">Trạng thái</p>
                  {dialogDetail?.detail?.status && statusTiengViet(dialogDetail?.detail?.status)}
                </div>
                <div>
                  <p className="font-medium">Ngày báo cáo</p>
                  <p>
                    {new Date(dialogDetail.detail?.createdAt).toLocaleString(
                      "vi-VN"
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Duyệt vào</p>
                  <p>
                    {new Date(dialogDetail.detail?.updatedAt).toLocaleString(
                      "vi-VN"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ảnh bằng chứng */}
          {dialogDetail.detail.photos &&
            dialogDetail.detail.photos.length > 0 && (
              <div className="col-span-12">
                <p className="text-base font-semibold mb-2">Ảnh bằng chứng</p>
                <div className="flex flex-wrap gap-3 p-2 border rounded-md">
                  {dialogDetail.detail.photos.slice(0,2).map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`photo-${idx}`}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPreview(true);
                      }}
                      className="h-24 w-36 object-cover rounded cursor-pointer border hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>
            )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() =>
                setDialogDetail({ ...dialogDetail, isOpen: false })
              }
            >
              Đóng
            </Button>
          </DialogClose>
          {dialogDetail.detail.status === "pending" && (
            <>
              {loading ? (
                <Button>
                  <Loader2Icon /> Vui lòng chờ
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => handleAprroveReport(dialogDetail)}
                >
                  Chấp thuận
                </Button>
              )}

              {loading ? (
                <Button>
                  <Loader2Icon /> Vui lòng chờ
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleRejectReport(dialogDetail)}
                >
                  Từ chối
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserReportDetailDialogUI