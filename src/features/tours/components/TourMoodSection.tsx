import React from 'react';

const travelMoods = [
  {
    label: 'Adventure',
    icon: '↗',
    className:
      'hover:border-primary hover:bg-primary-extraLight hover:text-primary',
  },
  {
    label: 'Nature',
    icon: '⌁',
    className:
      'hover:border-primary hover:bg-primary-extraLight hover:text-primary',
  },
  {
    label: 'Beach',
    icon: '◌',
    className:
      'hover:border-secondary hover:bg-secondary/10 hover:text-secondary',
  },
  {
    label: 'Culture',
    icon: '✦',
    className:
      'hover:border-accent hover:bg-accent/10 hover:text-accent',
  },
];

const TourMoodSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Where does your mood take you?
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Pick a vibe. Find a journey.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-gray-500 dark:text-mutedDark lg:text-right">
          Not every trip needs the same itinerary. Browse with a
          feeling in mind and let the destination follow.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {travelMoods.map((mood) => (
          <button
            key={mood.label}
            type="button"
            className={`group flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] ${mood.className}`}
          >
            <span className="font-bold">
              {mood.label}
            </span>

            <span className="text-xl text-gray-300 transition-transform duration-300 group-hover:translate-x-1 dark:text-white/20">
              {mood.icon}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TourMoodSection;
