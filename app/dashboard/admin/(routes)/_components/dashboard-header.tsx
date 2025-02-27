"use client"

import { Header } from "antd/es/layout/layout";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, MenuIcon, UserIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { MenuStyled } from "./dashboard.styles";

import { useRouter } from "next/navigation";
import usePath from "../_hooks/use-path";
import { Images } from "@/app/_constants/images";
import Typography from "@/app/_components/typography/typography";
import { items } from "../_utils/data";
import { useNotification } from "@/app/_hooks/use-notification";
import { signOut } from "@/app/dashboard/help-provider/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";


export const DashboardHeader = () => {
  const [visible, setVisible] = useState(false)
  const { locationCurrent } = usePath();
  const {toggleNotification} = useNotification();

  const router = useRouter();
  const handleMenuClick = () => {
    setVisible(prev => !prev)
  }

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
    <Header
      style={{
        paddingLeft: 0,
        paddingRight: "40px",
        background: "#fff",
        height: 72,
        borderBottom: "1px solid #DDEEE5",
      }}
    >
      <div className="ml-6 mt-4 mb-10 lg:hidden">
        <Image
          width={100}
          height={40}
          src={Images.Logo}
          alt="Medeasy logo"
        />
      </div>
      <div className="flex justify-end items-center w-full space-x-4">
        <div className="items-center gap-x-2 lg:flex hidden">
        <Avatar className="w-12 h-12">
            <AvatarImage alt={`@admin`} />
            <AvatarFallback className="bg-[#5C698A]">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
          <div className="">
            <Typography as="p">
              Admin
            </Typography>

          </div>
        </div>
        <div onClick={handleMenuClick} className="cursor-pointer relative z-50 -ml-4 mt-2 lg:hidden">
          <div className="-translate-y-20">
            {visible ? <XIcon /> : <MenuIcon  />}
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {visible && <motion.div
        className="bg-[#F1F5F7] absolute left-0 top-[9.6%] w-full mt-2 h-[91.5%] z-[9999]"
          initial={{
            x: -700,
          }}
          animate={{
            x: 0,
            transition: { type: "linear" },
          }}

          exit={{
            x: -700
          }}
        >
          <div className="flex justify-end items-center">
          {/* <div className="pl-4 -translate-y-6" onClick={handleMenuClick}>
            {visible ? <XIcon /> : <MenuIcon />}
          </div> */}
          </div>
          <MenuStyled
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[locationCurrent]}
            selectedKeys={[locationCurrent]}
            onClick={(menuInfo) => {
              handleMenuClick()
              router.push(menuInfo?.key)}
            }
            items={items.filter(() => {
              return true;
            })}
          />
          <div className="absolute bottom-3  px-4 translate-x-0 cursor-pointer gap-3 font-bold font-satoshi pl-12 flex items-center red-100"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            Logout
          </div>

        </motion.div>}
      </AnimatePresence>
    </Header>
  );
};
