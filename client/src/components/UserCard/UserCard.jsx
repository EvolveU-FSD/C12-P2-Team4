export function UserCard({ name, age, phoneNumber, address, profession }) {
  return (
    <div className="card">
      <h2 className="name">{name}</h2>
      <div className="body">
        <div className="label">Age: </div> <div>{age}</div>
        <div className="label">Phone: </div> <div>{phoneNumber}</div>
        <div className="label">Address: </div> <div>{address}</div>
        <div className="label">Profession: </div>
        <div>{profession}</div>
      </div>
    </div>
  )
}
//  UserCard.propTypes = {
//     name: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired,
//     phoneNumber: PropTypes.number.isRequired,
//     address: PropTypes.string.isRequired,
//     profession: PropTypes.string.isRequired,
//   }
// Ended on Video #16 --
