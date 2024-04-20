import React, { useEffect, useState } from "react"
import ArtItem from "./ArtItem"
import "./ItineraryCard.css"

export default function ItineraryCard() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/api/itinerary")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div id="card">
      {data.map((item, index) => (
        <ArtItem key={index} data={item} />
      ))}
    </div>
  )
}

// export default ItineraryCard
