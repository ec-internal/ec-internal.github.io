 document.getElementById("submit").addEventListener("click", () => {
     let location = window.location.hash;
     if (!location) {
         location = "no location defined"
     } else {
         location = location.substring(1);
     }

     let errors = [];

     // get all values from form
     let name = document.getElementById("name").value;
     let email = document.getElementById("email").value;
     let message = document.getElementById("message").value;

     let success = false;

     //clear all errors from inputs
     let fields = document.getElementsByClassName("input-field");
     for (let el of fields) {
         el.classList.remove("error");
     }

     //check for empty fields
     if (name === "") errors.push("name");
     if (email === "") errors.push("email");
     if (message === "") errors.push("message");

     if (errors.length === 0) {

         //send email with input information using smtp.js
         Email.send({
             SecureToken: "91d94f52-3aa5-48d7-9f50-e15be2cdc264",
             To: "office@everyonecodes.io",
             From: "hi@xschoenberger.com",
             Subject: `Contact Request from ${name}`,
             Body: `<h1 style="margin: 0; padding:10px 10px 0px 10px;">Contact Request</h1><small style="font-style:italic;font-weight:bold;color:grey;padding: 0px 10px 10px 10px;">from ${name}</small><small style="font-style:italic;font-weight:bold;color:grey;padding: 0px 10px 10px 10px;">website location: ${location}</small><p style="padding: 10px;">${message}</p><small style="padding: 10px;">entered email: ${email}</small>`,
         }).then((message) => {
             if (message === "OK") { //on successfull send
                 success = true;
                 document.getElementById("form").style.display = "none"; //hide form
                 document.getElementById("success").style.display = "block"; //show success message
             }
         });
     } else {
         for (let er of errors) { //add error class to every wrong field
             document.getElementById(er).classList.add("error");
         }
     }
 });