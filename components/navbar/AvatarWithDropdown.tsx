'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User } from 'lucide-react';
import Link from 'next/link';
import { CustomerApis } from '@/apis/Customer';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/store/customerStore';

const AvatarWithDropdown = () => {
  const router = useRouter();
  const { session } = useSessionStore();
  const { user } = (session || {}) as any;
  const handleLogout = async () => {
    const response = await CustomerApis.logout();
    if (response.isSuccess) {
      toast.success('Logged out successfully');
      router.refresh();
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer p-2 text-gray-500">
            <User />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          sideOffset={8}
          className="w-[250px] p-3"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full">
              {user?.first_name?.charAt(0)}
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-sm">
                {user?.first_name + ' ' + user?.last_name}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="flex flex-col text-sm gap-1 mt-2">
            <Link
              href={'/my-profile'}
              className="hover:underline hover:text-primary"
            >
              Profile
            </Link>
            <Link
              href={'/my-orders'}
              className="hover:underline hover:text-primary"
            >
              My Orders
            </Link>
            <Link
              href={''}
              className="hover:underline hover:text-primary"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarWithDropdown;
