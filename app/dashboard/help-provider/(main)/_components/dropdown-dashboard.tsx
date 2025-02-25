import Typography from '@/app/_components/typography/typography';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { Briefcase, ChevronDown, LogOut, UserIcon } from 'lucide-react';
import React from 'react';
import { signOut } from '../../action';
import Link from 'next/link';

const DropdownDashboard: React.FC<{
  user: SignUpTwoSchemaType;
  url: string;
}> = ({ user, url }) => {
  const handleSignOut = async () => {
    try {
      await signOut(url);
    } catch (error) {
      throw error;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage alt="@medeasy" />
            <AvatarFallback className="bg-[#5C698A]">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <Typography
              as="p"
              align="left"
              className="font-semibold text-sm text-black"
            >
              {user.fname} {user.lname}
            </Typography>
          </div>
          <ChevronDown size={14} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-6 bg-white">
        <DropdownMenuItem
          className="md:hidden items-center h-full py-3 flex"
          asChild
        >
          <Link href={`/dashboard/${url}/home?active=new`}>
            <Briefcase />
            <span>Requests</span>
          </Link>
        </DropdownMenuItem>
        <hr className="p-0 m-0" />
        <DropdownMenuItem className="h-full py-3" onClick={handleSignOut}>
          <LogOut />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownDashboard;
