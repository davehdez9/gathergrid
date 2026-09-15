'use client'

import { useEffect, useState } from "react"
import geocodeLocation from "@/app/actions/geocodeLocation"
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

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
        return <p>Loading map...</p>
    }

    if (error) {
        return <p>No location data found</p>
    }

    return (
        <div className="mt-8 overflow-hidden rounded-lg">
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={{
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    zoom: 14,
                }}
                style={{
                    width: "100%",
                    height: "400px",
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
            >
                <Marker
                    latitude={coordinates.lat}
                    longitude={coordinates.lng}
                    anchor="bottom"
                />
            </Map>
        </div>
    )
}

export default ActivityMap