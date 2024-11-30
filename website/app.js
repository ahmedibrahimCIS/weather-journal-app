const baseURL = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();



// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", generateData);

/* Function called by event listener */

function generateData(){
        
        const content = document.getElementById('feelings').value;
        let zipCode = document.getElementById('zip').value;
        //prevent empty data
        if (zipCode == '' || content == ''){
          alert("Please Input Data");
        }else{
        
        getData(baseURL , zipCode , apiKey)
        .then(function(data){
            console.log(data)
            postData('/weather' , {temp : data.main.temp , date:newDate , content : content});
        
        })
        .then(()=>{

          updateUI();
        })
  
}}

/* Function to GET Web API Data*/

const getData=async(baseURL,zipCode,apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
    try {   
    const data =await res.json();
    
    return data;
    }catch (error){  
    console.log("error",error);
    }   
}

/* Function to POST data */

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};

/* Function to GET Project Data */

const updateUI = async () => {
    const request = await fetch("/all");
    try {
      const FinalData = await request.json();
    
      date.innerHTML= `Date: ${FinalData.date}`;
      temp.innerHTML= `Temprature: ${FinalData.temp} °c`;
      content.innerHTML= `Feeling : ${FinalData.content}`;

    // after update the text field will be clear
    document.getElementById('feelings').value = '';
    document.getElementById('zip').value = '';

    } catch (error) {
      console.log("error", error);
    }
};

