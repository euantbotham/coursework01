//outputs
const response = document.querySelector("#message");

//supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient("https://mnllxthenkjjryqvceom.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGx4dGhlbmtqanJ5cXZjZW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMzk0NDEsImV4cCI6MjAyOTYxNTQ0MX0.YDlFM_TgMR1hsWa9XBtq6yg6hSaY0KMBSfg2j8EkzQc");

//inputs q1
const reg = document.querySelector("#rego");
const make = document.querySelector("#make");
const model = document.querySelector("#model");
const colour = document.querySelector("#colour");
const owner = document.querySelector("#owner");

// inputs q2
const personid = document.querySelector("#personid");
const name = document.querySelector("#name");
const address = document.querySelector("#address");
const dob = document.querySelector("#dob");
const license = document.querySelector("#license");
const expire = document.querySelector("#expire");


//buttons
const add = document.querySelector("#Add");
const addOwner =  document.querySelector("#Add\\ owner");

//questions
const q1 = document.querySelector("#q1");
const q2 = document.querySelector("#q2");
q2.style.display = "none";

add.addEventListener("click" , () =>{
    if(allVehicle()){
        supabase.from("People").select().eq('Name', owner.value).then(({data,error}) =>{
            if(error){
                response.textContent = "Error"; 
            }else{
                if(data.length > 0){
                    supabase.from("Vehicles").insert({VehicleID: reg.value, Make: make.value, Model: model.value, Colour: colour.value,OwnerID : data.PersonID});
                }else{
                    q1.style.display = "none";
                    q2.style.display = "block";
                    addOwner.addEventListener("click" ,addOwnerclicked);
                    response.textContent = "enter personal details"
                }
            }
        });
    }else{
        response.textContent = "Error";
    }
});

async function addOwnerclicked() {
    if(allPerson()){
        console.log("here");
        try{
            await  supabase.from("People").insert({PersonID : personid.value, Name : name.value , Address: address.value, DOB : dob.value, LicenseNumber : license.value, ExpiryDate: expire.value});
            await supabase.from("Vehicles").insert({VehicleID: reg.value, Make: make.value, Model: model.value, Colour: colour.value,OwnerID : personid.value});
        } catch (error) {
            response.textContent = "Error";
        }
        response.textContent = "'Vehicle added successfully"
        q2.style.display = "none";
    }else{
        response.textContent = "Error";
    }
}


function allPerson(){
    let complete = true;
    if(personid.value.length ==0)
        complete = false;
    if(name.value.length ==0)
        complete = false;
    if(address.value.length==0)
        complete = false;
    if (dob.value.length ==0)
        complete = false;
    if (license.value.length ==0)
        complete = false;
    if (expire.value.length ==0)
        complete = false;
    return complete;
}





function allVehicle (){
    let complete = true;
    if(reg.value.length ==0)
        complete = false;
    if(make.value.length ==0)
        complete = false;
    if(model.value.length==0)
        complete = false;
    if (colour.value.length ==0)
        complete = false;
    if (owner.value.length ==0)
        complete = false;
    return complete;
}
