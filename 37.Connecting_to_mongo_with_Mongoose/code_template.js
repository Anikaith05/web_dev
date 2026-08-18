// ============================================================
// MONGOOSE — COMPLETE REFERENCE TEMPLATE
// Covers:
// 1. Connecting to MongoDB
// 2. Schema
// 3. Model
// 4. Creating documents
// 5. insertMany()
// 6. Finding documents
// 7. Updating documents
// 8. Deleting documents
// 9. Schema validation
// 10. Custom validation / constraints
// 11. Update validation
// 12. Validation errors
// 13. Instance methods
// 14. Static methods
// 15. Virtuals
// 16. Middleware
// ============================================================


const mongoose = require("mongoose");


// ============================================================
// 1. CONNECTING TO MONGODB
// ============================================================

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.log("Connection error:", err);
    });


// ============================================================
// 2. SCHEMA
// ============================================================

// Schema = blueprint/structure of documents

const userSchema = new mongoose.Schema({

    name: {
        type: String,

        // Required
        required: true,

        // Remove whitespace
        trim: true,

        // Minimum/maximum length
        minlength: 2,
        maxlength: 50
    },

    email: {
        type: String,

        required: true,

        // Convert to lowercase
        lowercase: true,

        // Cannot have duplicate values
        unique: true
    },

    age: {
        type: Number,

        required: true,

        min: 18,
        max: 100
    },

    password: {
        type: String,

        required: true,

        minlength: 8
    },

    role: {
        type: String,

        // Only these values are allowed
        enum: ["user", "admin"],

        default: "user"
    },

    isActive: {
        type: Boolean,

        default: true
    },

    createdAt: {
        type: Date,

        default: Date.now
    }

});


// ============================================================
// 3. MODEL
// ============================================================

// Schema -> Model -> Documents

const User = mongoose.model("User", userSchema);

// MongoDB will create/use a collection roughly:
// users


// ============================================================
// 4. CREATE ONE DOCUMENT
// ============================================================

async function createUser() {

    try {

        const user = new User({
            name: "John",
            email: "john@gmail.com",
            age: 22,
            password: "password123"
        });

        // Actually save to MongoDB
        const savedUser = await user.save();

        console.log(savedUser);

    } catch (err) {

        console.log(err);

    }
}


// ============================================================
// 5. CREATE DOCUMENT USING create()
// ============================================================

async function createUser2() {

    try {

        const user = await User.create({
            name: "Alice",
            email: "alice@gmail.com",
            age: 25,
            password: "password123"
        });

        console.log(user);

    } catch (err) {

        console.log(err);

    }
}


// ============================================================
// 6. INSERT MANY
// ============================================================

async function insertManyUsers() {

    try {

        const users = await User.insertMany([

            {
                name: "John",
                email: "john2@gmail.com",
                age: 21,
                password: "password123"
            },

            {
                name: "Bob",
                email: "bob@gmail.com",
                age: 30,
                password: "password123"
            }

        ]);

        console.log(users);

    } catch (err) {

        console.log(err);

    }
}


// ============================================================
// 7. FIND DOCUMENTS
// ============================================================

// Find ALL users

async function findAllUsers() {

    const users = await User.find();

    console.log(users);
}


// ------------------------------------------------------------
// Find users matching a condition
// ------------------------------------------------------------

async function findUsers() {

    const users = await User.find({
        age: { $gte: 18 }
    });

    console.log(users);
}


// ------------------------------------------------------------
// Find ONE
// ------------------------------------------------------------

async function findOneUser() {

    const user = await User.findOne({
        email: "john@gmail.com"
    });

    console.log(user);
}


// ------------------------------------------------------------
// Find by ID
// ------------------------------------------------------------

async function findUserById(id) {

    const user = await User.findById(id);

    console.log(user);
}


// ============================================================
// 8. QUERY OPERATORS
// ============================================================

async function queryExamples() {

    // Greater than
    await User.find({
        age: { $gt: 18 }
    });

    // Greater than or equal
    await User.find({
        age: { $gte: 18 }
    });

    // Less than
    await User.find({
        age: { $lt: 30 }
    });

    // Less than or equal
    await User.find({
        age: { $lte: 30 }
    });

    // Not equal
    await User.find({
        age: { $ne: 25 }
    });

    // In
    await User.find({
        role: { $in: ["user", "admin"] }
    });

}


