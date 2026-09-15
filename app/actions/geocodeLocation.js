'use server'

const geocodeLocation = async (location) => {
    if (!location || !location.trim()) {
        throw new Error('Location is required')
    }

    const apiKey = process.env.GOOGLE_GEOCODING_API_KEY

    if (!apiKey) {
        throw new Error('Geocoding service is not configured')
    }

    const cleanedLocation = location.trim()

    const encodedLocation = encodeURIComponent(cleanedLocation)

    const url =
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`

    let response

    try {
        response = await fetch(url)
    } catch {
        throw new Error('Unable to reach the geocoding service ')
    }

    if (!response.ok) {
        throw new Error('Geocoding request failed')
    }

    const data = await response.json()

    if (data.status === 'ZERO_RESULTS') {
      throw new Error('Location not found')  
    }

    if (data.status !== 'OK') {
        throw new Error('Geocoding Service returned an error ')
    }

    if (!data.results?.length) {
        throw new Error('Location not found')
    }

    const { lat, lng } = data.results[0].geometry.location

    return {
        lat,
        lng,
    }
}

export default geocodeLocation
