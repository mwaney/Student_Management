import mysql from "mysql"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "studentms"
})

connection.connect(err => {
    if(err){
        console.log("Connection Error")
    }else {
        console.log("Connected")
    }
})

export default connection;