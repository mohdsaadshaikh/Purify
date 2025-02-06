import React, { useState } from "react";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { DEFAULT_BLOCKED_URLS } from "../constants/defaultUrls";

interface UrlListProps {
  urls: string[];
  onRemove: (url: string) => void;
  onEdit: (oldUrl: string, newUrl: string) => void;
}

interface EditableUrlProps {
  url: string;
  onSave: (newUrl: string) => void;
  onCancel: () => void;
}

const EditableUrl: React.FC<EditableUrlProps> = ({ url, onSave, onCancel }) => {
  const [editedUrl, setEditedUrl] = useState(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedUrl.trim() && editedUrl !== url) {
      onSave(editedUrl);
    } else {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1">
      <input
        type="text"
        value={editedUrl}
        onChange={(e) => setEditedUrl(e.target.value)}
        className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <div className="flex gap-1">
        <button type="submit" className="text-green-500 hover:text-green-600">
          <Check className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export const UrlList: React.FC<UrlListProps> = ({ urls, onRemove, onEdit }) => {
  const [editingUrl, setEditingUrl] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {urls
        .filter((url) => !DEFAULT_BLOCKED_URLS.includes(url)) // Filter out URLs that are in DEFAULT_BLOCKED_URLS
        .map((url) => (
          <div
            key={url}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            {editingUrl === url ? (
              <EditableUrl
                url={url}
                onSave={(newUrl) => {
                  onEdit(url, newUrl);
                  setEditingUrl(null);
                }}
                onCancel={() => setEditingUrl(null)}
              />
            ) : (
              <>
                <span className="text-gray-700">{url}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingUrl(url)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onRemove(url)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

      {urls.filter((url) => !DEFAULT_BLOCKED_URLS.includes(url)).length ===
        0 && (
        <p className="text-center text-gray-500 mt-4">
          No websites blocked yet. Add some above!
        </p>
      )}
    </div>
  );
};
