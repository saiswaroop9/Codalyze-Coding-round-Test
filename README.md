# Codalyze-Coding-round-Test
1st Round Coding Assignment for Codalyze <br>

## Problem Statement
Pick a database of your own choice and using node/express write APIs for.

Create a GET api to show paginated list of outlets with configurable limit and skip / offset parameters.

Create an option in this api to accept “sortByField” (sortByField can be equal to “Item_Weight”, “MRP”) as query parameter and return a sorted list of all outlets (paginated). Also accept “sortDirection” (sortDirection can be “ASC” / “DESC”) as query parameter to return list sorted in ascending or descending order.

Create an option to accept filter as query parameter and return list filtered by either Item_Fat_Content: reg or Outlet_Size: small

The apis must validate all query parameters sent by the frontend and return appropriate errors

Under no condition should this api break with Internal Server Error / 500

##Steps to run this code

Uncomment the code in loadDataInDB file, this is a one time code which will build the data using CSV and dump everything in MongoDB as JSON Object.

Now run the index.js file using node index.js command.

On opening localhost:3001, the server should respond with the Hello World message.

Now hit the API with the parameters defined in the Problem Statement and enjoy.

P.S In case you don't want any request param say you dont want filterType then put a <b> *none* </b> there in the URL 
