import React from "react";
import { Card } from "components/Card";

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

export const StatCard = ({ color, label, value, suffix }) => {
  return (
    <Card className="text-xs">
      <div className="flex text-gray-400">
        <Point label={label} color={color} />
        <p className="font-medium uppercase">{label}</p>
      </div>
      <div className="pl-6">
        <span className="text-gray-100">{value}</span>
        {!!suffix && <span>{suffix}</span>}
      </div>
    </Card>
  );
};
