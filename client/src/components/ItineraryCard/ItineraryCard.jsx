import userModel from "../../../../server/models/userModel"
import "./ItineraryCard.css"
import artPic from "../../assets/images/publicart/bears.jpg"

export default function ItineraryCard() {
  return (
    <div className="card">
      <img src={artPic} alt="Place to see"></img>
      <h2>Day: {userModel.firstname}</h2>
      <h3>User: {userModel.firstname}</h3>
      <p>Place to visit</p>
    </div>
  )
}
