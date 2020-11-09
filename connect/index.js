function connect(sql,fn) {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xhy1998',
    database: 'my_db'
    })

    connection.connect()

    connection.query(sql,fn)

    connection.end()
}

function multiSql(sqls) {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xhy1998',
    database: 'my_db'
    })
    connection.connect()
    sqls.forEach(item => {
        connection.query(item.sql,item.fn)
    });
    
    connection.end()
}

module.exports = {
    connect,
    multiSql
}