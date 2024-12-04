import { FC, useState } from 'react';

const GallerySection: FC<{ images: string[] }> = ({ images }) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section>
      <h2 className="text-3xl font-bold">Gallery</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative cursor-pointer"
            onClick={() => setLightboxImage(`/assets/img/tours/${img}`)}
          >
            {/* Image */}
            <img
              src={`/assets/img/tours/${img}`}
              alt={`Gallery ${idx}`}
              className="h-48 w-full rounded-lg object-cover shadow-md 
transition-transform duration-200 hover:scale-105 md:h-60"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg
bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <span className="font-bold text-white">View</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Lightbox"
            className="max-h-[90vh] max-w-3xl rounded-lg shadow-lg"
          />
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute right-5 top-5 text-3xl font-bold text-white"
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
