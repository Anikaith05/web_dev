# 🍃 MongoDB Revision Notes

> Complete Revision Sheet for MongoDB Basics

---

# 📚 Table of Contents

- Why Databases?
- SQL vs NoSQL
- Why MongoDB?
- MongoDB Architecture
- MongoDB Shell
- BSON
- CRUD Operations
- Query Operators
- Update Operators
- Delete Operations
- Most Common Commands
- Interview Notes
- Quick Revision Checklist

---

# 🗄️ Why Do We Need Databases?

Imagine storing users like this:

```cpp
User1.txt
User2.txt
User3.txt
```

Problems ❌

- Slow searching
- Duplicate data
- Difficult updates
- No relationships
- Not scalable

A Database solves all of this.

```
Application
      │
      ▼
 Database Server
      │
      ▼
 Permanent Storage
```

---

# SQL vs NoSQL

| SQL 🏛️ | NoSQL 🍃 |
|----------|-----------|
| Tables | Collections |
| Rows | Documents |
| Columns | Fields |
| Fixed Schema | Flexible Schema |
| MySQL | MongoDB |
| PostgreSQL | Firebase |
| Relationships | Embedded Documents |

---

## SQL

```
Users Table

+----+--------+-----+
| id | name   | age |
+----+--------+-----+
| 1  | John   | 20  |
| 2  | Alice  | 25  |
+----+--------+-----+
```

Every row must have the same columns.

---

## MongoDB

```
Users Collection

{
 name: "John",
 age:20
}

{
 name:"Alice",
 age:25,
 city:"Delhi"
}

{
 username:"Bob",
 hobbies:["Coding","Music"]
}
```

Different documents can have different fields.

This is called a **Flexible Schema**.

---

# 🍃 Why MongoDB?

MongoDB stores data as Documents.

Instead of

```
Rows
```

it stores

```
Document
↓

{
 name:"John",
 age:20,
 email:"john@gmail.com"
}
```

Advantages

✅ Fast

✅ Flexible

✅ JSON-like

✅ Easy to scale

✅ Great for Web Development

---

# MongoDB Architecture

```
MongoDB Server
        │
        ▼
 Database
        │
        ▼
 Collection
        │
        ▼
 Document
        │
        ▼
 Fields
```

Example

```
MongoDB

│
├── College
│      │
│      ├── Students
│      │      │
│      │      ├── {
│      │      │    name:"Alex",
│      │      │    age:20
│      │      │   }
│      │
│      └── Teachers
│
└── Hospital
```

---

# Collection

A Collection is simply a group of Documents.

```
Students Collection

{
 name:"Alex"
}

{
 name:"Bob"
}

{
 name:"Charlie"
}
```

Think

```
SQL Table
      =
MongoDB Collection
```

---

# Document

A document is one JSON-like object.

```
{
 name:"Alex",
 age:20,
 branch:"CSE"
}
```

Think

```
SQL Row
      =
MongoDB Document
```

---

# JSON

JSON looks like

```json
{
    "name":"Alex",
    "age":20,
    "city":"Delhi"
}
```

Notice

✔ Keys are inside quotes

✔ Strings are inside quotes

✔ Numbers are not

---

# BSON

MongoDB actually stores

```
JSON
      ↓
 BSON
```

BSON = Binary JSON

One-line definition:

> BSON is MongoDB's binary version of JSON used for faster storage and retrieval.

Benefits

- Faster
- Smaller
- Supports Date
- Supports ObjectId
- Supports Binary Data

---

# ObjectId

Every document automatically gets

```
_id
```

Example

```json
{
 "_id":ObjectId("654ab1...")
}
```

Think of it as

```
Primary Key
```

---

# Mongo Shell

Launch

```
mongosh
```

Exit

```
exit
```

Show databases

```
show dbs
```

Current database

```
db
```

Create/Switch database

```
use college
```

Show collections

```
show collections
```

---

# CRUD

CRUD =

```
C → Create
R → Read
U → Update
D → Delete
```

---

# CREATE

Insert one

```javascript
db.students.insertOne({
    name:"Alex",
    age:20
})
```

Insert many

```javascript
db.students.insertMany([
    {
        name:"Alex"
    },
    {
        name:"Bob"
    }
])
```

Difference

