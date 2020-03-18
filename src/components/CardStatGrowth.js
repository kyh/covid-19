import React from 'react';
import { Card } from './Card';

export const CardStatGrowth = ({ data = {}, isLoading = false }) => {
  return (
    <Card>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        Growth Rate
      </div>
      <div className="text-2xl">{data.total}</div>
    </Card>
  );
};
