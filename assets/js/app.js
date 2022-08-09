const app = {

    //apiUrl: "https://mathieusiaudeau.fr/api/",
    apiUrl: "http://localhost:8080/api/",

    httpHeaders: new Headers(),

    init: function()
    {
        app.httpHeaders.append("Content-Type", "application/json");
        blog.init();
        //cv.init();
        mail.init();
        mentions.init();
    }
}

app.init();