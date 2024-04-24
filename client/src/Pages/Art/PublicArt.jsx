import { useEffect, useState, useContext } from "react";
import "./PublicArt.css";
const [loadError, setLoadError] = useState(null);
import { AuthContext } from "../../components/Auth/AuthProvider";
import NavBar from "../../components/ReusableComponents/NavBar";
import Footer from "../../components/Footer/Footer";
import DateTimeModal from "../../components/Itinerary/DateTimeModal";

function PublicArt() {
  const { auth } = useContext(AuthContext);
  const [artData, setArtData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalArtItem, setModalArtItem] = useState(null);
  const [eventData, setEventData] = useState({
    date: "",
    username: "",
    eventTime: "",
    eventTitle: "",
    place: "",
    description: "",
  });

  useEffect(() => {
    const fetchArtData = async () => {
      try {
        const response = await fetch("api/public-art");
        const data = await response.json();
        setArtData(data);
      } catch (error) {
        console.error("Error occurred while fetching art data:", error);
      }
    };

    fetchArtData();
  }, []);

  const handleArtItemPost = async (artItem, date, time) => {
    if (!auth || !auth.accessToken) {
      setModalType("signin");
      setShowModal(true);
      return;
    }
    try {
      console.log("1. EventData: ", eventData);
      console.log("2. User:....", auth.user);

      const response = await fetch("/api/dayevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({
          ...eventData,
          eventTitle: artItem ? artItem.title : eventData.eventTitle,
          lat: artItem ? artItem.lat : null,
          lng: artItem ? artItem.lng : null,
          date: date,
          eventTime: time,
          email: eventData.email,
        }),
      });
      if (!response.ok) {
        throw new Error("Event creation failed...");
      }
      console.log("Event created successfully:", await response.json());
      closeModal();
    } catch (error) {
      console.error("Event creation error:", error);
      setLoadError(error.message);
    }
  };

  const handleAddToItinerary = async (art) => {
    // Create a new object with only the title and coordinates
    const artToSave = {
      eventTitle: art.title,
      lat: art.point.coordinates[1],
      lng: art.point.coordinates[0],
    };

    // Show the modal and save the art item
    setModalArtItem(artToSave);
    setShowModal(true);
  };

  // Call this function when the modal is confirmed
  const handleModalConfirm = (date, time) => {
    handleArtItemPost(modalArtItem, date, time);
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
      <DateTimeModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleModalConfirm}
      />
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
  );
}

export default PublicArt;
