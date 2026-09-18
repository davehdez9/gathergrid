'use client'

import { useEffect, useState } from "react"
import geocodeLocation from "@/app/actions/geocodeLocation"
import Map, { Marker } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"

const ActivityMap = ({ location }) => {
    const [coordinates, setCoordinates] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const result = await geocodeLocation(location)
                setCoordinates(result)
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchCoordinates()
    }, [location])

    if (loading) {
        return (
            <div className="flex h-80 items-center justify-center bg-gray-100 sm:h-96">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />

                    <p className="mt-3 text-sm font-medium text-gray-500">
                        Loading map...
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex h-80 items-center justify-center bg-gray-100 px-6 text-center sm:h-96">
                <div>
                    <p className="font-semibold text-gray-900">
                        Map unavailable
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        No location data was found for this activity.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-80 w-full sm:h-96">
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={{
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    zoom: 14,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
            >
                <Marker
                    latitude={coordinates.lat}
                    longitude={coordinates.lng}
                    anchor="center"
                >
                    <div
                        className="h-5 w-5 rounded-full border-4 border-white bg-gray-900 shadow-lg"
                        aria-label="Activity location"
                    />
                </Marker>
            </Map>
        </div>
    )
}

export default ActivityMap