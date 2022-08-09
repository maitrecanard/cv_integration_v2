const mail = {

    message : document.querySelector('.message'),

    uri : "message",

    init: function() {
        const submit = document.querySelector('.cv__form');
        submit.addEventListener('submit', mail.controlMail);
    },

    controlMail: function(event)
    {
        event.preventDefault();
        
        const name = document.querySelector('.cv__form__element-name').value;
        const email = document.querySelector('.cv__form__element-email').value;
        const message = document.querySelector('.cv__form__element-text').value;
        const checkbox = document.querySelector('.cv__form__element-checkbox').checked;
       // console.log(name);
        //console.log(email);
       // console.log(text);
       // console.log(checkbox);
        if (!name || !email || !message || checkbox === false) 
        {
            const contentMessage = 'Veuillez renseigner tous les champs'
            mail.erreurMessage(contentMessage);
            die;
        } 
 
        mail.sendMail(name,email,message,checkbox);
        
    },

    clearErrorMessage: function() {
        mail.message.classList.remove('error');
    },

    
    clearSuccessMessage: function() {
        mail.message.classList.remove('success');
    },

    sendMail: function(name,email,message,checkbox)
    {
        const data = {
            "name" : name,
            "email" : email,
            "message" : message,
            "checkbox" : checkbox
        }

        const config = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: app.httpHeaders,
            body: JSON.stringify(data)
        }

        const fullUrl = app.apiUrl + mail.uri;
        fetch(fullUrl, config)
        .then(function(response){
            return  response.json();
        })
        .then(
            function(message)
            {
               if (message === 201)
               {
                const success = "Votre message a bien été envoyé  (Vérifier vos spams)";
                    mail.successMessage(success);

                    mail.cleanForm();
               } else 
               {
                console.log(message['error'])

                   mail.erreurMessage(message['error']);
                   mail.cleanForm();
               }
            });

        
    },

    erreurMessage: function(content) {
        mail.message.textContent = content;
        mail.message.classList.add('error');
        setTimeout(mail.clearErrorMessage, 3000);
    },

    successMessage: function(content) {
        mail.message.textContent = content;
        mail.message.classList.add('success');
        setTimeout(mail.clearSuccessMessage, 3000);
    },

    cleanForm: function()
    {
        const form = document.querySelector('.cv__form');
        form.reset();
    }

}