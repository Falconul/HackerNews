import React from "react";
import "./Footer.css";
import "tailwindcss/tailwind.css";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a href="#" className="hover:text-red-300">
          HackerNews
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            Guidelines
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            FAQ
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            Lists
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            API
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            Security
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            Legal
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            Apply to YC
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-300 me-4 md:me-6">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
