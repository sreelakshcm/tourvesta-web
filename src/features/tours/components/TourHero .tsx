import React from 'react';

interface TourHeroProps {
  tourCount: number;
}

const TourHero: React.FC<TourHeroProps> = ({ tourCount }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary-extraLight blur-3xl" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-secondary-light/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-8 sm:px-8 lg:px-10 lg:pt-12">
        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-neutral-layout shadow-2xl shadow-black/10">

          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=85"
            alt="Scenic travel destination"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

          <div className="relative z-10 flex min-h-[520px] items-center px-6 py-14 sm:px-10 lg:px-16">
            <div className="w-full max-w-3xl animate-fadeInDown">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Explore Tourvesta
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-7xl">
                Find a trip
                <span className="block text-primary">
                  worth talking about.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                From peaceful escapes to unforgettable adventures,
                discover experiences that fit the way you want to travel.
              </p>

              <div className="mt-9 max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl">
                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl">

                  <svg
                    className="h-5 w-5 shrink-0 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      strokeWidth="1.8"
                    />

                    <path
                      strokeLinecap="round"
                      strokeWidth="1.8"
                      d="M16 16l5 5"
                    />
                  </svg>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Search experiences
                    </p>

                    <p className="truncate text-sm font-semibold text-gray-800">
                      Search destinations, tours or experiences
                    </p>
                  </div>

                  <div className="hidden rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white sm:block">
                    Explore
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                <span className="mr-1 text-white/50">
                  Popular:
                </span>

                {['Goa', 'Coorg', 'Kerala', 'Manali'].map(
                  (destination) => (
                    <span
                      key={destination}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 font-medium text-white/80 backdrop-blur-sm"
                    >
                      {destination}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 hidden rounded-2xl border border-white/15 bg-black/25 p-4 text-white backdrop-blur-xl lg:block">
            <p className="text-xs text-white/50">
              Currently exploring
            </p>

            <p className="mt-1 text-xl font-bold">
              {tourCount}+

              <span className="ml-1 text-sm font-normal text-white/60">
                experiences
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourHero;
