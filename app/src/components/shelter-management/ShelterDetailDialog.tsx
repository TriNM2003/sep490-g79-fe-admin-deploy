import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CalendarIcon, HashIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type { Shelter } from "@/types/Shelter";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const ShelterDetailDialog = ({ shelter } : {shelter: Shelter}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Chi tiết
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Thông tin trạm cứu hộ</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Mã trạm: {shelter?.shelterCode}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-24 h-24">
            <img src={shelter?.avatar || "https://maunhi.com/wp-content/uploads/2025/06/avatar-mac-dinh-facebook-17.jpg"} alt="avatar" />
          </Avatar>
          <h2 className="text-lg font-semibold">{shelter?.name}</h2>
          <Badge
            variant={
              shelter?.status === "active"
                ? "default"
                : shelter.status === "verifying"
                ? "outline"
                : ["rejected", "banned"].includes(shelter.status)
                ? "destructive"
                : "outline" // fallback
            }
          >
            {shelter?.status === "active"
              ? "Đang hoạt động"
              : shelter.status === "verifying"
              ? "Đang chờ duyệt"
              : shelter.status === "banned"
              ? "Bị cấm"
              : shelter.status === "rejected"
              ? "Từ chối"
              : "Không xác định"}
          </Badge>
        </div>

        <div className="grid gap-2 mt-4">
          <div className="flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            <span>{shelter?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            <span>{shelter?.hotline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            <span>{shelter?.address || "Chưa có địa chỉ"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>
              Thành lập:{" "}
              {new Date(shelter?.foundationDate).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HashIcon className="w-4 h-4" />
            <span>Cảnh báo: {shelter?.warningCount}</span>
          </div>
        </div>

        {shelter?.bio && (
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">
              Giới thiệu:
            </p>
            <p>{shelter.bio}</p>
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">
            Giấy phép hoạt động:
          </p>
          <a
            href={shelter?.shelterLicenseURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm"
          >
                 Xem tài liệu
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShelterDetailDialog;
