// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

const dbName = "cobuy";
const url = "mongodb://localhost:27017";
// Self executable function e.g hello()

(async function () {
    // connect to database
    const client = await MongoClient.connect(url);

    // get db
    const db = client.db(dbName);

    // Insert user record
    const user = [{ name: 'Dilip', email: 'dilip.kumar2k6@gmail.com', age: 32, status: 'married' },
    { name: 'Nisha', email: 'nisha@gmail.com', age: 22, status: 'married' },
    { name: 'Ali', email: 'ali@gmail.com', age: 54, status: 'married' },
    { name: 'Ankita', email: 'ankita@gmail.com', age: 93, status: 'unmarried' },
    { name: 'Ammy', email: 'ammy@gmail.com', age: 23, status: 'unmarried' },
    { name: 'Asha', email: 'asha@gmail.com', age: 35, status: 'unmarried' },
    { name: 'Divya', email: 'divya@gmail.com', age: 42, status: 'married' },
    { name: 'Chinky', email: 'chinky@gmail.com', age: 60, status: 'married' },
    { name: 'Swati', email: 'swati@gmail.com', age: 56, status: 'unmarried' },
    { name: 'Kushi', email: 'kushi@gmail.com', age: 72, status: 'married' }
  ];
    // Insert multiple record
    await db.collection('user').insertMany(user);
    //update single record
    await db.collection('user').updateOne({email:'ali@gmail.com'}, {$set: {name:'Ali Zafar'}})
    //find a record
    const updatedUser = await db.collection('user').findOne({email: 'ali@gmail.com'});
    console.log('updatedUser ', updatedUser)
    //deleting a record
    await db.collection('user').deleteOne({email:'chinky@gmail.com'})
    //displaying alluser with age=32
    const allUsersWithAge32 = await db.collection('user').find({age:32}).toArray();
    console.log('allUsersWithAge32 ', allUsersWithAge32)
    // Use aggregation pipeline to group all users by age
    await db.collection('user').aggregate({
      $group :{
        _id : "$age",
        total: {$sum:1}
      }
    })
    // Use aggregation pipeline to find out all the users greater than age 32
    await db.collection('user').find({ age: { $gt: 32 } })
//Use simple find operator  to find out all users sorted by age

    await db.collection('user').find({sort: {age:1}})



    //Create index on user collection based on queries
    await db.collection('user').ensureIndex({"name" :1})

    // Use findOneAndUpdate
    await db.collection('user').findOneAndUpdate({email:"swati@gmail.com"}, { $inc : { "age" : 3 } })


    // user.name <> user["name"]

})()
