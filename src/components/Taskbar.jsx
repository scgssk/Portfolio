export default function Taskbar({ apps, onAppClick }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-black/60 backdrop-blur-md border-b border-green-800 text-green-300 flex items-center px-4 space-x-4 z-40">
      {apps.map((app) =>
        app.visible ? (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className="text-green-300 hover:text-green-100 transition text-sm"
            title={`Restore ${app.title}`}
          >
            {app.title}
          </button>
        ) : null
      )}

    </div>
  );
}
