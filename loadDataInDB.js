'use strict'
const path = require('path')
const csvFilePath = path.join(__dirname,'Test_dataCSV1.csv')
const csv=require('csvtojson')
const async = require('async')
const mongoose = require('mongoose')
const chalk = require('chalk')

console.log(chalk.green.bgRed.bold("In this project we will convert the data given to the JSON format and load it in MongoDB"))

//Mongoose Connection Building..

mongoose.connect("mongodb://localhost:27017/Codalye")
var db = mongoose.connection
db.on('error',function () {
  console.log("Error connecting to the DB.")
})

db.once('open',function () {
  console.log(chalk.blue.bold("Connection to the DB successful"))
})

//Mongoose Schema Definition before loading the data

var Schema = mongoose.Schema;
var dataSchema = new Schema({
  Item_Identifier : { type: String, Required: "Item ID cannot be left blank"},
  Item_Weight : { type: Number, Required: "Item ID cannot be left blank"},
  Item_Fat_Content : { type: String, Required: "Item ID cannot be left blank"},
  Item_Visibility : { type: String, Required: "Item ID cannot be left blank"},
  Item_Type : { type: String, Required: "Item ID cannot be left blank"},
  Item_MRP : { type: Number, Required: "Item ID cannot be left blank"},
  Outlet_Identifier : { type: String, Required: "Item ID cannot be left blank"},
  Outlet_Establishment_Year : { type: String, Required: "Item ID cannot be left blank"},
  Outlet_Size : { type: String, Required: "Item ID cannot be left blank"},
  Outlet_Location_Type : { type: String, Required: "Item ID cannot be left blank"},
  Outlet_Type : { type: String, Required: "Item ID cannot be left blank"},

});
var outletdata = mongoose.model("outletdata",dataSchema);
module.exports = outletdata

// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     async.eachSeries(jsonObj,function (o,cb) {
//
//         //console.log(o)
//
//         var item = new outletdata({
//           Item_Identifier:o.Item_Identifier,
//           Item_Weight:parseFloat(o.Item_Weight)?parseFloat(o.Item_Weight):0,
//           Item_Fat_Content:o.Item_Fat_Content,
//           Item_Visibility:o.Item_Visibility,
//           Item_Type:o.Item_Type,
//           Item_MRP:parseFloat(o.Item_MRP)?parseFloat(o.Item_MRP):0,
//           Outlet_Identifier:o.Outlet_Identifier,
//           Outlet_Establishment_Year:o.Outlet_Establishment_Year,
//           Outlet_Size:o.Outlet_Size,
//           Outlet_Location_Type:o.Outlet_Location_Type,
//           Outlet_Type:o.Outlet_Type
//         })
//           item.save(function (error) {
//             if(error){
//               console.log("Some error occured while saving")
//               console.log(o)
//               console.log(error)
//             }
//             else{
//               console.log('Saved successfully')
//               cb();
//             }
//           })
//
//     })
//     //console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */
// })
// const jsonArray= csv().fromFile(csvFilePath);
