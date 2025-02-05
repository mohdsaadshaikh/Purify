import { AddUrlForm } from "./components/AddUrlForm";
import { Header } from "./components/Header";
import { UrlList } from "./components/UrlList";
import { useBlockedUrls } from "./hooks/useBlockedUrls";

function App() {
  const { blockedUrls, isExtension, addUrl, removeUrl, editUrl } =
    useBlockedUrls();

  return (
    <div className="w-[400px] p-4 bg-white">
      <Header />

      {!isExtension && (
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
          ⚠️ Development Mode: Changes won't persist
        </div>
      )}

      <AddUrlForm onAdd={addUrl} />
      <UrlList urls={blockedUrls} onRemove={removeUrl} onEdit={editUrl} />
    </div>
  );
}

export default App;
