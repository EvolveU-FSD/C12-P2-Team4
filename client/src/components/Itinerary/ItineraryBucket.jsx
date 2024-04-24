import React, { useEffect, useState } from "react";
import ArtItem from "./ArtItem";
import "./ItineraryBucket.css";

function ItineraryBucket() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/itinerary")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bucket">
      {data.map((item, index) => (
        <ArtItem key={index} data={item} />
      ))}
    </div>
  );
}

export default ItineraryBucket;