// ============================================================
// 9. UPDATING
// ============================================================

// ------------------------------------------------------------
// updateOne()
// ------------------------------------------------------------

async function updateUser() {

    const result = await User.updateOne(

        // Find
        { email: "john@gmail.com" },

        // Update
        {
            $set: {
                age: 25
            }
        }

    );

    console.log(result);
}


// ------------------------------------------------------------
// updateMany()
// ------------------------------------------------------------

async function updateManyUsers() {

    const result = await User.updateMany(

        { role: "user" },

        {
            $set: {
                isActive: false
            }
        }

    );

    console.log(result);
}


// ============================================================
// 10. findByIdAndUpdate()
// ============================================================

async function updateById(id) {

    const updatedUser = await User.findByIdAndUpdate(

        id,

        {
            $set: {
                age: 30
            }
        },

        {
            // Return updated document
            new: true,

            // IMPORTANT:
            // Run schema validators during update
            runValidators: true
        }

    );

    console.log(updatedUser);
}


// ============================================================
// 11. findOneAndUpdate()
// ============================================================

async function updateOneUser() {

    const user = await User.findOneAndUpdate(

        {
            email: "john@gmail.com"
        },

        {
            $set: {
                age: 28
            }
        },

        {
            new: true,
            runValidators: true
        }

    );

    console.log(user);
}


// ============================================================
// 12. DELETING
// ============================================================

// Delete ONE

async function deleteUser() {

    const result = await User.deleteOne({
        email: "john@gmail.com"
    });

    console.log(result);
}


// ------------------------------------------------------------
// Delete MANY
// ------------------------------------------------------------

async function deleteUsers() {

    const result = await User.deleteMany({
        isActive: false
    });

    console.log(result);
}


// ------------------------------------------------------------
// Delete by ID
// ------------------------------------------------------------

async function deleteById(id) {

    const user = await User.findByIdAndDelete(id);

    console.log(user);
}


// ============================================================
// 13. SCHEMA VALIDATION
// ============================================================

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,

        required: true,

        // price >= 0
        min: 0
    },

    quantity: {
        type: Number,

        required: true,

        min: 0
    },

    category: {
        type: String,

        enum: [
            "electronics",
            "clothing",
            "food"
        ]
    }

});


// ============================================================
// 14. CUSTOM VALIDATION
// ============================================================

const studentSchema = new mongoose.Schema({

    age: {
        type: Number,

        validate: {

            validator: function(value) {

                return value >= 18;

            },

            message: "Student must be at least 18 years old"

        }
    },

    username: {

        type: String,

        validate: {

            validator: function(value) {

                // Username must contain only letters/numbers
                return /^[a-zA-Z0-9]+$/.test(value);

            },

            message: "Username contains invalid characters"

        }

    }

});


// ============================================================
// 15. VALIDATION ERRORS
// ============================================================

async function validationExample() {

    try {

        await User.create({

            // Missing name
            email: "test@gmail.com",

            // Invalid age
            age: 10,

            password: "123"

        });

    } catch (err) {

        if (err.name === "ValidationError") {

            console.log("Validation failed");

            // Individual validation errors
            for (const field in err.errors) {

                console.log(
                    field,
                    "=>",
                    err.errors[field].message
                );

            }

        }

    }

}


// ============================================================
// 16. VALIDATING UPDATES
// ============================================================

// IMPORTANT:
//
// This:

User.findByIdAndUpdate(
    id,
    { age: 10 }
);


// may NOT run normal schema validators by default.
//
// Use:

User.findByIdAndUpdate(

    id,

    {
        age: 10
    },

    {
        runValidators: true
    }

);


// ============================================================
// 17. INSTANCE METHODS
// ============================================================

// Instance method = method available on an individual document

userSchema.methods.sayHello = function() {

    return `Hello, my name is ${this.name}`;

};


// Usage:

async function instanceMethodExample() {

    const user = await User.findOne();

    console.log(user.sayHello());

}


// IMPORTANT:
//
// user.sayHello()
//
// NOT:
//
// User.sayHello()


