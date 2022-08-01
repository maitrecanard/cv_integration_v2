const app = {

    //apiUrl: "https://mathieusiaudeau.fr/api/",
    apiUrl: "http://localhost:8080/api/",

    init: function()
    {
        blog.init();
        cv.init();
    }
}

app.init();