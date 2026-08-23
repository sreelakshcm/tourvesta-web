import { FC } from 'react';

const AboutUs: FC = () => {
  const features = [
    {
      number: '01',
      title: 'Discover',
      description:
        'Explore destinations and experiences that turn a simple trip into something worth remembering.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
          />
          <circle cx="12" cy="9" r="2.5" strokeWidth={1.8} />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Plan',
      description:
        'Bring your travel ideas together in one place and make planning your next adventure simpler.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M8 7V3m8 4V3M4 10h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
          />
          <path
            strokeLinecap="round"
            strokeWidth={1.8}
            d="M8 14h2m4 0h2M8 18h2"
          />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Experience',
      description:
        'Make more informed choices with reviews, curated experiences, and a travel experience designed around you.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8L4 8.8h6.1L12 3z"
          />
        </svg>
      ),
    },
  ];

  const highlights = [
    {
      value: '01',
      title: 'Simple by design',
      description:
        'Travel planning should feel exciting, not complicated. Tourvesta keeps the experience focused and intuitive.',
    },
    {
      value: '02',
      title: 'Built around people',
      description:
        'Real experiences and traveler feedback help create a more useful and engaging discovery journey.',
    },
    {
      value: '03',
      title: 'Always evolving',
      description:
        'Tourvesta is continuously growing with new ideas, features, and smarter ways to make travel easier.',
    },
  ];

  return (
    <main className="min-h-screen bg-backgroundLight text-fontLight transition-colors duration-300 dark:bg-backgroundDark dark:text-fontDark">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary-extraLight blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-secondary-light opacity-20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            {/* Hero content */}
            <div className="animate-fadeInDown">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-extraLight px-4 py-2 text-sm font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Welcome to Tourvesta
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
                Travel more.
                <span className="block text-primary">Experience more.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-gray-600 dark:text-mutedDark sm:text-lg sm:leading-8">
                Tourvesta is a modern travel platform created to make
                discovering, planning, and experiencing your next journey
                simpler, smarter, and more enjoyable.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="/tours"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
                >
                  Start exploring
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14m-6-6l6 6-6 6"
                    />
                  </svg>
                </a>

                <a
                  href="#our-story"
                  className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-fontDark"
                >
                  Our story
                </a>
              </div>

              {/* Mini stats */}
              <div className="mt-12 flex flex-wrap gap-8 border-t border-gray-200 pt-7 dark:border-white/10">
                <div>
                  <p className="text-2xl font-bold text-primary">Travel</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-mutedDark">
                    Discovery made simple
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-secondary">Explore</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-mutedDark">
                    Experiences worth finding
                  </p>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative animate-fadeIn">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-white/5">
                <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] sm:h-[500px]">
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"
                    alt="Beautiful mountain travel destination"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-xl backdrop-blur-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        Your next adventure
                      </p>
                      <p className="mt-2 text-xl font-bold">
                        Somewhere worth remembering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-neutral-layout sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 3v18M3 12h18"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Discover freely
                    </p>
                    <p className="text-xs text-gray-500 dark:text-mutedDark">
                      Your journey, your way
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Tourvesta */}
      <section
        id="our-story"
        className="border-y border-gray-100 bg-gray-50/70 py-20 dark:border-white/5 dark:bg-white/[0.02] lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                Our story
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Built for the way people travel today.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-gray-600 dark:text-mutedDark sm:text-lg">
              <p>
                Tourvesta started as a simple idea: travel discovery should be
                enjoyable from the very first click. Instead of jumping between
                different platforms, travelers should be able to discover
                places, explore experiences, and make decisions from one
                intuitive space.
              </p>

              <p>
                Tourvesta is a proof-of-concept travel platform built to explore
                that idea through a modern digital experience. It brings
                together tour discovery, account management, reviews, and
                role-based functionality into one application.
              </p>

              <p>
                More than a finished destination, Tourvesta is an evolving
                product experiment — continuously shaped by new ideas,
                technology, and the simple question of how we can make travel
                planning better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discover / Plan / Experience */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              The Tourvesta experience
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From inspiration to experience.
            </h2>

            <p className="mt-5 text-gray-600 dark:text-mutedDark">
              Everything starts with curiosity. Tourvesta is designed to help
              turn that curiosity into a journey.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="absolute right-5 top-4 text-6xl font-black text-gray-100 dark:text-white/[0.04]">
                  {feature.number}
                </div>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-extraLight text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {feature.icon}
                  </div>

                  <h3 className="mt-7 text-xl font-bold">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-gray-600 dark:text-mutedDark">
                    {feature.description}
                  </p>

                  <div className="mt-7 h-1 w-10 rounded-full bg-primary transition-all duration-300 group-hover:w-20" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight banner */}
      <section className="px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-neutral-layout">
          <div className="grid items-center lg:grid-cols-[1fr_0.8fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                More than a destination
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                The best journeys are the ones you remember.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-white/65">
                Whether you're searching for your next escape or simply looking
                for inspiration, Tourvesta is designed to put the excitement
                back into travel planning.
              </p>

              <a
                href="/tours"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
              >
                Explore Tourvesta
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-6-6l6 6-6 6"
                  />
                </svg>
              </a>
            </div>

            <div className="relative hidden h-full min-h-[400px] lg:block">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85"
                alt="Scenic travel landscape"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-neutral-layout via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.value}
                className="rounded-3xl border border-gray-200 p-7 dark:border-white/10"
              >
                <span
                  className={`text-sm font-bold ${
                    index === 1 ? 'text-secondary' : 'text-primary'
                  }`}
                >
                  {item.value}
                </span>

                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-7 text-gray-600 dark:text-mutedDark">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-primary px-6 py-14 text-center shadow-2xl shadow-primary/20 sm:px-12 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              Your journey starts here
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Where will you go next?
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/75">
              Discover new places, find experiences that excite you, and start
              planning a journey you'll want to remember.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/tours"
                className="rounded-xl bg-white px-7 py-3.5 font-bold text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Explore destinations
              </a>

              <a
                href="mailto:sreelakshcm@gmail.com"
                className="rounded-xl border border-white/30 px-7 py-3.5 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="border-t border-gray-100 py-8 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-center text-sm text-gray-500 dark:text-mutedDark sm:flex-row sm:px-8 sm:text-left lg:px-10">
          <p>
            © {new Date().getFullYear()} Tourvesta. Built as a developer
            portfolio project.
          </p>

          <a
            href="mailto:sreelakshcm@gmail.com"
            className="font-medium text-primary transition-colors hover:text-primary-hover"
          >
            sreelakshcm@gmail.com
          </a>
        </div>
      </footer>
    </main>
  );
};

export default AboutUs;
