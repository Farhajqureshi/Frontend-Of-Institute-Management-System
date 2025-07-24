import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-500">
          <AlertTriangle className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg font-medium text-gray-600 mb-4">
          Oops! Page Not Found
        </p>
        <p className="text-sm text-gray-500 mb-6">
          The page you're looking for might have been removed, renamed, or temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
        >
          ⬅ Go Back Home
        </Link>
      </div>
    </div>
  );
}
