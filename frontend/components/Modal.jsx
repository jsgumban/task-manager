'use client';

// simple modal component
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      {/* modal content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-5 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
