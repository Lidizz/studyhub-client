import { useSelector } from "react-redux";

export function Footer() {
  return (
    <footer className="bg-purple-600 w-full shadow-lg px-6 py-1.5">
      <div className="flex items-center justify-center">
        <p className="text-white">
          &copy; {new Date().getFullYear()} StudyHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
