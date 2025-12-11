'use client';

import { useState } from 'react';

interface AuctionGalleryProps {
  images: string[];
  title: string;
}

export function AuctionGallery({ images, title }: AuctionGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={images[selectedIndex]}
          alt={title}
          className="h-full w-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              →
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 rounded bg-black/70 px-3 py-1 text-white text-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`h-20 w-20 flex-shrink-0 rounded border-2 overflow-hidden ${
                index === selectedIndex ? 'border-blue-600' : 'border-gray-200'
              }`}
            >
              <img src={image} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
