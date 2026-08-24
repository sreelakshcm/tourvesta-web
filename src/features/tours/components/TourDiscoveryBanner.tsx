import React from 'react';

const TourDiscoveryBanner: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-neutral-layout">

        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=85"
          alt="Mountain landscape"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-neutral-layout via-neutral-layout/80 to-transparent" />

        <div className="relative z-10 max-w-2xl px-7 py-16 sm:px-12 lg:px-16 lg:py-20">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Leave room for the unexpected
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Sometimes the best destination is the one you haven't
            discovered yet.
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
            Take a break from the usual. Explore somewhere different,
            try something new, and collect stories along the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TourDiscoveryBanner;
