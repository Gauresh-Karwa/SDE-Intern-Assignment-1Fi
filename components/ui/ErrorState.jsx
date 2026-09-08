"use client";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="pill-btn-solid">
          Try again
        </button>
      )}
    </div>
  );
}
