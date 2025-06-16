import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const user = false; // đổi sang true để test trạng thái đăng nhập

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b shadow-sm">
      <NavigationMenu className="max-w-7xl mx-auto py-2 flex justify-end items-end">
        <NavigationMenuList className="flex items-center gap-4">
          {!user && (
            <NavigationMenuItem>
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isPending ? "pending text-sm font-medium hover:underline" : isActive ? "active" : ""
                }
              >
                Đăng nhập
              </NavLink>
            </NavigationMenuItem>
          )}

          {user && (
            <NavigationMenuItem className="flex items-center gap-2">
              <span className="text-sm font-medium">Xin chào, Admin</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Header;
