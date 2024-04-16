import NavBar from "../../components/ReusableComponents/NavBar";
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard";
import SearchBar from "../../components/ReusableComponents/SearchBar";
import CalgaryMap from "../../components/MapComponents/CalgaryMap";
import Footer from "../../components/Footer/Footer";
import Calendar from "../Calendar/CalendarTwo";

export default function Home() {
  return (
    <>
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className="side-bar">{/* <SideBar /> */}</div>
      <div className="calendar">
        <Calendar />
      </div>
      <div className="map-container">
        <div className="itinerary">
          <ItineraryCard />
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="map">
          <CalgaryMap />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
