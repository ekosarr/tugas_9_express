let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '',
    database : '09_latihan',
});

connection.connect(function (error){
    if (!!error){
        console.log(error);
    }else{
        console.log('koneksi success');
    }
});

module.exports = connection;