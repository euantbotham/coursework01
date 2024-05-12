const namebox = document.querySelector("#name");
const liscencebox = document.querySelector("#liscense");
const message = document.querySelector("#message");
const result = document.querySelector("#results");

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient("https://mnllxthenkjjryqvceom.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGx4dGhlbmtqanJ5cXZjZW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMzk0NDEsImV4cCI6MjAyOTYxNTQ0MX0.YDlFM_TgMR1hsWa9XBtq6yg6hSaY0KMBSfg2j8EkzQc");


document.querySelector("#submit").addEventListener("click", () => {
    const name = namebox.value;
    const liscence = liscencebox.value;
    result.innerHTML = "";
    /* not filled out */
    if(name.length === 0 && liscence.length === 0){
        message.textContent = "Error";
    }else if(name.length !== 0 && liscence.length !== 0){
        message.textContent = "Error";
    }else if(name.length !== 0){
        supabase.from('People').select().ilike('Name', `%${name}%`).then(({data,error}) => {
        if(error){
            message.textContent = "Error";
        }else{
            if(data.length >0){
              addElems(data);
            }else{
                message.textContent = "No result found";
            }
        }
    })
    .catch(error =>{
        message.textContent = "Error connecting to server";
    });
    }else{
        console.log(liscence);
        supabase.from('People').select().eq('LicenseNumber', `${liscence}`).then(({data,error}) => {
            if(error){
                message.textContent = "Error";
            }else{
                if(data.length >0){
                    addElems(data);
                }else{
                    message.textContent = "No result found";
                }
                
            }
        }).catch(error=> {
            message.textContent = "Error connecting to server";
        });
    }
});


function addElems (data){
    message.textContent = "Search successful";
    data.forEach(person =>{
        const elem = document.createElement("div");
        elem.innerHTML = `<p>Person ID: ${person.PersonID}</p>
        <p>Name: ${person.Name}</p>
        <p>Address: ${person.Address}</p>
        <p>DOB: ${person.DOB}</p>
        <p>License number: ${person.LicenseNumber}</p>
        <p>Expiry date: ${person.ExpiryDate}</p>`;
        elem.classList.add("resultDiv");
        result.appendChild(elem);
    });
}