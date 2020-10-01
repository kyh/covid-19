import React from "react";
import ContentLoader from "react-content-loader";
import { formatNumber } from "utils/formatter";

export const StatTotal = ({
  data = [],
  selectedState = "US",
  isLoading = false,
}) => {
  const today = data[data.length - 1];
  return (
    <div>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        {selectedState || "US"} Positive Cases
      </div>
      {!isLoading ? (
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold leading-none text-red-500">
            {formatNumber(today.positive)}
          </h1>
          <div className="text-right">
            <p className="text-sm">
              {formatNumber(today.total)}{" "}
              <span className="text-gray-600">Tests Conducted</span>
            </p>
            <p className="text-sm">
              {formatNumber(today.negative)}{" "}
              <span className="text-blue-600"> Tested Negative</span>
            </p>
          </div>
        </div>
      ) : (
        <ContentLoader style={{ width: "100%", height: 42 }}>
          <rect x="0" y="0" rx="4" ry="4" width="120" height="100%" />
          <rect x="80%" y="0" rx="4" ry="4" width="20%" height="40%" />
          <rect x="80%" y="50%" rx="4" ry="4" width="20%" height="40%" />
        </ContentLoader>
      )}
    </div>
  );
};
