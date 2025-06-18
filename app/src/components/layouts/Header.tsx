import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); 
  return (
    <div className="w-full bg-background border-b shadow-sm">
      <NavigationMenu className="max-w-7xl mx-auto py-2 flex justify-end items-end">
        <NavigationMenuList className="flex items-center gap-4">
          <NavigationMenuItem className="flex items-center gap-2">
            <span className="text-sm font-medium">Xin chào, Admin</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                <DropdownMenuItem onClick={() =>navigate("/login")}>Thoát đăng nhập</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Header;
