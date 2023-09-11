//Global variables
var http = require('http'),
    fileSystem = require('fs'),
    port = 8080;
    url = require("url");
var listingData, server;
//request handler
var requestHandler = function (request, response) {
    var parsedUrl = url.parse(request.url);
    if (request.method === "GET" && parsedUrl.pathname === "/listings") {
        response.write(listingData);
    } else {
        response.statusCode = 404;
        response.write("BAD GATEWAY ERROR");
    }

    response.end();
};

//parse file from listing
fileSystem.readFile("listings.json", "utf8", function (err, data) {
    listingData = data;
    startServer();
});


//start server
function startServer() {
    server = http.createServer(requestHandler);
    server.listen(port, function () {
        console.log("Server listening on: http://127.0.0.1:" + port);
    });

}
