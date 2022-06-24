let {userDocs} = require("./userDoc")
let {parcelDocs} = require("./parcelDoc")
const swaggerDocumentation={
       openapi:"3.0.0",
        info:{
            title:"Parcel delivery API",
            version:"1.0.0",
            description:"A simple express parcel delivery API",
            contact:{
                name:"API support",
                email:"lawalkhalid211@gmail.com"
            }
        },
        server:[
            {
                url:"https://node-js-parcel-delivery-app.herokuapp.com",
                description:" server"
            }
        ],
        tags:[
            {

            name:"Auth",
            description:"User routes"

            },
            {
            name:"Parcel",
            description:"Parcel routes"
            }
        ],
        paths:{
         ...parcelDocs,
         ...userDocs
        }
    }
module.exports ={swaggerDocumentation}