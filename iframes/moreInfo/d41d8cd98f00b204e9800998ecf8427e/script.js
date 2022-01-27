 document.getElementById('close').addEventListener("click", () => {
     document.getElementById('email-prompt').style.display = 'none';
     document.getElementById('open').style.display = 'block';
 })

 document.getElementById('open').addEventListener("click", () => {
     document.getElementById('email-prompt').style.display = 'flex';
     document.getElementById('open').style.display = 'none';
 })


 document.getElementById("send").addEventListener("click", () => {
     let errors = [];

     // get all values from form
     let email = document.getElementById("email").value;
     let accepted = document.getElementById("accept").checked;

     let success = false;

     //clear all errors from inputs
     let fields = document.getElementsByClassName("input");
     for (let el of fields) {
         el.classList.remove("error");
     }

     //check for empty fields
     if (email === "") errors.push("email");
     if (!accepted) errors.push("accept");

     if (errors.length === 0) {

         //send email with input information using smtp.js
         Email.send({
             SecureToken: "91d94f52-3aa5-48d7-9f50-e15be2cdc264",
             To: "office@everyonecodes.io",
             From: "hi@xschoenberger.com",
             Subject: `Contact Request from `,
             Body: `<h1 style="margin: 0; padding:10px 10px 0px 10px;">Contact Request</h1><small style="font-style:italic;font-weight:bold;color:grey;padding: 0px 10px 10px 10px;">from ${name}</small><p style="padding: 10px;">${accepted}</p><small style="padding: 10px;">entered email: ${email}</small>`,
         }).then((message) => {
             if (message === "OK") { //on successfull send
                 success = true;
                 document.getElementById("form").style.display = "none"; //hide form
                 document.getElementById("success").style.display = "block"; //show success message
             }
         });
     } else {
         console.log(errors)
         for (let er of errors) { //add error class to every wrong field
             document.getElementById(er).classList.add("error");
         }
     }
 });