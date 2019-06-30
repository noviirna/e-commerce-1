#E COMMERCE

1. Installation
  - clone this repo
  - run npm install on the `/server` & `/client` folder to install all of the dependencies
  - set some environment variables
  ```
  MONGODB_URL=atlas url for mongo db on cluoud
  MONGODB_LOCAL=mongodb://localhost:27017/e-commerce
  SECRET_JWT=jsonwebtokensecret
  PORT=3000
  CLIENT_ID=googleAPIclientID
  CLOUD_BUCKET=bucket name
  GCLOUD_PROJECT=project name
  KEYFILE_PATH=path to google api credential .json
  SALT_ROUNDS=salt round for secret jwt
  GOOGLE_EMAIL=valid email for nodemailer
  GOOGLE_PASS=valid password email for nodemailer
  RAJAONGKIR=API key untuk raja ongkir
  ```
   - run `npm run start:dev` on the terminal to start server on development environment
   - run `npm run start:test` on the terminal  to run the test script
   - run the client by open the client folder then run `npm run serve` on the terminal to run development server on port 8080
   
2. REST API
- GET /
  - REQUEST
    - req.body
    - req.headers
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : "Server udah jalan yaa :)"
      - description : for testing purpose vm server
    - ON ERROR
      - status : 500
      - description : connection error or server down
  
- POST /users/register
  - REQUEST
    - req.body
      - { name: String, email: String, password: String }
    - req.headers
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : { _id: ObjectId, name: String, email: String, password: String (hashed), picture: String }
      - description : register new account
    - ON ERROR
      - status : 400
      - body : { message : String }
      - description : 
        - email format is invalid
        - password length is less than 8 characters
        - password length is more than 16 characters
        - email already used on other registered account
        - the required field is not filled

- POST /users/login
  - REQUEST
    - req.body
      - { email: String, password: String }
    - req.headers
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : { token: String, user: { _id, name, email, picture } }
      - description : login to existing account
    - ON ERROR
      - status : 400
      - body : { message : String }
      - description : 
        - password or email that is inputted is wrong
        - the required filled is not filled
        - password length is less than 8 characters
        - password length is more than 16 characters
        - email already used on other registered account
        - the required field is not filled

- GET /getcities
  - REQUEST
    - req.body
    - req.headers
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body :  [ { city_id: Number, province_id: Number, province: String, type: String, city_name: String, postal_code: String } ]
      - description : get Indonesia's cities list for calculating shipping cost
    - ON ERROR
      - status : 500
      - body : { message : String }
      - description : 
        - the third party api server is not responding or down

