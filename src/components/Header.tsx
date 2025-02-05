import React from "react";
import { ShieldBan } from "lucide-react";

export const Header: React.FC = () => (
  <div className="flex items-center gap-2 mb-6">
    <ShieldBan className="w-6 h-6 text-red-500" />
    <h1 className="text-xl font-bold text-gray-800">Website Blocker</h1>
  </div>
);
