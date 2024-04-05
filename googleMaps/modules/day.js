// Function to create the itinerary card dynamically
function createItineraryCard() {
    const dayCard = document.createElement("div");
    dayCard.id = "dayCard";
    dayCard.textContent = "Itinerary Card"; // Set initial text content
    // Append the card to the body or any desired parent element
    document.body.appendChild(dayCard);
    console.log("Itinerary card created:", dayCard);
}

// Call the function to create the itinerary card
createItineraryCard();
