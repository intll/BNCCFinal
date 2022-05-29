const firebaseConfig = {
    apiKey: "AIzaSyD8wGxDI3x64hVtgPIUmJ5bSfTjqzy6c4s",
    authDomain: "bncc-finalproject.firebaseapp.com",
    projectId: "bncc-finalproject",
    storageBucket: "bncc-finalproject.appspot.com",
    messagingSenderId: "478748214235",
    appId: "1:478748214235:web:8eb0031c1cbb9ea6059dfe",
    measurementId: "G-65Y8ZJNYEG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
const db = firestore.collection("Data");

const submitBtn = document.querySelector("#registerBtn");

let userName = document.querySelector("#user_name");
let userEmail = document.querySelector("#user_email");
let userPhoneNumber = document.querySelector("#user_number");
let userOptions = document.getElementById("user_options");

//Validation
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    let input_name = userName.value;
    let input_email = userEmail.value;
    let input_number = userPhoneNumber.value;
    let input_options = userOptions.options[userOptions.selectedIndex].text;
    let error1 = document.querySelector("#error1");
    let error2 = document.querySelector("#error2");
    let error3 = document.querySelector("#error3");
    let error4 = document.querySelector("#error4");

    error1.innerText='';
    error2.innerText='';
    error3.innerText='';
    error4.innerText='';
    $("#successMessage").addClass("d-none");

    if (input_name.length < 3) {
        // alert("Name must be at least 3 characters long")
        error1.innerText = "Name must be at least 3 characters long";
        $("#user_name").addClass("error")
        setTimeout(function () {
            $("#user_name").removeClass("error");
        }, 3000);
    }
    else if (!input_email.includes('@') || input_email.length < 1) {
        // alert("Email must include '@' and cannot be empty!")
        error2.innerText = "Email must include '@' and cannot be empty!";
        $("#user_email").addClass("error")
        setTimeout(function () {
            $("#user_email").removeClass("error");
        }, 3000);
    }
    else if (input_number.length > 14 || !input_number.startsWith("08")) {
        // alert("Phone number must start with '08' and at max 14 digits!")
        error3.innerText = "Phone number must start with '08' and at max 14 digits!";
        $("#user_number").addClass("error")
        setTimeout(function () {
            $("#user_number").removeClass("error");
        }, 3000);
    }
    else if (!document.getElementById("policy").checked) {
        // alert("You must agree to our policy before registering!")
        error4.innerText = "You must agree to our policy before registering!";
        $("#policy").addClass("error")
        setTimeout(function () {
            $("#policy").removeClass("error");
        }, 3000);
    }
    else {
        let param = { Name: input_name, Email: input_email, PhoneNumber: input_number, Options: input_options }
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'POST',
            data: JSON.stringify(param),
            success: function (data) {
                console.log(data);
            }
        })
        db.doc().set({
            Name: input_name,
            Email: input_email,
            Number: input_number,
            Option: input_options
        }).then(function () {
            console.log("Data Submitted");
        });
        $("#user_name").val("");
        $("#user_email").val("");
        $("#user_number").val("");
        $("#successMessage").removeClass("d-none");
    }
});
