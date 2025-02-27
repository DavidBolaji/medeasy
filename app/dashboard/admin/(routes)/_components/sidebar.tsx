"use client";

import { Grid } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import {  LogOut } from "lucide-react";
import { Images } from "@/app/_constants/images";
import { MenuStyled } from "./dashboard.styles";
import { signOut } from "@/app/dashboard/help-provider/action";
import { useNotification } from "@/app/_hooks/use-notification";
import usePath from "../_hooks/use-path";
import { items } from "../_utils/data";

const { useBreakpoint } = Grid;

export const Sidebar = () => {
  const { locationCurrent } = usePath();
  const {toggleNotification} = useNotification();
  const screen = useBreakpoint();
  const router = useRouter();

    const handleSignOut = async () => {
      const response = await signOut('', true);
      if(!response) {
        toggleNotification({
            type: "success",
            message: "Admin has signed out successfully",
            title: "Sign out success",
            show: true
        })
      }
    };
  
  return (
    screen.lg && (
      <Sider
        trigger={null}
        style={{
          backgroundColor: "#F1F5F7",
          height: "100vh",
          maxHeight: "100vh",
          position: "sticky",
          top: 0,
          borderRight: "1px solid #E4E4EF",
        }}
        width={269}
      >
        <div className="ml-10 mt-4 mb-10">
          <Image
            width={100}
            height={40}
            src={Images.Logo}
            alt="Medeasy logo"
          />
        </div>
        <MenuStyled
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[locationCurrent]}
          selectedKeys={[locationCurrent]}
          onClick={(menuInfo) => router.push(menuInfo?.key)}
          items={items.filter(() => {
            return true;
          })}
        />
         <div className="absolute bottom-6  px-5 -translate-x-2 cursor-pointer gap-3 font-bold font-satoshi pl-12 flex items-center red-100"
         onClick={handleSignOut}
         >
          <LogOut size={16} />
          Logout
        </div>
      </Sider>
    )
  );
};
