# 📚 Mongoose Advanced Features Practice Exercise (Part 2)

## 🎯 Objective

Continue building your **Student Database** by learning advanced Mongoose concepts.

By the end of this exercise you should be comfortable with:

- Additional Schema Constraints
- Validating Updates
- Handling Validation Errors
- Model Instance Methods
- Model Static Methods
- Virtual Properties
- Mongoose Middleware (Pre/Post Hooks)

---

# Project Structure

```
StudentDB/
│
├── index.js
├── package.json
└── README.md
```

Use the same **studentDB** database and **Student** model from the previous exercise.

---

# Current Schema

Continue using your previous schema.

Add the new constraints and methods as instructed below.

---

# Tasks

---

## ✅ Task 1 — Additional Schema Constraints

Modify your schema to include the following additional validations.

| Field | Constraint |
|---------|------------|
| name | minlength: 3 |
| name | maxlength: 30 |
| grade | required |
| email | required, lowercase, unique |
| course | immutable |
| createdAt | default: Date.now |

Example document

```javascript
{
    name: "Alice",
    age: 20,
    grade: 91,
    email: "Alice@College.com",
    course: "CSE"
}
```

Observe what Mongoose automatically changes.

---

## ✅ Task 2 — Test Additional Constraints

Try inserting the following documents.

### Case 1

```javascript
{
    name: "Al",
    age: 20,
    grade: 90,
    email: "al@gmail.com",
    course: "CSE"
}
```

Expected:

```
Validation Error
```

---

### Case 2

```javascript
{
    name: "Robert",
    age: 20,
    grade: 90,
    course: "ECE"
}
```

Expected:

```
Validation Error
```

---

### Case 3

Insert two students with the same email.

Observe what happens.

---

## ✅ Task 3 — Validating Updates

Update Alice.

```
grade → 120
```

Does Mongoose throw a validation error?

If not,

modify the update operation so that validations are enforced.

Hint:

```
runValidators
```

---

## ✅ Task 4 — Validation Errors

Write a custom function that catches validation errors.

Instead of printing

```
ValidationError
```

Print

```
Invalid Student Data
```

along with the actual error message.

---

## ✅ Task 5 — Custom Validation Message

Modify your schema so that

```
grade > 100
```

produces

```
Grade cannot exceed 100.
```

instead of the default message.

Also customize the message for

```
age < 16
```

---

## ✅ Task 6 — Create Your First Instance Method

Create an instance method named

```
graduate()
```

It should

- set

```
isGraduated = true
```

- save the document
- return the updated student

---

Example

```javascript
const student = await Student.findOne({ name: "Bob" });

await student.graduate();
```

Expected

```
Bob is now graduated.
```

---

## ✅ Task 7 — Create Another Instance Method

Create

```
increaseGrade(points)
```

Example

```javascript
student.increaseGrade(5);
```

Bob's grade

```
85

↓

90
```

Save the document automatically.

---

## ✅ Task 8 — Static Methods

Create a static method named

```
findGraduates()
```

It should return

```
all students
whose isGraduated is true
```

Example

```javascript
Student.findGraduates();
```

---

## ✅ Task 9 — Another Static Method

Create

```
topStudents()
```

Return

```
Top 3 students
```

sorted by

```
grade
```

descending.

---

## ✅ Task 10 — Virtual Property

Create a virtual property named

```
studentInfo
```

When accessed

```javascript
student.studentInfo
```

it should return

```
Alice (CSE)
```

without storing anything in MongoDB.

---

## ✅ Task 11 — Another Virtual

Create

```
status
```

If

```
grade >= 90
```

Return

```
Excellent
```

Else if

```
grade >= 75
```

Return

```
Good
```

Else

```
Needs Improvement
```

---

## ✅ Task 12 — Pre Save Middleware

Create middleware that runs

before

```
save()
```

Print

```
Saving Student...
```

before every save.

---

## ✅ Task 13 — Post Save Middleware

After saving

print

```
Student Saved Successfully!
```

---

## ✅ Task 14 — Pre Delete Middleware

Before deleting any student

print

```
Deleting Student...
```

---

## ✅ Task 15 — Post Delete Middleware

After deleting

print

```
Student Deleted.
```

---

# Bonus Challenges

---

## ⭐ Challenge 1

Create a custom validator that allows

```
grade
```

only if

```
grade >= age
```

Otherwise

throw a validation error.

---

## ⭐ Challenge 2

Create a virtual property

```
isExcellent
```

Returns

```
true
```

if

```
grade >= 90
```

otherwise

```
false
```

---

## ⭐ Challenge 3

Create an instance method

```
changeCourse(newCourse)
```

Update the student's course.

Observe what happens if

```
course
```

is immutable.

---

## ⭐ Challenge 4

Create a static method

```
averageGrade()
```

Return the average grade of all students.

---

## ⭐ Challenge 5

Create middleware that automatically converts every student's name to uppercase before saving.

Example

```
Alice

↓

ALICE
```

---

## ⭐ Challenge 6

Create middleware that prevents saving students whose

```
grade < 35
```

Throw

```
Student has failed and cannot be saved.
```

---

## ⭐ Challenge 7

Create a virtual property

```
emailDomain
```

Example

```
alice@gmail.com

↓

gmail.com
```

---

# Final Challenge

Without referring to your notes, rebuild the Student model with all of the following:

- Advanced schema constraints
- Custom validation messages
- Update validation
- Instance methods
- Static methods
- Virtual properties
- Pre middleware
- Post middleware

Then write a program that

- Inserts students
- Uses every instance method
- Uses every static method
- Prints every virtual property
- Demonstrates update validation
- Demonstrates middleware execution
- Demonstrates custom validation errors

---

# Success Checklist

- [ ] Added additional schema constraints
- [ ] Tested unique fields
- [ ] Used immutable fields
- [ ] Used lowercase
- [ ] Used default values
- [ ] Validated updates
- [ ] Customized validation errors
- [ ] Created instance methods
- [ ] Created static methods
- [ ] Created virtual properties
- [ ] Created pre middleware
- [ ] Created post middleware
- [ ] Completed all bonus challenges
- [ ] Built the complete advanced Student model without referring to notes

---

## 🎉 Goal

If you can complete every task in this README without searching for syntax, you've mastered the advanced Mongoose features needed to build real-world models with reusable methods, computed properties, validation, and lifecycle hooks.