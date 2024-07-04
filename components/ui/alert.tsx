import React, { ReactNode } from 'react';

export const AlertDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}> = ({ open, onOpenChange, children }) => {
  return open ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white w-96 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export const AlertDialogTrigger: React.FC<{
  onClick: () => void;
  children: ReactNode;
}> = ({ onClick, children }) => (
  <button className="px-4 space-y-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClick}>
    {children}
  </button>
);

export const AlertDialogContent: React.FC<{ children: ReactNode }> = ({
  children,
}) => <div className="p-6">{children}</div>;

export const AlertDialogHeader: React.FC<{ children: ReactNode }> = ({
  children,
}) => <div className="border-b p-4">{children}</div>;

export const AlertDialogTitle: React.FC<{ children: ReactNode }> = ({
  children,
}) => <h2 className="text-lg font-semibold">{children}</h2>;

export const AlertDialogDescription: React.FC<{ children: ReactNode }> = ({
  children,
}) => <p className="mt-2 text-sm text-gray-600">{children}</p>;

export const AlertDialogFooter: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <div className="flex justify-end gap-4 px-4 py-3 border-t rounded-b-lg">
    {children}
  </div>
);

export const AlertDialogCancel: React.FC<{
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <button
    className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export const AlertDialogAction: React.FC<{
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <button
    className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
