import { BellIcon, Grid2X2, IdCard, LifeBuoy, Settings, Users } from "lucide-react";
import {  MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem("Dashboard", "/dashboard/admin/home", <Grid2X2 />),
  getItem("User Management", "/dashboard/admin/user-management", <Users />),
  getItem(
    "Help Requests",
    "/dashboard/admin/help-requests",
    <div className="-ml-1">
      <LifeBuoy />
    </div>
  ),
  getItem("Payment", "/dashboard/admin/payment", <IdCard />),
  getItem("Communications", "/dashboard/admin/communications", <BellIcon/>),
  getItem("Settings", "/dashboard/settings", <Settings />),
];
