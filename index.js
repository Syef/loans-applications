const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db.js");

// creating an express application
const app = express();

// handling json body request
app.use(bodyParser.json() );

app.get('/', function(req,res) {
    res.json({
        status: true, 
    message: "Loans Api running successful"
});
});

// get all loan applications
app.get('/loans', function(req,res){
    
db.serialize(() => {
    //const selectQuery = `SELECT loan_id,firstname, lastname,loan_amount,
    //Purpose,status  from loans`
    const selectQuery = `SELECT * from loans`
    db.all(selectQuery,(error,rows) => {
        if(error) {
            res.json({
                status: false,
                error: error
            })
        } else {

            // 3 types of method any one use
            
            for(let i=0; i < rows.length; i++) {
            delete rows[i].email;
            }

            let index=0;
            while(index < rows.length) {
                delete rows[index].purpose;
                index++;
            }

            rows.forEach(singleRow => {
                delete singleRow.lastname;
            })

            }
            res.json({
                status: true,
                loans: rows
            })
        })

    })
})


    


//Post Api for new loan application
app.post('/new-loan', function(req,res) {
    const loanData = req.body;

    // const firstName = loanData.firstName;
    // const lastName = loanData.lastName;
    // const email = loanData.email;
    // const amount = loanData.amount;
    // const purpose = loanData.purpose;

    // you can do same thing using distructing object

    const {firstName,lastName,amount,purpose,email} = loanData;

    if(!firstName) {
   // return res.status(400).json({
     //   status: false,
      //  error: 'please provide firstName'
    //})
    return sendErrorResponse(res,'please provide firstName')
    }

    if(!lastName) {
        // return res.status(400).json({
            //status: false,
            //error: 'please provide lastName'
       // })
       return sendErrorResponse(res,'please provide lastName')
        }

        if(!amount) {
        // return res.status(400).json({
            //status: false,
            //error: 'please provide amount'
       // })
       return sendErrorResponse(res,'please provide amount')
        }

        if(!email) {
            return sendErrorResponse(res,'please provide email')
            }


            if(!purpose) {
                return sendErrorResponse(res,'please provide purpose')
                }

           const insertSQL= `INSERT INTO loans (
            firstName,
            lastName,
            email,
            loan_amount,
            purpose

           ) VALUES(
            "${firstName}",
            "${lastName}",
            "${email}",
            "${amount}",
            "${purpose}"
           )`;
           
           db.serialize(() => {
            db.exec(insertSQL, (error) => {
                if(error) {
                    res.status(400).json({
                    status:false,
                    error:error
                    })
                } else {
                    res.json({
                        status: true,
                        message: "New loan application created.....",
                        //data: loanData,
                        //sql:insertSQL  
                });
            }
           })

    

    });

    function sendErrorResponse(response,errorMessage) {
        return response.status(400).json({
            status: false,
            error: errorMessage
        });
    }
});

app.get('/loans/:id' , function(req,res) {
    const loan_id = req.params.id;

   const sql =  `SELECT * from loans WHERE loan_id = ${loan_id};`;
   db.serialize(() => {
    db.get(sql,(error,row) => {
        if (error || !row) {
            res
            .status(400)
            .json({
                status: false, 
                error: `Unable to find loan with id: ${loan_id}`
            })
        } else {
         res.json({status : true,loan: row})
        }
    })
   })
    
})

app.post('/loans/:id', function (req,res) {
    const loan_id = req.params.id
    const requestBody = req.body;
    const status = requestBody.status;

    const sql =`
    UPDATE loans 
    SET status ="${status}"
    WHERE loan_id=${loan_id}`;

    db.serialize(function() {
        db.exec(sql,(error) =>{
            console.log(error)
            if(error){
                res.status(400).json({
                    status:false,
                    sql,
                    error: `Error while updating the loan for ID: ${loan_id}`
                })
            } else {
                res.json({
                    status:true,
                    message: "Loan Details updated..."
                })
            }
        })
    });

app.delete("/loans/:loanId", (req, res) => {
    const loan_id = req.params.loanId;
    const sql = `DELETE from loans WHERE loan_id=${loan_id}`;

    db.serialize(() => {
        db.exec(sql, (error) => {
            if(error) {
                return sendErrorResponse(res, "Can't delete the loan")
            } else {
                res.json({
                    status: true,
                    message: "Loan deleted...."
                })
            }
        })
    })
})

})

function sendErrorResponse(response,errorMessage) {
        return response.status(400).json({
            status: false,
            error: errorMessage
        });
    }
});

app.listen(3000, function() {
console.log(`API Services are running on http://localhost:3000`);
})
