import { FC } from 'react';
import { TourLocations } from 'types/tourTypes';

const ItineraryTimeline: FC<{ locations: TourLocations[] }> = ({
  locations,
}) => {
  return (
    <div className="relative mt-6">
      {locations
        .slice()
        .sort((a, b) => a.day - b.day)
        .map((loc) => (
          <div key={loc._id} className="relative mb-8 ml-6 flex flex-col">
            {/* Timeline marker */}
            <div
              className="absolute -left-[12px] h-6 w-6 rounded-full border-4
border-white bg-primary dark:border-backgroundDark"
            ></div>
            {/* Content */}
            <div className="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-dark">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                Day {loc.day}
              </span>
              <p className="mt-2 text-lg">{loc.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItineraryTimeline;