- POST /getogengkir
  - REQUEST
    - req.body : { destination: Number, weight: Number }
    - req.headers
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : [ { code: String, name: String, cost: [ { service: String, description: String, cost: [ { value: Number, etd: String, note: String } ] } ]
    - ON ERROR
      - status : 500
      - body : { message : String }
      - description : 
        - the third party api server is not responding or down


- POST /uploadimg
  - REQUEST
    - req.body : { file: FormData }
    - req.headers : { token : String jwt token }
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : String "googlecloudstorageurl.datatype"
      - description : upload image to google cloud storage bucket
    - ON ERROR
      - status : 500
      - body : String "Unable to upload"
      - description : 
        - something is wrong when uploading to gcs

- GET /products
  - REQUEST
    - req.body 
    - req.headers
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : [ {_id: ObjectId, name:String, picture: String, price: String, description: String, tags: Array } ]
      - description : get all existing products on the database
    - ON ERROR
      - status : 500
      - body : { message }
      - description : 
        - something is wrong within the server

- GET /products/:id
  - REQUEST
    - req.body 
    - req.headers : { token : String jwt token }
    - req.params : id
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : {_id: ObjectId, name:String, picture: String, price: String, description: String, tags: Array }
      - description : get detail products by Id on the database
    - ON ERROR
      - status : 401, 500
      - body : { message }
      - description : 
        - invalid login token (status 401)
        - something is wrong within the server (status 500)

- POST /products
  - REQUEST
    - req.body : { name: String, picture: String, price: String, description: String, tags: Array }
    - req.headers : { token : String jwt token }
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : {_id: ObjectId, name:String, picture: String, price: String, description: String, tags: Array }
      - description : get detail products by Id on the database
    - ON ERROR
      - status : 401, 500, 400
      - body : { message }
      - description : 
        - only admin able to create new product (status 401)
        - something is wrong within the server (status 500)
        - input is wrong or the required field is null or not complete or not passing the validation test in model (status 400)

- PATCH /products:id
  - REQUEST
    - req.body : { name: String, picture: String, price: String, description: String, tags: Array }
    - req.headers : { token : String jwt token }
    - req.params : id
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : {_id: ObjectId, name:String, picture: String, price: String, description: String, tags: Array }
      - description : update the existing product data by id
    - ON ERROR
      - status : 401, 500, 400
      - body : { message }
      - description : 
        - authentication problem (status 401)
        - something is wrong within the server (status 500)
        - input is wrong or the required field is null or not complete or not passing the validation test in model (status 400)


- DELETE /products:id
  - REQUEST
    - req.body
    - req.headers : { token : String jwt token }
    - req.params : id
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : {_id: ObjectId, name:String, picture: String, price: String, description: String, tags: Array }
      - description : delete the existing product data by id
    - ON ERROR
      - status :  401, 500
      - body : { message }
      - description : 
        - only certain user (admin) is able to access this (status 401)
        - something is wrong within the server (status 500)
        
- GET /carts
  - REQUEST
    - req.body 
    - req.headers : { token : String jwt token}
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : 
        [ { products: [], _id: ObjectId, buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number, createdAt: Timestamps, updatedAt: Timestamps } ]
      - description : get all existing carts/transactions on the database
    - ON ERROR
      - status : 500, 401
      - body : { message }
      - description : 
        - something is wrong within the server (status 500),
        - invalid login token (status 401)
        - only certain user (admin) is able to access this (status 401)

- GET /carts/:id
  - REQUEST
    - req.body 
    - req.headers : { token : String jwt token }
    - req.params : id
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : 
        { products: [], _id: ObjectId, buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number, createdAt: Timestamps, updatedAt: Timestamps }
      - description : get certain detail of cart/transaction on the database
    - ON ERROR
      - status : 500, 401
      - body : { message }
      - description : 
        - something is wrong within the server (status 500),
        - invalid login token (status 401)
        - unauthorized access (status 401)

- GET /carts/user/:id
  - REQUEST
    - req.body 
    - req.headers : { token : String jwt token }
    - req.params : id
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : 
        [ { products: [], _id: ObjectId, buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number, createdAt: Timestamps, updatedAt: Timestamps } ]
      - description : get all existing carts/transactions of certain user on the database
    - ON ERROR
      - status : 500, 401
      - body : { message }
      - description : 
        - something is wrong within the server (status 500),
        - invalid login token (status 401)
        - unauthorized access (status 401)

- POST /carts
  - REQUEST
    - req.body : { products: [], buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number }
    - req.headers : { token : String jwt token }
    - req.params
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 201
      - body : { products: [], _id: ObjectId, buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number, createdAt: Timestamps, updatedAt: Timestamps }
      - description : get detail products by Id on the database
    - ON ERROR
      - status : 401, 500, 400
      - body : { message }
      - description : 
        - invalid login token (status 401)
        - something is wrong within the server (status 500)
        - input is wrong or the required field is null or not complete or not passing the validation test in model (status 400)

- PATCH /carts/:id
  - REQUEST
    - req.body : { products: [], buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number }
    - req.headers : { token : String jwt token }
    - req.params : id
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : { products: [], _id: ObjectId, buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number, createdAt: Timestamps, updatedAt: Timestamps }
      - description : update the existing cart data by id
    - ON ERROR
      - status : 401, 500, 400
      - body : { message }
      - description : 
      - - invalid login token (status 401)
        - something is wrong within the server (status 500)
        - input is wrong or the required field is null or not complete or not passing the validation test in model (status 400)


- DELETE /carts/:id
  - REQUEST
    - req.body
    - req.headers : { token : String jwt token }
    - req.params : id
    - req.query
  - RESPONSE
    - ON SUCCESS
      - status : 200
      - body : { products: [], _id: ObjectId, buyer: { _id: ObjectId, name: String , email: String, password: String, picture: String }, status: String, products_amount: Number, ship_address: String, ship_city: String, ship_amount: Number, ship_receipt: String, total: Number, createdAt: Timestamps, updatedAt: Timestamps }
      - description : delete certain cart data by id
    - ON ERROR
      - status :  401, 500
      - body : { message }
      - description :
        - invalid login token (status 401) 
        - only certain user (admin) is able to access this (status 401)
        - something is wrong within the server (status 500)
        
