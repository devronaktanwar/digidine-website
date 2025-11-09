import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

const CommonDrawer: FC<IDrawerProps> = ({
  isOpen,
  onClose,
  title,
  description = null,
  children,
  hideTitle = false,
  titleClassName = '',
  headerClassName = '',
  dialogClassName = '',
}) => {
  return (
    <div>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className={twMerge('p-4 ', dialogClassName)}>
          <div className="overflow-auto custom-scrollbar">
            {!hideTitle && (
              <DrawerHeader className={headerClassName}>
                <DrawerTitle
                  className={twMerge(
                    'text-center font-semibold text-2xl',
                    titleClassName
                  )}
                >
                  {title}
                </DrawerTitle>
                <DrawerDescription className="text-center">
                  {description}
                </DrawerDescription>
              </DrawerHeader>
            )}

            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CommonDrawer;
interface IDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string | null;
  children: React.ReactNode;
  hideTitle?: boolean;
  titleClassName?: string;
  headerClassName?: string;
  dialogClassName?: string;
}
