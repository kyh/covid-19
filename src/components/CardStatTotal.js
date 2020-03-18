import React from 'react';
import { Card } from './Card';

export const CardStatTotal = ({ data = {}, isLoading = false }) => {
  return (
    <Card>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        Total Cases
      </div>
      <div className="text-2xl">{data.positive}</div>
    </Card>
  );
};
