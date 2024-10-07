// 1 import required modules
const http = require("http");

// minmic (database)

const employees = [
  {
    id:1,
    name:'Tushar',
  },
  {
    id:2,
    name:'Nikhil',
  }
]

// 2 Define the /handler
const requestHandler = (req, res) => {
  const {method,url} = req
  const parts = url.split('/');
  const id = parts[2];
  //! get all employess
  if(method==='GET' && url ==='/employees'){
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(employees));
  }
  // !get single employe
  else if(method ==='GET' && parts[1] ==='employees' && id){
    const employee = employees.find((emp) => emp.id === parseInt(id));
      if(employee){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(employee));
      }
      else{
        res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify({message : 'Not found'}));
      }
    }
    // !create new employe
    else if (method === 'POST' && url === '/employees'){
      let body = '';
      // listen to event of making post req
      req.on('data', (chunk)=>{
        body += chunk;
      });
      // send the respose
      req.on('end', ()=>{
        const newEmployee = JSON.parse(body)
        employees.push(newEmployee);
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify({
            newEmployee,
            employees,
        }));

      })
    }
  };

// 3 Create the server
const server = http.createServer(requestHandler);

// 4 Start the server

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
