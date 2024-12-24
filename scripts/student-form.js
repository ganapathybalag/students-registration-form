var students = getStudentLocalStorage() || [];
document.getElementById('usingForUpdate').value = '';

const DEPARTMENT = {
    '10': 'Master of Computer Applications',
    '11': 'Information Technology',
    '12': 'Computer Science'
}

function formSubmit(event) {
    event.preventDefault();
    const index = document.getElementById('usingForUpdate').value;
    const formData = {};
    const form = document.getElementById('myForm');
    Array.from(form.elements).forEach(element => {
        if (element.name && element.value) {
            if (element.type === 'radio' && element.checked) {
                formData[element.name] = element.value;
            } else if (element.type !== 'radio') {
                formData[element.name] = element.value;
            }
        }
    });
    if (index) {
        students.splice(index, 1, formData);
        const message = `<h4 class="text-blue-600 text-md">Information About Update</h4><p class="mt-2 text-sm text-gray-600">Studennt Information Updated Successfully!<p>`;
        alertToast(message);
    } else {
        students.push(formData);
        const message = `<h4 class="text-blue-600 text-md">Information About Submit</h4><p class="mt-2 text-sm text-gray-600">Studennt Information Added Successfully!<p>`;
        alertToast(message);
    }
    setStudentLocalStorage();
    form.reset();
    document.getElementById('submitBtn').innerText = 'Submit';
    document.getElementById('usingForUpdate').value = '';
    getLatestStudentAndCreateTable();
}

getLatestStudentAndCreateTable();
/* let a = ['test1', 'test2', 'test3'];
for(let adata of a) {
    console.log(adata);
} 

const marks = [90, 80, 70, 60, 40];
const total = marks.reduce((prev, cur) => {
    console.log(prev);
    console.log(cur);
    console.log(prev + cur);
    return prev + cur;
})*/

function studentsTableCreate() {
    const tableBody = document.getElementById("table-student-reults");
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const subjects = [parseInt(student.subject1), parseInt(student.subject2), parseInt(student.subject3)];
        student.total = subjects.reduce((prev, cur) => prev + cur);
        student.average = Math.round(student.total / subjects.length);
        const failMarks = subjects.filter(subject => subject < 50);
        student.result = failMarks.length ? 'Fail' : 'Pass';
        renderStudentresults(index, student);
        return student;
    });
}


function renderStudentresults(index, student) {
    const row = `<tr>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${index + 1}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.rollNumber}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.name}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.email}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${DEPARTMENT[student.department]}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.gender}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.dob}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.phone}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.subject1}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.subject2}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.subject3}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.total}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">${student.average}</td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700"><span class="${getBadgeClass(student.result)}">${student.result}</span></td>
    <td class="p-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
        <span class="pr-2">
            <a href="javascript:void(0)" class="updateStudent" data-index="${index}">Edit</a>
        </span>
        <span>
            <a href="javascript:void(0)" class="deleteStudent" data-index="${index}">Delete</a>
        </span>
    </td>
    </tr>`;
    const tableBody = document.getElementById("table-student-reults");
    tableBody.innerHTML += row; //tableBody.innerHTML = tableBody.innerHTML + row;
}

function getBadgeClass(result) {
    return result == 'Pass' ? 'px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full' : 'px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full'
}

document.getElementById("table-student-reults").addEventListener("click", function (event) {
    const target = event.target;

    // Handle Edit Button Click
    if (target.classList.contains("updateStudent")) {
        const index = target.getAttribute("data-index");
        updateStudent(index); // Call the editStudent function
    }

    // Handle Delete Button Click
    if (target.classList.contains("deleteStudent")) {
        const index = target.getAttribute("data-index");
        deleteStudent(index); // Call the deleteStudent function
    }
});


function updateStudent(index) {
    const student = students[index];
    Object.keys(student).forEach(key => {
        if (document.getElementById(key)) {
            document.getElementById(key).value = student[key];
        } else {
            const elements = document.getElementsByName(key); // Get all radio buttons by name
            elements.forEach((element) => {
                if (element.type === 'radio' && element.value === student[key]) {
                    element.checked = true; // Set the radio button to checked
                }
            });
        }
    });
    document.getElementById('usingForUpdate').value = index;
    document.getElementById('submitBtn').innerText = 'Update';
}

function deleteStudent(index) {
    students.splice(index, 1);
    setStudentLocalStorage();
    getLatestStudentAndCreateTable();
    const message = `<h4 class="text-blue-600 text-md">Information About Delete</h4><p class="mt-2 text-sm text-gray-600">Studennt Information Delete Successfully!<p>`;
    alertToast(message);
}

function setStudentLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function getStudentLocalStorage() {
    return JSON.parse(localStorage.getItem('students'))
}

function getLatestStudentAndCreateTable() {
    students = getStudentLocalStorage();
    studentsTableCreate();
}

function alertToast(message) {
    document.getElementById('toast').style.display = 'block';
    document.getElementById('toast').innerHTML = message;
    setTimeout(() => {
        document.getElementById('toast').style.display = 'none';
        document.getElementById('toast').innerHTML = '';
    }, 7000);
}
