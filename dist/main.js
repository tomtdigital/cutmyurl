// Information to reach API
const apiKey = 'd4e41ab9dbc54dfa889abf2726667aa9';
const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

// AJAX functions
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  fetch(url, {
    method : 'POST',
    headers : {
    'Content-type' : 'application/json',
    'apikey' : apiKey
  },
  	body : data,
  }).then(
  response => {
    if (response.ok) {
     	return response.json();
    } throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message);
  }).then(
    jsonResponse => {
      renderResponse(jsonResponse)
    })
}

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild)
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);

// Manipulates responseField to render a formatted and appropriate message
const renderResponse = (res) => {
  // Displays either message depending on results
  if(res.errors){
    responseField.innerHTML = "<p>Sorry, we couldn't format your URL.<br><br>Try again.</p>";
  } else {  
    responseField.innerHTML = `<p>Your shortened url is: <br><br> ${res.shortUrl} </p>`;
  }
}