const mail = {

    message : document.querySelector('.message'),

    uri : "message",

    init: function() {
        const submit = document.querySelector('.cv__form');
        submit.addEventListener('submit', mail.controlMail);
        console.log(submit)
    },

    controlMail: function(event)
    {
        event.preventDefault();
        
        const name = document.querySelector('.cv__form__element-name').value;
        const email = document.querySelector('.cv__form__element-email').value;
        const text = document.querySelector('.cv__form__element-text').value;
        const checkbox = document.querySelector('.cv__form__element-checkbox').checked;
       // console.log(name);
        //console.log(email);
       // console.log(text);
       // console.log(checkbox);
        if (!name || !email || !text || checkbox === false) 
        {
            const contentMessage = 'Veuillez renseigner tous les champs'
            mail.erreurMessage(contentMessage);
            die;
        } 
 
        mail.sendMail(name,email,text,checkbox);
        
    },

    clearErrorMessage: function() {
        mail.message.classList.remove('error');
    },

    
    clearSuccessMessage: function() {
        mail.message.classList.remove('success');
    },

    sendMail: function(name,email,text,checkbox)
    {
        const data = {
            "name" : name,
            "email" : email,
            "text" : text,
            "checkbox" : checkbox
        }

        const config = {
            method: "POST",
            core: "cors",
            cache: "no-cache",
            body: JSON.stringify(data)
        }

        const fullUrl = app.apiUrl + mail.uri;
        fetch(fullUrl, config)
        .then(function(response){
            if (response.status == 201) {
                const contentMessage = 'Votre message a bien été envoyé'
                mail.successMessage(contentMessage);
                mail.cleanForm();

            } else {
                const contentMessage = 'Erreur lors de l\envoi du message'
                mail.erreurMessage(contentMessage);
                mail.cleanForm();
            }
            
        })


        
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