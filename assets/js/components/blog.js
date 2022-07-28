const blog = {

    apiUrl: "https://mathieusiaudeau.fr/api",

    uri:"blog",

    init: function() {
        blog.loadBlog();
    },

    loadBlog: function() {
        const config = {
            method: "GET",
            mode:"cors",
            cache:"no-cache"
        };

        const fullUrl = blog.apiUrl + '/' + blog.uri;
        fetch(fullUrl, config)
        .then(
            function(response){
                return response.json();
            }
        )
        .then(
            function(data){
                console.log(data);
                for(const blog of data)
                {
                    blog.blogTemplate();
                }
            }
        )
    },

    blogTemplate: function(){
        const blogTemplate = document.querySelector('#blog');
        const documentFragment = blogTemplate.content.cloneNode(true);
        const blog = documentFragment.firstElementChild;
    }
}