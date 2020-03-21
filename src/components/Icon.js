import React from 'react';

export const iconMap = {
  trendUp: (
    <path d="M20 15a1 1 0 0 0 2 0V7a1 1 0 0 0-1-1h-8a1 1 0 0 0 0 2h5.59L13 13.59l-3.3-3.3a1 1 0 0 0-1.4 0l-6 6a1 1 0 0 0 1.4 1.42L9 12.4l3.3 3.3a1 1 0 0 0 1.4 0L20 9.4V15z" />
  ),
  trendDown: (
    <path d="M20 9a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1h-8a1 1 0 0 1 0-2h5.59L13 10.41l-3.3 3.3a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 1.4-1.42L9 11.6l3.3-3.3a1 1 0 0 1 1.4 0l6.3 6.3V9z" />
  )
};

const iconSizeMap = {
  xs: '12px',
  sm: '20px',
  md: '24px',
  lg: '40px'
};

export const Icon = ({
  icon = '',
  className = 'fill-current text-gray-800',
  size = 'md',
  ...rest
}) => {
  const iconPath = iconMap[icon];
  const iconSize = iconSizeMap[size];
  if (!iconPath) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      className={className}
      {...rest}
    >
      {iconPath}
    </svg>
  );
};
