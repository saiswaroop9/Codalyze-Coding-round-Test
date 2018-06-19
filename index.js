
var express = require("express")
var router = express.Router()
var fs = require("fs")
var mongoose = require("mongoose")
var chalk = require('chalk')
var outletdata = require('./loadDataInDB')


//Start Server Step 1
const app = express()

app.listen("3001",function(req, res) {
  console.log("Server is listening on port 3001");
})

//Connect to DB Step 2
mongoose.connect("mongodb://localhost:27017/Codalye")
var db = mongoose.connection
db.on('error',function () {
  console.log("Error connecting to the DB.")
})

db.once('open',function () {
  console.log(chalk.blue.bold("Connection to the DB successful"))
})

outletdata.find(function(error, result) {
  if(error){
    console.log("Some error occured")
  }
  else{
    console.log("Working fine")
  }

});

//Checking by hitting the server
app.get('/',function (req,res) {
  res.send("Hello World ! from the server")
})

function validate(req,res,next) {
  if(parseInt(req.params.limitCount)||req.params.limitCount=='0'){
    if(parseInt(req.params.skipCount)||req.params.limitCount=='0'){
      if(req.params.sortByField=="Item_MRP"||req.params.sortByField=="Item_Weight"||req.params.sortByField=="none"){
        if(req.params.sortOrder=="ASC"||req.params.sortOrder=="DESC"||req.params.sortOrder=="1"||req.params.sortOrder=="-1"){
          if(req.params.filterByField=="Item_Fat_Content"||req.params.filterByField=="Outlet_Size"||req.params.filterByField=="none"){
            if(req.params.filterByField=="none"){
              next()
            }
            else if((req.params.filterByField=="Item_Fat_Content")&&(req.params.filterValue=="lf"||req.params.filterValue=="low fat"||req.params.filterValue=="Low Fat"||req.params.filterValue=="LF"||req.params.filterValue=="LOW FAT"||
                                                                req.params.filterValue=="reg"||req.params.filterValue=="Reg"||req.params.filterValue=="Regular"||req.params.filterValue=="regular"))
            {
              next()
            }
            else if((req.params.filterByField=="Outlet_Size")&&(req.params.filterValue=="Small"||req.params.filterValue=="Medium"||req.params.filterValue=="High"))
            {
              next()
            }else{
              res.send("For Item_Fat_Content filter, filter value should be lf, LF, low fat, Low Fat, LOW FAT \n For Outlet_Size filter, filter value should be Small Medium or High")
            }

          }else{
            res.send("Sort By Field should be one of the three - Item_Fat_Content, Outlet_Size, none")
          }
        }
        else{
          res.send("Sort Order should one of these four - ASC, DESC, 1, -1")
        }
      }else{
        res.send("Sort By Field should be one of the three - Item_MRP, Item_Weight, none")
      }

    }else{
      res.send("Skip Count should be number")
    }

  }else{
    res.send("Limit Count should be a number")
  }

}

app.get('/limit/:limitCount/skip/:skipCount/sortBy/:sortByField/sortDirection/:sortOrder/filter/:filterByField/:filterValue',validate,function (req,res,next) {
  console.log(req.params.limitCount);//list out the counts on given limited number
  console.log(req.params.skipCount);// skips the data depend on paginate- page skip limit
  console.log(req.params.sortByField);
  console.log(req.params.sortOrder);
  console.log(req.params.filterByField);
  console.log(req.params.filterValue);
  let query;



  if(req.params.sortOrder=='-1'||req.params.sortOrder=='DESC'){// when it is in negative, it shows minus in DB
    req.params.sortByField='-'+req.params.sortByField
  }
  if(req.params.sortByField!='none'){//Sorted by non only for Item_Fat_Content and Outlet_Size.
  if(req.params.filterByField=='Item_Fat_Content'){
    query = outletdata.find({Item_Fat_Content:req.params.filterValue})
                .limit(parseInt(req.params.limitCount))
                .skip(parseInt(req.params.skipCount))
                .sort(req.params.sortByField)
  }else if(req.params.filterByField=='Outlet_Size'){
    query = outletdata.find({Outlet_Size:req.params.filterValue})
                .limit(parseInt(req.params.limitCount))
                .skip(parseInt(req.params.skipCount))
                .sort(req.params.sortByField)
  }else{
    query = outletdata.find()
                .limit(parseInt(req.params.limitCount))
                .skip(parseInt(req.params.skipCount))
                .sort(req.params.sortByField)
  }
}else{
  if(req.params.filterByField=='Item_Fat_Content'){
    query = outletdata.find({Item_Fat_Content:req.params.filterValue})
                .limit(parseInt(req.params.limitCount))
                .skip(parseInt(req.params.skipCount))

  }else if(req.params.filterByField=='Outlet_Size'){
    query = outletdata.find({Outlet_Size:req.params.filterValue})
                .limit(parseInt(req.params.limitCount))
                .skip(parseInt(req.params.skipCount))

  }else{
    query = outletdata.find()
                .limit(parseInt(req.params.limitCount))
                .skip(parseInt(req.params.skipCount))

  }
}

  console.log(`outletdata.find().limit(parseInt(${req.params.limitCount})).skip(parseInt(${req.params.skipCount})).sort(${req.params.sortByField})`)
  query.exec(function (err,result) {
    if(err){
      res.send("Some error occured")
      console.log(err)
    }else{
      console.log("Found "+result.length+" records")
      res.send(result)
    }
  })
})
