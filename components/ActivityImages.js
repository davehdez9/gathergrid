import Image from "next/image";

const ActivityImages = ({ images }) => {
    if (!images || images.length === 0) {
        return null
    }

    if (images.length === 1) {
        return (
            <div className="mb-6">
                <Image
                    src={images[0]}
                    alt="Activity Image"
                    width={1200}
                    height={800}
                    className="w-full h-96 object-cover rounded-lg"
                />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            {images.map((image, index) => (
                <Image
                    key={`${image}-${index}`}
                    src={image}
                    alt="Activity Image"
                    width={800}
                    height={600}
                    className={`w-full h-64 object-cover rounded-lg ${images.length === 3 && index === 2 ? 'col-span-2' : ''}`}
                />
            ))
            }
        </div>
    )
}

export default ActivityImages
