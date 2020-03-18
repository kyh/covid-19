import React from 'react';
import { Card } from './Card';

export const CardStat = ({ title, number, additional, daily }) => {
  return (
    <Card>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        {title}
      </div>
      <div className="text-2xl">{number}</div>
    </Card>
  );
};
