const API_KEY = 'live_QP9b4cdh2TDR0vi6BrVjADCefkppQDtVWK0X5hbpbu0S28LzagstPqw';
const fetchCatButton = document.getElementById('fetchCatButton');
const catImage = document.getElementById('catImage');
const catInfo = document.getElementById('catInfo');

fetchCatButton.addEventListener('click', () => {
  console.log('Button clicked, fetching cat data...');  // Debugging log

  fetch('https://api.thecatapi.com/v1/images/search', {
    headers: {
      'x-api-key':'live_QP9b4cdh2TDR0vi6BrVjADCefkppQDtVWK0X5hbpbu0S28LzagstPqw' ,
    },
  })
    .then(response => {
      if (!response.ok) {
        console.error('Failed to fetch cat data:', response.status);  // Log error status
        throw new Error('Failed to fetch cat data');
      }
      return response.json();
    })
    .then(data => {
      console.log('Cat data received:', data);  // Debugging log

      const cat = data[0];
      catImage.src = cat.url;  // Display random cat image

      // Check if breed information is available
      if (cat.breeds && cat.breeds.length > 0) {
        const breed = cat.breeds[0];  // Assuming the first breed is the most relevant
        catInfo.innerHTML = `
          <strong>Breed:</strong> ${breed.name} <br>
          <strong>Temperament:</strong> ${breed.temperament} <br>
          <strong>Description:</strong> ${breed.description}
        `;
      } else {
        catInfo.innerHTML = `
          <strong>Breed:</strong> Unknown <br>
          <strong>Temperament:</strong> Unknown <br>
          <strong>Description:</strong> Unknown
        `;
        console.log('No breed data available for this cat.');
      }
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);  // Log errors
      catInfo.textContent = 'Failed to load cat data. Please try again later.';
    });
});