// ============================================================
// 18. INSTANCE METHOD EXAMPLE
// ============================================================

userSchema.methods.isAdult = function() {

    return this.age >= 18;

};


// Usage:

const user = await User.findOne();

if (user.isAdult()) {

    console.log("Adult");

}


// ============================================================
// 19. STATIC METHODS
// ============================================================

// Static method = method available on the MODEL itself

userSchema.statics.findAdults = function() {

    return this.find({
        age: { $gte: 18 }
    });

};


// Usage:

async function staticExample() {

    const adults = await User.findAdults();

    console.log(adults);

}


// Difference:
//
// INSTANCE:
//
// user.isAdult()
//
// STATIC:
//
// User.findAdults()


// ============================================================
// 20. VIRTUALS
// ============================================================

// Virtual = calculated property
//
// It is NOT stored in MongoDB.

userSchema.virtual("info").get(function() {

    return `${this.name} (${this.age})`;

});


// Usage:

const user2 = await User.findOne();

console.log(user2.info);


// MongoDB does NOT contain:
//
// info: "John (25)"
//
// It is calculated when accessed.


// ============================================================
// 21. VIRTUAL SETTER
// ============================================================

userSchema.virtual("fullName")

    .get(function() {

        return `${this.firstName} ${this.lastName}`;

    })

    .set(function(value) {

        const parts = value.split(" ");

        this.firstName = parts[0];

        this.lastName = parts[1];

    });


// ============================================================
// 22. MIDDLEWARE
// ============================================================

// Middleware = function that runs BEFORE/AFTER an operation


// ------------------------------------------------------------
// PRE SAVE
// ------------------------------------------------------------

userSchema.pre("save", function(next) {

    console.log("About to save user");

    // Do something before saving

    next();

});


// ------------------------------------------------------------
// POST SAVE
// ------------------------------------------------------------

userSchema.post("save", function(doc, next) {

    console.log("User saved:", doc.name);

    next();

});


// ============================================================
// 23. PRE SAVE USE CASE
// ============================================================

// Example:
//
// Password hashing would normally happen here.

userSchema.pre("save", async function(next) {

    if (!this.isModified("password")) {

        return next();

    }

    // Example:
    // this.password = await bcrypt.hash(this.password, 10);

    next();

});


// ============================================================
// 24. QUERY MIDDLEWARE
// ============================================================

// Middleware for find()

userSchema.pre("find", function(next) {

    console.log("Find query is about to run");

    next();

});


// Example:
//
// Automatically only return active users.

userSchema.pre("find", function(next) {

    this.where({
        isActive: true
    });

    next();

});


// ============================================================
// 25. COMPLETE FLOW
// ============================================================

/*

                    MongoDB
                       ↑
                       |
                    Mongoose
                       |
                    Model
                       |
                    Schema
                       |
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      Create         Read           Update/Delete
        |
     Validation
        |
    Middleware
        |
      Document
        |
   Instance Methods


Schema
  ↓
Model
  ↓
Document
  ↓
MongoDB


*/


// ============================================================
// 26. THE CRUD CHEAT SHEET
// ============================================================

/*

CREATE
------

User.create({...})

new User({...}).save()

User.insertMany([...])



READ
----

User.find()

User.findOne({...})

User.findById(id)



UPDATE
------

User.updateOne(
    filter,
    update
)

User.updateMany(
    filter,
    update
)

User.findOneAndUpdate(
    filter,
    update,
    options
)

User.findByIdAndUpdate(
    id,
    update,
    options
)



DELETE
------

User.deleteOne({...})

User.deleteMany({...})

User.findOneAndDelete({...})

User.findByIdAndDelete(id)



VALIDATION
----------

required
min
max
minlength
maxlength
enum
match
validate
unique



METHODS
-------

Schema.methods.methodName
    ↓
document.methodName()



STATICS
-------

Schema.statics.methodName
    ↓
Model.methodName()



VIRTUALS
--------

Schema.virtual("name")
    ↓
Calculated property
    ↓
NOT stored in DB



MIDDLEWARE
----------

pre("save")
post("save")

pre("find")
post("find")

pre("findOne")
post("findOne")

pre("deleteOne")
post("deleteOne")

etc.

*/