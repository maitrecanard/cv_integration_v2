const liste = {
    init: function() {
        const form = document.querySelector('form');
      
        form.addEventListener('submit', liste.handlerAddList);        

        setInterval(liste.startListener, 1000);
    },

    handlerAddList: function(event){
        event.preventDefault();

        const valueListe = document.querySelector('#liste');
        const produit = valueListe.value;
  
        if(!produit)
        {
            document.querySelector('input').placeholder = "Veuillez renseigner un produit !";
        } else {
            const listeProduit = document.querySelector('ol')
            const myProduit = document.createElement('li');
            const input = document.createElement('input')
            myProduit.innerHTML = produit;
            myProduit.setAttribute("id", liste.slugify(produit));
            myProduit.setAttribute("class", "produit");
            input.setAttribute('type', 'hidden')
            input.classList.add('input__myself__list')
            listeProduit.append(myProduit,input);
            valueListe.value = "";
            liste.startButtonSave();
            
        };
    },

    popUpList: function(event) {
        event.preventDefault();
        const produit = event.currentTarget;
        const produitId = produit.id
        const popUp = document.querySelector('.popUp');
        const popUpContainer = document.querySelector('.popUp__container');
        const popUpContent = document.createElement('div');
        popUp.classList.remove('stop');
        popUpContent.classList.add('popUp__container__content');
        popUpContent.innerHTML = `
            <h2> ${produitId} </h2>
            <p>Article rajouté dans votre caddie ?</p>
            <button id="yes">Oui</button>
            <button id="dlc">Oui / ajouter une DLC</button>
            <button id="close">Fermer</button>
        `;

        popUpContainer.append(popUpContent);

        const close = document.querySelector('#close');
        close.addEventListener('click', liste.closePopUp);
    },

    startListener: function() {
        const produitList = document.querySelectorAll('.produit')
       // const save = document.querySelector('#save')
        for (const produit of produitList) {
           // produit.removeEventListener('click', liste.popUpList);
            produit.addEventListener('click', liste.popUpList);
        }
    },

    startButtonSave: function(){
        const main = document.querySelector('main')
        const produitList = document.querySelectorAll('#produit')
        const ifButtonExist = document.querySelector('#save')

        if(produitList)
        {
            if(!ifButtonExist) {
                const button= document.createElement('button')
                button.setAttribute('id', 'save')
                button.innerHTML = "Sauvegarder ma liste";
                main.appendChild(button);
                button.addEventListener('click', liste.saveList);
            }
        }

    },

    slugify: function(param) {
        return param.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    },

    closePopUp: function() {
        const popUp = document.querySelector('.popUp')
        const popUpContainer = document.querySelector('.popUp__container')
        const popUpContainerContent = document.querySelector('.popUp__container__content');
        popUpContainer.removeChild(popUpContainerContent);
        popUp.classList.toggle('stop');
    },

    saveList: function(event){
        event.preventDefault();
        //Save list in localStorage
        const li = document.querySelectorAll("input__myself__list")
        const list = li.value;
        console.log(li)
        const stringifiedLi =  JSON.stringify(li);
        
        localStorage.setItem('saveList', li);

   
    }
}

liste.init();