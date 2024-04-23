import { useEffect, useState } from "react"
import "./PublicArt.css"
import NavBar from "../../components/ReusableComponents/NavBar"
import Footer from "../../components/Footer/Footer"

function PublicArt() {
  const [artData, setArtData] = useState([])

  useEffect(() => {
    const fetchArtData = async () => {
      try {
        const response = await fetch("api/public-art")
        const data = await response.json()
        setArtData(data)
      } catch (error) {
        console.error("Error occurred while fetching art data:", error)
      }
    }

    fetchArtData()
  }, [])

  const handleAddToItinerary = async (art) => {
    // Create a new object with only the title and coordinates
    const artToSave = {
      title: art.title,
      lat: art.point.coordinates[1],
      lng: art.point.coordinates[0],
    }

    // Add the selected art to the itinerary
    const response = await fetch("/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artToSave),
    })
    const data = await response.json()
    console.log(data) // Log the saved itinerary item
  }

  return (
    <>
      <NavBar />
      <div className="wrapper bg-secondary-gold">
        <div className="gallery">
          {artData.map((art) => (
            <div className="publicart__card" key={art.title}>
              <div className="top">
                <div className="publicart__card-imgbox">
                  <img src={`/assets/${art.imgpath}`} alt={art.title} />
                  <div className="publicart__card-imgtitle">{art.title}</div>
                </div>
                <div className="publicart__card-textbox">
                  <div className="publicart__card-bodyheading">Artist:</div>
                  <div className="publicart__card-bodytext">{art.artist}</div>
                  <div className="publicart__card-bodyheading">Adress:</div>
                  <div className="publicart__card-bodytext">{art.address}</div>
                  <div className="publicart__card-bodyheading">
                    Description:
                  </div>
                  <div className="publicart__card-bodytext">
                    {art.short_desc}
                  </div>
                </div>
              </div>

              <button onClick={() => handleAddToItinerary(art)}>+ Add</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PublicArt
