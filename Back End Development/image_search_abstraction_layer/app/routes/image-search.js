module.exports = function(app) {
    
    app.get('/api/imagesearch/:search', function(req, res) {
        console.log('Image search request received');
        console.log('Search parameter: ' + req.params.search);
        if(req.query.offset) {
            console.log('Offset: ' + req.query.offset);  
        }
        res.send('OK');
    });
    
    app.get('/api/latest/imagesearch', function(req, res) {
        console.log('Latest image search request received');
        res.send('OK');
    });
    
}