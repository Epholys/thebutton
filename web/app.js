var app         = require('express')(),
    serveStatic = require('serve-static'),
    logger      = require('morgan');
    
var http        = require('http').Server(app),
    fs          = require('fs');

var io          = require('socket.io')(http);


var count   = fs.readFileSync(__dirname+'/count.db', 'utf8');
var counter = 0;
var interval;
var switcher;


app.use(logger('common'));
app.use('/', serveStatic(__dirname));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/count', function(req, res) {
    res.status(200).send(count);
});



io.on('connection', function(socket){

    socket.on('click', function() {

        if(!switcher) {
            count++;
            fs.writeFile(__dirname+'/count.db', count);
            io.emit('confirm click', count);
            switcher = true;
            counter = 100;

            interval = setInterval(function() {
                counter--;
                io.emit('tick', counter);
                if(counter == 0) {
                    clearInterval(interval);
                    counter = 100;
                    io.emit('reset');
                    switcher = false;
                }
            },
                                   10);

        }
    });
});



http.listen(3001);