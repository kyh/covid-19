import React from "react";
import { Card } from "components/Card";
import { Loader } from "components/Loader";

const Point = ({ label = "", color = "green" }) => {
  return (
    <span
      aria-label={label}
      className={`h-4 w-4 bg-${color}-800 rounded-full flex items-center justify-center bg-opacity-50 mr-2`}
    >
      <span className={`h-2 w-2 bg-${color}-500 rounded-full`} />
    </span>
  );
};

export const CardLabel = ({ label, lowercase }) => (
  <span
    className={`font-medium text-gray-400 text-2xs ${
      lowercase ? "" : "uppercase"
    }`}
  >
    {label}
  </span>
);

export const StatCard = ({
  color,
  label,
  value,
  suffix,
  className,
  isLoading,
}) => {
  console.log(isLoading);
  return (
    <Card className={className}>
      <div className="flex items-center">
        <Point label={label} color={color} />
        <CardLabel label={label} />
      </div>
      <div className="flex pl-6 items-baseline">
        {isLoading ? (
          <Loader width="100%" height="21">
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
          </Loader>
        ) : (
          <>
            <span className="text-gray-100 text-sm mr-1">{value}</span>
            {!!suffix && (
              <span className="text-gray-400 text-2xs">{suffix}</span>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export const StatRow = ({ label, value, lowercase }) => (
  <div className="flex items-center justify-between">
    <CardLabel label={label} lowercase={lowercase} />
    <span className="text-gray-100 text-sm">{value}</span>
  </div>
);
