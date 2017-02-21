module.exports = function(app) {
    
    var api = app.api.imageSearch;
    
    app.get('/api/imagesearch/:search', api.search);
    
    app.get('/api/latest/imagesearch', api.latest);
    
}