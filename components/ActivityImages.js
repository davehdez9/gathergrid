'use client';

import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const ActivityImages = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    const imageUrl = images[0];

    return (
      <Gallery>
        <Item
          original={imageUrl}
          thumbnail={imageUrl}
          width="1200"
          height="800"
        >
          {({ ref, open }) => (
            <Image
              ref={ref}
              onClick={open}
              src={imageUrl}
              alt="Activity image"
              width={1200}
              height={800}
              className="w-full h-auto object-cover rounded-lg cursor-pointer"
            />
          )}
        </Item>
      </Gallery>
    );
  }

  return (
    <Gallery>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={image}
            className={index === 2 ? 'col-span-2' : ''}
          >
            <Item
              original={image}
              thumbnail={image}
              width="1200"
              height="800"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={image}
                  alt={`Activity image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
              )}
            </Item>
          </div>
        ))}
      </div>
    </Gallery>
  );
};

export default ActivityImages;