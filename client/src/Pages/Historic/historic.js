let currentPage = 1
const limit = 21 // same as the server limit
let totalCount = 0

async function loadPage(page) {
  try {
    // Fetch data from the server
    const response = await fetch(
      `/api/historic-sites?page=${page}&limit=${limit}`
    )
    const data = await response.json()
    totalCount = data.totalCount
    currentPage = page
    updateGallery(data.items)
    updatePaginationControls()
  } catch (error) {
    console.error("Error:", error)
  }
}

function updateGallery(items) {
  const gallery = document.getElementById("gallery")
  gallery.innerHTML = "" // Clear current items
  items.forEach((item) => {
    // Add code to display each item
    let wrapper = document.getElementById("gallery")
    let card = document.createElement("div")
    card.className = "publicart__card"

    let imgbox = document.createElement("div")
    imgbox.className = "publicart__card-imgbox"

    let img = document.createElement("img")
    img.src = item.pic_url

    let imgtitle = document.createElement("div")
    imgtitle.className = "publicart__card-imgtitle"
    // imgtitle.textContent = item.name;

    imgbox.appendChild(img)
    card.appendChild(imgbox)
    card.appendChild(imgtitle)

    let nameBox = createTextBox("Name:", item.name)
    let addressBox = createTextBox("Address:", item.address)
    let styleBox = createTextBox("Architecture Style:", item.architecture_style)
    let yearBox = createTextBox("Year Built:", item.construction_yr)

    card.appendChild(nameBox)
    card.appendChild(addressBox)
    card.appendChild(styleBox)
    card.appendChild(yearBox)

    wrapper.appendChild(card)
  })

  function createTextBox(heading, text) {
    let textBox = document.createElement("div")
    textBox.className = "publicart__card-textbox"

    let bodyHeading = document.createElement("div")
    bodyHeading.className = "publicart__card-bodyheading"
    bodyHeading.textContent = heading

    let bodyText = document.createElement("div")
    bodyText.className = "publicart__card-bodytext"
    bodyText.textContent = text

    textBox.appendChild(bodyHeading)
    textBox.appendChild(bodyText)

    return textBox
  }
}

function updatePaginationControls() {
  document.getElementById("currentPage").innerText = currentPage
  document.getElementById("totalPages").innerText = Math.ceil(
    totalCount / limit
  )
  // Add logic to enable/disable next/previous buttons
}

loadPage(currentPage)
