// const { date } = require("joi");

/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=a99947cad1fc2318badc6cdaa7bd2b03';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add slot that will be triggered when the generate button is clicked
document.getElementById('generate').addEventListener('click', () => {
    let feelings = document.getElementById('feelings').value;
    console.log(12);
    console.log(feelings);
    let zip = document.querySelector('#zip').value;
    if(!zip){
        alert("EMPTY zip code input!!");
        return; 
    }
    console.log(zip);
    getData(baseUrl, zip, apiKey)
    .then((data) => {
        postData('/add', {
            date: newDate,
            temp: data,
            feelings: feelings,
        });
    })
    .then(() => updateUI('/all'));
})

// Function to get the data from wheather api
const getData = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key)
    try {
  
      const data = await res.json();


      return data.main.temp;
    }  catch(error) {
      console.log("error", error);
    }
}


// Function to update the project's data using /add endpoint
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, 
    // Object contains metadata about req.
    {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),     
  });
    try {
      const newData = await response.json();
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    }
};


// Function to pull the data from the /all end point then update the UI
const updateUI = async (url)=>{

    const res = await fetch(url);
    try {
  
      const data = await res.json();
      document.querySelector('#date').innerHTML = data.date;
      console.log(data);
      document.querySelector('#temp').innerHTML = data.temp;
      document.querySelector('#content').innerHTML = data.feelings;

      return;
    }  catch(error) {
      console.log("error", error);
    }
}