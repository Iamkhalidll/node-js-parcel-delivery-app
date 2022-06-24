let {createUserProps}=require("./userProperties")
let createUser ={
    tags:["Auth"],
    description:"This is used to create a new user",
    requestBody:{
        content:{
           "application/json":{
            schema:{
                type:"object",
                properties:{
                   name:createUserProps.name,
                   email: createUserProps.email,
                   password:createUserProps.password
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
                           id:"2uhjew93h9ew3eje3j39neowj3"
                        }
                    }

                }
            }
        }
    }
}
let loginUser = {
    tags:["Auth"],
    description:"This is used for logging the user into the server for an hour",
    requestBody:{
        content:{
        "application/json":{
            schema:{
                type:"object",
                properties:{
                email: createUserProps.email,
                password:createUserProps.password
                }    
            }
        }
        }
    },
    responses:{
        201:{
            description:"ok",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                        id:"2uhjew93h9ew3eje3j39neowj3"
                        }
                    }

                }
            }
        }
    }
}
const loggingOutUser={
    tags:["Auth"],
    description:"This is used for logging the user out of the  server",
    responses:{
        200:{
            description:"ok",
            content:{
                "application/json":{
                    schema:{
                        type:"string",
                        example:"You have been logged out"
                    }

                }
            }
        }
    }
}
const userDocs =  {
    "/api/v1/auth/signup":{
        post : createUser
        },
    "/api/v1/auth/login":{
        post : loginUser
    },
    "/api/v1/auth/logout":{
       get:loggingOutUser
    }

}
module.exports = {userDocs}
