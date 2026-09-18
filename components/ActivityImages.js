'use client'

import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

const ActivityImages = ({ images }) => {
  if (!images || images.length === 0) {
    return null
  }

  if (images.length === 1) {
    const imageUrl = images[0]

    return (
      <Gallery>
        <Item
          original={imageUrl}
          thumbnail={imageUrl}
          width="1200"
          height="800"
        >
          {({ ref, open }) => (
            <div className="group overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
              <Image
                ref={ref}
                onClick={open}
                src={imageUrl}
                alt="Activity image"
                width={1200}
                height={800}
                className="aspect-[16/9] w-full cursor-pointer object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            </div>
          )}
        </Item>
      </Gallery>
    )
  }

  return (
    <Gallery>
      <div className="grid gap-3 sm:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={
              images.length === 3 && index === 2
                ? 'sm:col-span-2'
                : ''
            }
          >
            <Item
              original={image}
              thumbnail={image}
              width="1200"
              height="800"
            >
              {({ ref, open }) => (
                <div className="group h-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                  <Image
                    ref={ref}
                    onClick={open}
                    src={image}
                    alt={`Activity image ${index + 1}`}
                    width={1200}
                    height={800}
                    className={`w-full cursor-pointer object-cover transition duration-300 group-hover:scale-[1.03] ${
                      images.length === 3 && index === 2
                        ? 'h-72 sm:h-96'
                        : 'h-64 sm:h-80'
                    }`}
                  />
                </div>
              )}
            </Item>
          </div>
        ))}
      </div>
    </Gallery>
  )
}

export default ActivityImages