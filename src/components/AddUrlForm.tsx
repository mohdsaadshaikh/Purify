import React, { useState } from "react";
import { Plus } from "lucide-react";

interface AddUrlFormProps {
  onAdd: (url: string) => void;
}

export const AddUrlForm: React.FC<AddUrlFormProps> = ({ onAdd }) => {
  const [newUrl, setNewUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    onAdd(newUrl);
    setNewUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        placeholder="Enter website URL (e.g., facebook.com)"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
};
