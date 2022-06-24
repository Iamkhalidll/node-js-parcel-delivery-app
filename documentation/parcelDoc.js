let  {createParcelProps}= require("./parcelProperties")
let getParcels = {
            tags:["Parcel"],
            description:"Get all of the parcels a user has created only if the user is logged in",
            responses:{
                200:{
                    description:"OK",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                example:{
                                   
                                }
                            }
        
                        }
                    }
                }
            }
        }
   

const createParcel = {
    tags:["Parcel"],
    description:"Create a new parcel",
    requestBody:{
        content:{
           "application/json":{
            schema:{
                type:"object",
                properties:{
                   packageName: createParcelProps.packageName,
                   destination:createParcelProps.destination,
                   description:createParcelProps.description,
                   userId:createParcelProps.userId,
                   presentLocation:createParcelProps.presentLocation,
                   Role:createParcelProps.Role,
                   status:createParcelProps.status,
                   _id:createParcelProps._id
                  }    
               }
           }
        }
    },
    responses:{
        201:{
            description:"created",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                            msg:"Your package has been created",
                            id:"ndkispo3893030djdbsks93dkkdhddh"
                        }
                    }

                }
            }
        }
    }
}
let cancelParcel = {
    tags:["Parcel"],
    description:"Create a new parcel",
    parameters:[{
         in:"path",
         name:"id",
         schema:{type:"string"},
         required:true,
         description:"Parcel id"
    }],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                           msg:"Your order has been cancelled succesfully",
                           id:"2uhjew93h9ew3eje3j39neowj3"
                        }
                    }

                }
            }
        }
    }
}
let changingStatus = {
    tags:["Parcel"],
    description:"This is used for changing the status of a parcel order to delivered and notify the user via email. This route is only accessible by an admin,if you want to test signup with the name: 'khalid' ",
    parameters:[{
         in:"path",
         name:"id",
         schema:{type:"string"},
         required:true,
         description:"Parcel id"
    }],
    requestBody:{
        content:{
        "application/json":{
            schema:{
                type:"object",
                properties:{
                  newStatus: createParcelProps.newStatus
                }    
            }
        }
        }
    },
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                           msg:"parcel with id:2uhjew93h9ew3eje3j39neowj3 has been updated",
                        }
                    }

                }
            }
        }
    }
}
let changingDestination={
    tags:["Parcel"],
    description:"Changing destination of a parcel order. Only the user who made the order can do this ",
    parameters:[{
         in:"path",
         name:"id",
         schema:{type:"string"},
         required:true,
         description:"Parcel id"
    }],
    requestBody:{
        content:{
        "application/json":{
                schema:{
                    type:"object",
                    properties:{
                    city:createParcelProps.city,
                    country:createParcelProps.country,
                    state:createParcelProps.state,
                    address:createParcelProps.address,
                    }    
                }
            }
        }
    },responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                           msg:"your parcel's destination has been updated",
                           id:"u3hk3u3h43bd8ujdi8eujeidjidj"
                        }
                    }

                }
            }
        }
    }
}
let changingPresentLocation={
    tags:["Parcel"],
    description:"Changing present location of a parcel order. Only the admin can use this route ",
    parameters:[{
         in:"path",
         name:"id",
         schema:{type:"string"},
         required:true,
         description:"Parcel id"
    }],
    requestBody:{
        content:{
        "application/json":{
                schema:{
                    type:"object",
                    properties:{
                    city:createParcelProps.city,
                    country:createParcelProps.country,
                    state:createParcelProps.state,
                    address:createParcelProps.address,
                    }    
                }
            }
        }
    },responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                           msg:"parcel with id:2o2kowndf9idbdisi8dniejej93jd has been present location has been updated"
                        }
                    }

                }
            }
        }
    }
}
const parcelDocs =  {
    "/api/v1/parcels":{
        get: getParcels
        },
    "/api/v1/parcel":{
       post: createParcel
    },
    "/api/v1/parcel/{id}/cancel":{
        put:cancelParcel
    },
    "/api/v1/parcels/{id}/status":{
        put:changingStatus
    },
    "/api/v1/parcels/{id}/destination":{
        put:changingDestination
    },
    "/api/v1/parcels/{id}/presentLocation":{
        put:changingPresentLocation
    }
}


module.exports = {parcelDocs}