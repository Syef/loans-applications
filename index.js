const express = require("express");
const bodyParser = require("body-parser");

// creating an express application
const app = express();

// handling json body request
app.use(bodyParser.json() );

app.get('/', function(req,res) {
    res.json({status: true, 
    message: "Loans Api running successful"
});
});

//Post Api for new loan application
app.post('/new-loan', function(req,res){
    const loanData = req.body;

    // const firstname = loanData.firstname;
    // const lastname = loanData.lastname;
    // const email = loanData.email;
    // const amount = loanData.amount;
    // const purpose = loanData.purpose;

    // you can do same thing using distructing object

    const {firstName,lastName,email,amount,purpose} = loanData;

    if(!firstName) {
   // res.status(400).json({
     //   status: false,
      //  error: 'please provide firstName'
    //})
    return sendErrorResponse(res,'please provide firstName')
    }

    if(!lastName) {
        //res.status(400).json({
            //status: false,
            //error: 'please provide lastName'
       // })
       return sendErrorResponse(res,'please provide lastName')
        }

        if(!amount) {
        //res.status(400).json({
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

               

    res.json({
        status: true,
        message: "New loan application created.....",
        data: loanData

    });

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