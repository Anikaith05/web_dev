const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/studentDB").then((result)=>{
    console.log("Success!!")})
    .catch((err)=>{
    console.log("Error!!");
});

const stschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age: Number,
    grade: Number,
    course: String,
    isGraduate: Boolean
});

const student= new mongoose.model("student",stschema);

//Task4
student.insertOne({
    name:'Alice',
    age:20,
    grade:91,
    course:'CSE'
});

//Task5
student.insertMany([{name:'Bob',age:19,grade:85,course:'ECE'},
    {name:'Charlie',age:22,grade:76,course:'MECH'},
    {name:'David',age:'24',grade:95,course:'CSE'},
    {name:'emma',age:21,grade:88,course:'CIVIL'}
]);

//Task6
student.find({})
    .then((students)=>{
        console.log(students);
    })
    .catch((err)=>{
        console.log(err);
    });

//Task7

student.find({course:'CSE'})
    .then((student)=>{
        console.log(student);
    })
    .catch((err)=>{
        console.log(err);
    });

// //Task 8
student.findOne({name:'Bob'})
    .then((student)=>{
        console.log(student);
    })
    .catch((err)=>{
        console.log(err);
    });

//Task9
student.findById('6a68c8e352a047c01846dcf7')
    .then((student)=>{
        console.log(student);
    })
    .catch((err)=>{
        console.log(err);
    });

//Task 10
student.updateOne({grade:91},{grade:95},{new:true})
    .then((result)=>{
        console.log(result);
    });

//Task 11

student.updateMany(
    {course:'CSE'},
    {
        $set:{
        isGraduate:true
        }
    }
).then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
});

//Task 12

student.findByIdAndUpdate(
    '6a68c8e352a047c01846dcf7',
    {age:20},
    {new:true}
).then((student)=>{
    console.log(student);
}).catch((err)=>{
    console.log(err);
});

//Task 13

student.deleteOne({name:'Charlie'}).then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
});

//Task 14
student.deleteMany({course:'CIVIL'}).then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
});

//Task 15

student.findByIdAndDelete('6a68c8e352a047c01846dcf7')
    .then((student)=>{
        console.log(student);
    }).catch((err)=>{
        console.log(err);
    });

//Task 16
student.insertOne({name:"",age:10,grade:140,course:"MBA"});
//will give us an error

//Challenge 1
student.find({grade:{$gt:90}})
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    });

//Challenge 2
student.find({grade:{$gte:80}})
    .sort({grade:-1})
    .then((student)=>{
        console.log(student);
    })
    .catch((err)=>{
        console.log(err);
    });

//Challenge 3
student.find({grade:{$gte:80}})
    .select("name grade")
    .then((student)=>{
        console.log(student);
    })
    .catch((err)=>{
        console.log(err);
    });

//Challenge 4
student.find({})
    .sort({grade:-1})
    .limit(2)
    .then((student)=>{
        console.log(student);
    })
    .catch((err)=>{
        console.log(err);
    });

//Challenge 5
student.find({
    course:{
        $in:['CSE','ECE']
    }
})
.then((student)=>{
    console.log(student);
})
.catch((err)=>{
    console.log(err);
});

//Challenge 6
student.find({
    course:{
        $ne:'MECH'
    }
})
.then((student)=>{
    console.log(student);
})
.catch((err)=>{
    console.log(err);
});

//Challenge 7
student.updateMany(
    {},
    {
        $inc:{
            grade:5
        }
    }
)
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
})