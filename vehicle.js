import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient("https://mnllxthenkjjryqvceom.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGx4dGhlbmtqanJ5cXZjZW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMzk0NDEsImV4cCI6MjAyOTYxNTQ0MX0.YDlFM_TgMR1hsWa9XBtq6yg6hSaY0KMBSfg2j8EkzQc");

const message = document.querySelector("#message");
const result = document.querySelector("#results");
const regNo = document.querySelector("#rego");

document.querySelector("#submit").addEventListener("click" , ()=>{
    const reg = regNo.value;
    result.innerHTML = "";
    if(reg.length === 0){
        message.textContent = "Error";
    }else{
        supabase.from("Vehicles").select().eq('VehicleID' , reg).then(({data,error}) => {
            if(error){
                message.textContent = "Error";
            }else{
                if(data.length > 0){
                    const elem = document.createElement("div");
                    elem.innerHTML = 
                    `<p>VehicleID: ${data[0].VehicleID}</p>
                    <p>Make: ${data[0].Make}</p>
                    <p>Model: ${data[0].Model}</p>
                    <p>Colour: ${data[0].Colour}</p>
                    <p>Owner ID: ${data[0].OwnerID}</p>`;
                    elem.classList.add("resultDiv");
                    result.appendChild(elem);
                    message.textContent = "Search successful";
                }else{
                    message.textContent = "No result found";
                }
            }
        }).catch(error =>{
            message.textContent = "Error connecting to the server";
        })
    }
})