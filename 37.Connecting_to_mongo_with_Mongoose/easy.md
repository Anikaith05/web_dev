# 📚 Mongoose CRUD Practice Exercise (Easy)

## 🎯 Objective

Build a simple **Student Database** using **MongoDB + Mongoose**.

By the end of this exercise you should be comfortable with:

- Connecting to MongoDB
- Creating Schemas
- Creating Models
- Saving Documents
- Inserting Multiple Documents
- Finding Documents
- Updating Documents
- Deleting Documents
- Using Schema Validations

---

# Project Structure

```
StudentDB/
│
├── index.js
├── package.json
└── README.md
```

---

# Database

Create a database named:

```
studentDB
```

---

# Student Schema

Create a schema with the following fields.

| Field | Type | Validation |
|--------|------|------------|
| name | String | required, trim |
| age | Number | min:16, max:60 |
| grade | Number | min:0, max:100 |
| course | String | enum: CSE, ECE, MECH, CIVIL |
| isGraduated | Boolean | default:false |

---

# Tasks

---

## ✅ Task 1 — Connect to MongoDB

Connect Mongoose to

```
mongodb://127.0.0.1:27017/studentDB
```

Expected output:

```
Connected Successfully!
```

---

## ✅ Task 2 — Create the Schema

Create the Student schema using the validations above.

---

## ✅ Task 3 — Create the Model

Create a model named

```
Student
```

---

## ✅ Task 4 — Insert One Student

Insert the following student using **save()**.

```
Name : Alice
Age : 20
Grade : 91
Course : CSE
```

Print the inserted document.

---

## ✅ Task 5 — Insert Multiple Students

Insert all of the following students using **insertMany()**.

| Name | Age | Grade | Course |
|------|-----|------|--------|
| Bob | 19 | 85 | ECE |
| Charlie | 22 | 76 | MECH |
| David | 24 | 95 | CSE |
| Emma | 21 | 88 | CIVIL |

Print the inserted documents.

---

## ✅ Task 6 — Find All Students

Retrieve every student from the database.

Use:

```
find()
```

---

## ✅ Task 7 — Find Students by Course

Retrieve every student whose course is

```
CSE
```

---

## ✅ Task 8 — Find One Student

Retrieve

```
Bob
```

Use

```
findOne()
```

---

## ✅ Task 9 — Find By ID

Copy the `_id` of any student.

Retrieve that student using

```
findById()
```

---

## ✅ Task 10 — Update One Student

Update Alice's grade.

```
Old Grade : 91

New Grade : 95
```

Use

```
updateOne()
```

---

## ✅ Task 11 — Update Multiple Students

Update every student in

```
ECE
```

Set

```
isGraduated = true
```

Use

```
updateMany()
```

---

## ✅ Task 12 — Find By ID And Update

Choose any student.

Increase their grade.

Use

```
findByIdAndUpdate()
```

Return the updated document.

---

## ✅ Task 13 — Delete One Student

Delete

```
Charlie
```

Use

```
deleteOne()
```

---

## ✅ Task 14 — Delete Multiple Students

Delete every student in

```
CIVIL
```

Use

```
deleteMany()
```

---

## ✅ Task 15 — Find By ID And Delete

Delete any remaining student using

```
findByIdAndDelete()
```

---

## ✅ Task 16 — Validation Test

Try inserting the following document.

```javascript
{
    name: "",
    age: 10,
    grade: 140,
    course: "MBA"
}
```

Observe which validation errors Mongoose throws.

---

# Bonus Challenges

---

## ⭐ Challenge 1

Find students whose grade is greater than **90**.

Hint:

```
$gt
```

---

## ⭐ Challenge 2

Find students whose grade is greater than or equal to **80**.

Sort them from highest to lowest.

Hints:

```
$gte
sort()
```

---

## ⭐ Challenge 3

Display only

- name
- course

Hints:

```
select()
```

---

## ⭐ Challenge 4

Display only the **Top 2 highest scoring students**.

Hints:

```
sort()
limit()
```

---

## ⭐ Challenge 5

Find every student whose course is either

```
CSE
```

or

```
ECE
```

Hint:

```
$in
```

---

## ⭐ Challenge 6

Find every student whose course is **not**

```
MECH
```

Hint:

```
$ne
```

---

## ⭐ Challenge 7

Increase everyone's grade by **5**.

Hint:

```
$inc
```

---

# Final Challenge

Without referring to your notes, build the complete application from scratch.

Your program should:

- Connect to MongoDB
- Create the schema
- Create the model
- Insert one student
- Insert many students
- Find all students
- Find CSE students
- Find one student
- Find by ID
- Update one student
- Update many students
- Delete one student
- Delete many students
- Delete by ID
- Print the final database contents

---

# Success Checklist

- [ ] Connected to MongoDB
- [ ] Created Schema
- [ ] Created Model
- [ ] Used `save()`
- [ ] Used `insertMany()`
- [ ] Used `find()`
- [ ] Used `findOne()`
- [ ] Used `findById()`
- [ ] Used `updateOne()`
- [ ] Used `updateMany()`
- [ ] Used `findByIdAndUpdate()`
- [ ] Used `deleteOne()`
- [ ] Used `deleteMany()`
- [ ] Used `findByIdAndDelete()`
- [ ] Tested schema validations
- [ ] Completed bonus challenges
- [ ] Built the entire CRUD application without looking at notes

---

## 🎉 Goal

If you can complete every task in this README without searching for the syntax, you've mastered the Mongoose CRUD fundamentals and are ready to build small backend applications using MongoDB and Mongoose.