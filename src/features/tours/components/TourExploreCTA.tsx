import React from 'react';

const TourExploreCTA: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-primary-extraLight px-7 py-12 sm:px-12 lg:px-16">

        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

          <div className="max-w-xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Keep exploring
            </p>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Your next story could be one trip away.
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-mutedDark">
              Browse the collection, compare your options, and find
              an experience that feels right for you.
            </p>
          </div>

          <a
            href="#tours"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
          >
            Browse tours

            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TourExploreCTA;
