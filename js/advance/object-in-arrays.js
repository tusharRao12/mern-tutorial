// Managing a list of students

const students = [
    {
        id:1,
        name:'Bob',
        grade:'A'
    },
    {
        id:2,
        name:'Ron',
        grade:'B'
    }
]

// Accising studend
const student1 = students[0].name;

// Add new student

const addStudent = (id,name,grade)=>{
    // const newStudent = {id:id,name:name,grade:grade};
    const newStudent = {id,name,grade};
    // push new student in student array
    students.push(newStudent);
}
addStudent(3,'Nikhil','C');
// console.log(students)

// Update student
const updateStudentGrade = (id,newGrade)=>{
    // find student bu id
    const studentFound = students.find((studend)=>{
        return studend.id === id
    })
    if(studentFound){
        studentFound.grade = newGrade
    }else{
        console.log('Studnet not found')
    }
};

updateStudentGrade(2,'F');
console.log(students);