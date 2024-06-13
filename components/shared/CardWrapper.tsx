import React, { ReactNode } from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "../ui/card";

interface CardWrapperProps {
  title: string;
  footerContent: ReactNode;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ title, footerContent, children, onSubmit }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-4">
        <form onSubmit={onSubmit}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="text-center">
            {footerContent}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CardWrapper;
