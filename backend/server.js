const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// Handling Uncaught Error 

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
   
})
// Config

dotenv.config({path:"backend/config/config.env"})

// connecting to database
connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port http://localhost:${process.env.PORT}`)
    app.get("/",(req,res)=>{
        res.send("<h1>Hello</h1>")
    })
})


// Unhandled Promise Rejection 
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })

})