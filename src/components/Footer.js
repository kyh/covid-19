import React from "react";

export const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between max-w-5xl mx-auto p-4 border-gray-300 border-t">
        <span>© {new Date().getFullYear()}, Kaiyu Hsu</span>
        <div>
          <a
            className="text-gray-500 hover:text-gray-700"
            href="https://github.com/tehkaiyu/covid-19"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};
