export interface signUp{
    name:String,
    email:String,
    password:String

}

export interface login{
    email:String,
    password:String
}

export interface product{
    name:String,
    price:Number,
    category:String,
    color:String,
    description:String,
    image:String,
    id:Number,
    quantity:undefined | Number,
    productId:undefined | Number
}

export interface cart{
    name:String,
    price:Number,
    category:String,
    color:String,
    description:String,
    image:String,
    id:Number | undefined,
    quantity:undefined | Number,
    userId:Number,
    productId:Number
}



export interface User{
    name:String,
    email:String,
    password:String
}

export interface loginUser{
    email:String,
    password:String
}

export interface priceSummary{
    price:Number,
    discount:Number,
    tax:Number,
    delivary:Number,
    total:Number
}

export interface order{
    email:String,
    address:String,
    contact:String,
    totalPrice:Number,
    userId:Number,
    id:Number | undefined
}