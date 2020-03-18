import React from 'react';
import { Card } from './Card';

export const CardStatGrowth = ({ data = [], isLoading = false }) => {
  const today = data[data.length - 1];
  const yesterday = data[data.length - 2];

  return (
    <Card>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        Growth Rate
      </div>
      {!isLoading ? (
        <div className="text-2xl">
          {(today.positive / yesterday.positive).toFixed(2)}
        </div>
      ) : null}
    </Card>
  );
};
