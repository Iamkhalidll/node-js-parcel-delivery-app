let createParcelProps = {
    packageName:{
        type:"string",
        example:"Nike sports shoes"
    },
    description:{
        type:"string",
        example:"These are a pair of shoes for my cousin"
    },
    presentLocation:{
        type:"object",
        example:{
            address:" 11th  something street",
            city:"Ikeja",
            state:"Lagos",
            country:"Nigeria",
        }
    },
    destination:{
        type:"object",
        example:{
            address:" 11th  something street",
            city:"Ikeja",
            state:"Lagos",
            country:"Nigeria",
        }
            
    },
    newStatus:{
        type:"string",
        example: "delivered"
    },
    city:{
        type:"string",
        example:"Ikeja"
    },
    state:{
        type:"string",
        example:"Lagos"
    },
    country:{
        type:"string",
        example:"Nigeria"
    },
    address:{
        type:"string",
        example:"11th something street"
    },
}
module.exports = {createParcelProps}