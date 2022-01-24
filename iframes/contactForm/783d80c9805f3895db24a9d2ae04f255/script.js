 document.getElementById("submit").addEventListener("click", () => {
     let errors = [];
     let name = document.getElementById("name").value;
     let email = document.getElementById("email").value;
     let message = document.getElementById("message").value;
     let success = false;

     let fields = document.getElementsByClassName("input-field");
     for (let el of fields) {
         el.classList.remove("error");
     }

     if (name === "") errors.push("name");
     if (email === "") errors.push("email");
     if (message === "") errors.push("message");
     //console.log(errors);
     if (errors.length === 0) {
         Email.send({
             SecureToken: "91d94f52-3aa5-48d7-9f50-e15be2cdc264",
             To: "office@everyonecodes.academy",
             From: "hi@xschoenberger.com",
             Subject: `Contact Request from ${name}`,
             Body: `<h1 style="margin: 0; padding:10px 10px 0px 10px;">Contact Request</h1><small style="font-style:italic;font-weight:bold;color:grey;padding: 0px 10px 10px 10px;">from ${name}</small><p style="padding: 10px;">${message}</p><small style="padding: 10px;">entered email: ${email}</small>`,
         }).then((message) => {
             if (message === "OK") {
                 success = true;
                 document.getElementById("form").style.display = "none";
                 document.getElementById("success").style.display = "block";
             }
         });
     } else {
         for (let er of errors) {
             document.getElementById(er).classList.add("error");
         }
     }
 });