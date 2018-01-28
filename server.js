//node http library
const http = require("http");
//node url library
const url = require("url");
//creating our server so it can listen for to requests
const server = http.createServer();
//hard-coded data set
let messages = [
  { 'id': 1, 'user': 'sammy singer', 'message': 'over here!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' },
  { 'id': 4, 'user': 'delphene', 'message': 'maketh man' },
  { 'id': 5, 'user': 'monste', 'message': 'turnery operation' },
  { 'id': 6, 'user': 'bloom', 'message': 'wag dog here' }
];

const getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

const addMessage = (request, response) => {
  messages = [...messages, request];
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});


//server endpoint localhost:3000
server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

//
// server.on('request', (request, response) => {
//   //sends a response header to the request
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   //send a chunk of the response body
//   //may be called many times to provide different parts of the body
//   response.write('Hello There Kind Humans');
//   //signals to the server that all headers and bodies have been sent
//   response.end();
// });

// Status Codes:
// 200 range: request success!
// 300 range: redirect
// 400 range: you sent a poor request
// 500 range: server error not user

// RESTful API design
// (Representational State Transfer)
// Architectural Constraints
// 1) Client-server: seperation of GraphicalUserInterface and Data
// 2) Stateless: no client context is saved by the server
// 3) Cacheable: server response are cacheable or not
// 4) Layered system: Modularity, mulitple servers can handle a single request
// but user is unable to tell that their response went through muliple servers
// 5) Code on Demand: Look into this later...?
// 6) Uniform Interface: ability to identify resources and manipulate them

// Primary Methods call CRUD (Create, Read, Update, Destroy)
// 1) GET: retrieve resource information by request
// 2) POST: create a new resource
// 3) PUT: update a specfic resource in its entirety
// 4) PATCH: update a specific portion of a resource
// 5) DELETE: destroy an entire specific resource
