import React from 'react';

const TourHighlightItem: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
}) => (
  <li className="flex items-center gap-4">
    <span className="text-primary">{icon}</span>
    <span>{label}</span>
  </li>
);

export default TourHighlightItem;