```
insertOne()

↓

One document


insertMany()

↓

Multiple documents
```

---

# READ

Find all

```javascript
db.students.find()
```

Pretty output

```javascript
db.students.find().pretty()
```

Find one

```javascript
db.students.findOne()
```

Condition

```javascript
db.students.find({
 age:20
})
```

---

# Query Flow

```
Collection
      │
      ▼
Find Documents
      │
      ▼
Return Cursor
      │
      ▼
Display Results
```

---

# UPDATE

Update one

```javascript
db.students.updateOne(
    {name:"Alex"},
    {$set:{age:21}}
)
```

Update many

```javascript
db.students.updateMany(
    {},
    {$set:{verified:true}}
)
```

Replace one

```javascript
db.students.replaceOne(
   {name:"Alex"},
   {
      name:"Alex",
      age:30
   }
)
```

Difference

```
$set

↓

Changes only selected fields


replaceOne

↓

Replaces entire document
```

---

# DELETE

Delete one

```javascript
db.students.deleteOne({
 name:"Alex"
})
```

Delete many

```javascript
db.students.deleteMany({
 age:20
})
```

Delete all

```javascript
db.students.deleteMany({})
```

---

# Comparison Operators

Equal

```javascript
{
 age:20
}
```

Greater than

```javascript
{
 age:{
   $gt:20
 }
}
```

Less than

```javascript
{
 age:{
   $lt:20
 }
}
```

Greater than equal

```javascript
$gte
```

Less than equal

```javascript
$lte
```

Not equal

```javascript
$ne
```

---

# Logical Operators

AND

```javascript
{
 age:20,
 city:"Delhi"
}
```

OR

```javascript
{
 $or:[
    {age:20},
    {city:"Delhi"}
 ]
}
```

NOT

```javascript
$not
```

---

# Update Operators

## $set

Creates or updates a field.

```javascript
{
 $set:{
   age:22
 }
}
```

---

## $inc

Increase value

```javascript
{
 $inc:{
    age:1
 }
}
```

---

## $unset

Remove field

```javascript
{
 $unset:{
    city:""
 }
}
```

---

## $push

Add to array

```javascript
{
 $push:{
    skills:"NodeJS"
 }
}
```

---

## $pull

Remove from array

```javascript
{
 $pull:{
    skills:"Java"
 }
}
```

---

# Complete MongoDB Flow

```
Application

      │

      ▼

MongoDB Server

      │

      ▼

Database

      │

      ▼

Collection

      │

      ▼

Document

      │

      ▼

Fields
```

---

# SQL vs Mongo Mapping

```
SQL

Database
   │
Table
   │
Row
   │
Column


MongoDB

Database
   │
Collection
   │
Document
   │
Field
```

---

# Most Used Commands

```javascript
show dbs

use college

db

show collections

db.students.find()

db.students.findOne()

db.students.insertOne()

db.students.insertMany()

db.students.updateOne()

db.students.updateMany()

db.students.deleteOne()

db.students.deleteMany()
```

---

# Interview Nuggets ⭐

### Why BSON?

Because Binary JSON is faster and supports more data types than JSON.

---

### Collection vs Table

Collection = Flexible

Table = Fixed Schema

---

### Why _id?

Unique identifier for every document.

---

### insertOne vs insertMany

One inserts one document.

The other inserts multiple documents.

---

### find vs findOne

find()

➡ returns multiple documents (cursor)

findOne()

➡ returns first matching document

---

### updateOne vs replaceOne

updateOne()

➡ modifies selected fields

replaceOne()

➡ replaces the whole document

---

# 🚀 Quick Revision Checklist

✅ Database

✅ Collection

✅ Document

✅ Field

✅ JSON

✅ BSON

✅ ObjectId

✅ Mongo Shell

✅ insertOne

✅ insertMany

✅ find

✅ findOne

✅ updateOne

✅ updateMany

✅ replaceOne

✅ deleteOne

✅ deleteMany

✅ $set

✅ $inc

✅ $unset

✅ $push

✅ $pull

✅ $gt

✅ $lt

✅ $gte

✅ $lte

✅ $ne

✅ $or

---

# 🎯 One-Line Summary

> MongoDB is a NoSQL database that stores flexible JSON-like documents (internally as BSON) inside collections, allowing fast and scalable CRUD operations without a fixed schema.