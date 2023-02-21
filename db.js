const sqlite3 = require("sqlite3").verbose();

// to connect database we need to open connect
const db = new sqlite3.Database("./loans.db", (error)  => {
    if(error) {
        console.lod("Unable to connect DB")
    } else {

    console.log("DB connected.......");
    }
});

module.exports = db;


// db.serialize(function () {
    // get all applications from the loan table
    // SELECT * from loans;

   // db.each(`SELECT * from loans`, (error,dbRow) => {
     //   console.log("::ERROR::",error);
       // console.log("::DB ROW::",dbRow)
    //})

    //db.all(`Select into * from loans`, function(error,rows) {
       // console.log("All ROWS", rows);
   // })
   // })