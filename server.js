const express = require('express');
const app = express();

app.listen(8080, function() {
    console.log('enter in 8080');
});

app.use(express.static('public'));

app.get('/mainStore', function(request, response) {
    response.sendFile(__dirname + '/mainStore.html')
})