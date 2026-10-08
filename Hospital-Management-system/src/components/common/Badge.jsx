import React from 'react';
import { getStatusStyle } from '../../utils/formatters';

export const Badge = ({ status, size = 'sm', customText }) => {
  const style = getStatusStyle(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border shadow-2xs ${sizeClasses}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: style.border
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: style.text }}
      ></span>
      {customText || status}
    </span>
  );
};
