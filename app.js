// GitHub Gist API Setup
const GITHUB_API_URL = "https://api.github.com/gists";
const GITHUB_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"; // Replace with your GitHub token
const GIST_ID = "YOUR_GIST_ID"; // Replace with your Gist ID of 'data.json'

// Function to get data from Gist
async function getGistData() {
  try {
    const response = await fetch(`${GITHUB_API_URL}/${GIST_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    const data = await response.json();
    const gistContent = data.files['data.json'].content;
    return JSON.parse(gistContent);
  } catch (error) {
    console.error("Error fetching data from Gist:", error);
    return [];
  }
}

// Function to update Gist with new data
async function updateGistData(newData) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          'data.json': {
            content: JSON.stringify(newData, null, 2)
          }
        }
      })
    });
    const result = await response.json();
    console.log("Gist updated successfully:", result);
  } catch (error) {
    console.error("Error updating Gist:", error);
  }
}

// Load events from Gist and display
let events = [];

async function loadEvents() {
  events = await getGistData();
  displayEvents();
}

function addEvent() {
  const event = document.getElementById("event").value;
  if (event) {
    events.push(event);
    updateGistData(events);
    displayEvents();
  }
}

function displayEvents() {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "<h4>Your Events:</h4>";
  events.forEach(event => {
    eventList.innerHTML += `<p>${event}</p>`;
  });
}

// Load events when the page is loaded
loadEvents();
