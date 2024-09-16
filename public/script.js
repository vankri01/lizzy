document.getElementById('itineraryForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  // Getting form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const travelDates = document.getElementById('travelDates').value;
  const tripDuration = document.getElementById('tripDuration').value;
  const destination = document.getElementById('destination').value; // Added destination
  const budgetFood = document.getElementById('budgetFood').value; // Added budget for food
  const budgetActivities = document.getElementById('budgetActivities').value; // Added budget for activities
  const interests = document.getElementById('interests').value;

  // POST request to the server
  const response = await fetch('http://localhost:5500/api/itinerary/generate', { // Full path including '/api/itinerary'
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, travelDates, tripDuration, destination, budgetFood, budgetActivities, interests }),  // budget ratios and interests included
  });

  // Handling the response
  const data = await response.json();
  const resultDiv = document.getElementById('result');
  if (response.ok) {
    resultDiv.innerHTML = `
      <h2>Your Itinerary for ${data.destination}</h2>
      <p>Weather: ${data.weather.weather[0].description}</p>
      <h3>Suggested Activities</h3>
      <ul>
        ${data.activities.map(activity => `<li>${activity}</li>`).join('')}
      </ul>
      <h3>Food Preferences</h3>
      <ul>
        ${data.foodPreferences.map(food => `<li>${food}</li>`).join('')}
      </ul>
    `;
  } else {
    resultDiv.innerHTML = `<p>Error generating itinerary: ${data.message}</p>`;
  }
});








  

