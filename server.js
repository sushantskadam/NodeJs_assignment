const http = require('http')
const fs = require('fs')
const qs= require('querystring')
// import http from 'http'
// import fs from 'fs'
// import bodyParser from 'bodyParser'
http.createServer((req,res)=>{
    // console.log(req.method)
    if(req.method === "GET" && req.url==="/")
    {
        
        
            // res.writeHead(200,{'Content-Type':'Text/html'});
            // fs.readFile('./empdetails.txt',(err,data)=>{
            //     if(err) throw err
            //     const obj = JSON.parse(data);
            //     console.log(obj)
            //     res.write(data)
            //     res.end("<form action='/addemp'><button>Add Employe</button></form>")
            // })
            const data = JSON.parse(fs.readFileSync('empdetails.txt').toString())
            const empshow=fs.readFileSync('empshow.txt').toString()
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(empshow)
            res.write('<table class="table"><thead class="thead-dark"><tr><th>#</th><th>Name</th><th>Age</th><th>City</th><th>Salary</th></tr><thead><tbody class="thead-light>')
            data.map((item,index)=>{
                return(
                res.write(`<tr class="table"><td>${index+1}</td><td>${item.name}</td><td>${item.age}</td><td>${item.city}</td><td>${item.salary}</td></tr>`))
            })
            res.write('</tbody></table> <br/>')
            res.end(' </div></body></html>')
        // fs.readFile('./empdetails.txt',(err,data)=>{
        //     if(err) throw err
        //     data.map((emp)=>(
        //         res.write(emp.ename)
        //     ))
            
        //     res.end()
        // })
    }
    // else if (req.method == "GET" && req.url == '/addemployee') {
    //     const data = fs.readFileSync('./index.html').toString()
    //     res.writeHead(200, { 'Content-Type': 'text/html' })
    //     res.write(data)
    //     res.end()
    // }

    else if(req.method == "GET" && req.url == '/addemployee'){
       
        const data = fs.readFileSync('index.html').toString()
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        res.end()
       
        

    }
    else if(req.method === "POST" && req.url==="/addemployee"){
        var body = "";
        req.on('data', function (chunk) {
            
          body += chunk;
        });
        console.log(body)
        req.on('end', function () {
          console.log('POSTed: ' + body);
          const data=body.split("&")
          console.log(data)
          const dataset=[]
          data.map(item=>{
              const itemdata=item.split('=')
              dataset.push(itemdata)
              
         }) 
         console.log(dataset)
         console.log(dataset[0][1])
         const datapush=(JSON.parse('{'+'"'+dataset[0][0]+'"'+':'+'"'+dataset[0][1]+'"'+','+'"'+dataset[1][0]+'"'+':'+'"'+dataset[1][1]+'"'+','+'"'+dataset[2][0]+'"'+':'+'"'+dataset[2][1]+'"'+','+'"'+dataset[3][0]+'"'+':'+'"'+dataset[3][1]+'"'+'}'))
         console.log(datapush)
         const empdata = JSON.parse(fs.readFileSync('empdetails.txt').toString())
         empdata.push(datapush)
         fs.writeFileSync('empdetails.txt',JSON.stringify(empdata)) 

        })
        res.end('<h1 style="margin:20px">Employee Registerd</h1>  <a  class="btn btn-primary" href="/">Go Home</a>')

        //     let rawData =""
    //     req.on('data', data => rawData+=data).on('end',()=>{
            
    //        let postdata= qs.parse(rawData)
    //         res.writeHead(200,{'Content-Type':'Text/html'});
    //    res.end(`<h1>Email: ${postdata.email} <br/> Contact No: ${postdata.contactno}  <br/> Password: ${postdata.password} </h1>`)
    //     })
        
        

    }
}).listen(6677)

// Server.use(bodyParser.urlencoded())