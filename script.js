let input = document.getElementById("name");

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        validateName();
    }
});

function validateName() {
    let name = input.value.trim();
    let result = document.getElementById("nameResult");

    // 1️⃣ Empty Check
    if (name === "") {
        result.innerHTML = "❌ Please enter your name";
        return;
    }

    // 2️⃣ Minimum Length
    if (name.length < 3) {
        result.innerHTML = "❌ Name must be at least 3 characters";
        return;
    }

    // 3️⃣ Only Letters Allowed
    let regex = /^[A-Za-z\s]+$/;
    if (!regex.test(name)) {
        result.innerHTML = "❌ Only letters allowed (No numbers or symbols)";
        return;
    }

    // 4️⃣ Remove Extra Spaces
    name = name.replace(/\s+/g, " ");

    // 5️⃣ Capitalize Every Word
    let formattedName = name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

    result.innerHTML = "✅ Valid Name: " + formattedName;
}

let emailInput = document.getElementById("email");
let gmailresult = document.getElementById("emailResult");

emailInput.addEventListener("input", function () {

    let username = emailInput.value.replace("@gmail.com", "").trim();

    // Remove spaces
    username = username.replace(/\s+/g, "");

    // Only allow letters & numbers
    let regex = /^[a-zA-Z0-9._]*$/;

    if (!regex.test(username)) {
        result.innerHTML = "❌ Only letters, numbers, dot and underscore allowed";
        emailInput.style.border = "2px solid red";
        return;
    }

    if (username === "") {
        result.innerHTML = "❌ Please enter username";
        emailInput.style.border = "2px solid red";
        return;
    }

    // Automatically add @gmail.com
    emailInput.value = username + "@gmail.com";

    gmailresult.innerHTML = "✅ Valid Gmail";
    emailInput.style.border = "2px solid green";
});

let dobInput = document.getElementById("dob");
let dateresult = document.getElementById("dobResult");

dobInput.addEventListener("input", function () {

    let dobValue = dobInput.value;

    if (dobValue === "") {
        result.innerHTML = "❌ Please select your date of birth";
        dobInput.style.border = "2px solid red";
        return;
    }

    let today = new Date();
    let birthDate = new Date(dobValue);

    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (
        monthDifference < 0 || 
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    if (age < 13) {
        result.innerHTML = "❌ You must be at least 13 years old";
        dobInput.style.border = "2px solid red";
    } else {
        dateresult.innerHTML = "✅ Valid DOB | Your Age: " + age + " years";
        dobInput.style.border = "2px solid green";
    }
});

let phoneInput = document.getElementById("phone");
let phoneresult = document.getElementById("phoneResult");

phoneInput.addEventListener("input", function () {

    let phone = phoneInput.value;

    // Remove spaces
    phone = phone.replace(/\s+/g, "");

    // Allow only numbers
    phone = phone.replace(/[^0-9]/g, "");

    phoneInput.value = phone;

    // 1️⃣ Empty Check
    if (phone === "") {
        phoneresult.innerHTML = "❌ Please enter phone number";
        phoneInput.style.border = "2px solid red";
        return;
    }

    // 2️⃣ Less than 11 digits
    if (phone.length < 11) {
        phoneresult.innerHTML = "❌ Phone number must be 11 digits";
        phoneInput.style.border = "2px solid red";
        return;
    }

    // 3️⃣ More than 11 digits
    if (phone.length > 11) {
        phoneresult.innerHTML = "❌ Phone number cannot exceed 11 digits";
        phoneInput.style.border = "2px solid red";
        return;
    }

    // 4️⃣ Must start with 03
    if (!phone.startsWith("03")) {
        phoneresult.innerHTML = "❌ Phone number must start with 03";
        phoneInput.style.border = "2px solid red";
        return;
    }

    // 5️⃣ Valid Number
    phoneresult.innerHTML = "✅ Valid Phone Number";
    phoneInput.style.border = "2px solid green";
});

const cnicInput = document.getElementById("cnic");
const cnicResult = document.getElementById("cnicResult");

cnicInput.addEventListener("input", function() {
    let value = cnicInput.value.replace(/\D/g,""); // remove non-numbers
    if (value.length > 13) value = value.slice(0,13);

    // Auto-format with dashes
    let formatted = "";
    if (value.length <=5) formatted = value;
    else if (value.length <=12) formatted = value.slice(0,5) + "-" + value.slice(5);
    else formatted = value.slice(0,5) + "-" + value.slice(5,12) + "-" + value.slice(12);

    cnicInput.value = formatted;

    // Validation
    const digitsOnly = value;
    if (digitsOnly.length < 13) {
        cnicResult.innerHTML = "❌ CNIC must be 13 digits";
        cnicInput.style.border = "2px solid red";
        return;
    }
    const regex = /^\d{5}-\d{7}-\d{1}$/;
    if (regex.test(formatted)) {
        cnicResult.innerHTML = "✅ Valid CNIC";
        cnicInput.style.border = "2px solid green";
    } else {
        cnicResult.innerHTML = "❌ Invalid CNIC format";
        cnicInput.style.border = "2px solid red";
    }
});

const genderInputs = document.getElementsByName("gender");
const genderResult = document.getElementById("genderResult");

// Function to check if a gender is selected
function validateGender() {
    let selected = false;
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            selected = true;
            break;
        }
    }
    if (!selected) {
        genderResult.innerHTML = "❌ Please select your gender";
        return false;
    } else {
        genderResult.innerHTML = "✅ Gender selected";
        return true;
    }
}

// Run validation when any radio button is clicked
for (let i = 0; i < genderInputs.length; i++) {
    genderInputs[i].addEventListener("change", validateGender);
}

const profilePic = document.getElementById("profilePic");
const fileResult = document.getElementById("fileResult");

profilePic.addEventListener("change", function() {
    const file = profilePic.files[0];

    if (!file) {
        fileResult.innerHTML = "❌ Please select a file";
        profilePic.style.border = "2px solid red";
        return false;
    }

    // Optional: Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
        fileResult.innerHTML = "❌ Invalid file type. Only JPG or PNG allowed";
        profilePic.style.border = "2px solid red";
        profilePic.value = ""; // Clear invalid file
        return false;
    }

    // Optional: Check file size (e.g., max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
        fileResult.innerHTML = "❌ File too large. Max 2MB allowed";
        profilePic.style.border = "2px solid red";
        profilePic.value = ""; // Clear file
        return false;
    }

    fileResult.innerHTML = "✅ File selected: " + file.name;
    profilePic.style.border = "2px solid green";
    return true;
});

const countrySelect = document.getElementById("country");
const countryResult = document.getElementById("countryResult");

countrySelect.addEventListener("change", function() {
    if (countrySelect.value === "") {
        countryResult.innerHTML = "❌ Please select your country";
        countrySelect.style.border = "2px solid red";
        return false;
    } else {
        countryResult.innerHTML = "✅ Country selected: " + countrySelect.value;
        countrySelect.style.border = "2px solid green";
        return true;
    }
});

const websiteInput = document.getElementById("website");
const websiteResult = document.getElementById("websiteResult");

websiteInput.addEventListener("input", function() {
    let url = websiteInput.value.trim();

    // If empty, optional → valid
    if (url === "") {
        websiteResult.innerHTML = "ℹ️ Optional field";
        websiteInput.style.border = "2px solid gray";
        return true;
    }

    // Check valid URL pattern
    let regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;
    if (!regex.test(url)) {
        websiteResult.innerHTML = "❌ Invalid URL (start with http:// or https://)";
        websiteInput.style.border = "2px solid red";
    } else {
        websiteResult.innerHTML = "✅ Valid URL";
        websiteInput.style.border = "2px solid green";
    }
});

// Select the button
const submitButton = document.querySelector(".last-button");

// Optional: select a container for result message
const submitResult = document.createElement("p");
submitButton.parentNode.insertBefore(submitResult, submitButton.nextSibling);

submitButton.addEventListener("click", function(e) {
    e.preventDefault(); // prevent default form submission

    // ✅ Check all live validations
    let nameValid = nameResult.innerHTML.includes("✅");
    let emailValid = emailResult.innerHTML.includes("✅");
    let dobValid = dobResult.innerHTML.includes("✅");
    let phoneValid = phoneResult.innerHTML.includes("✅");
    let cnicValid = cnicResult.innerHTML.includes("✅");
    let genderValid = validateGender(); // function from gender radio buttons
    let cityValid = citySelect.value !== "";
    let countryValid = countrySelect.value !== "";
    let fileValid = profilePic.files.length > 0;
    let websiteValid = websiteInput.value === "" || websiteResult.innerHTML.includes("✅");

    // ✅ Final check
    if (nameValid && emailValid && dobValid && phoneValid && cnicValid &&
        genderValid && cityValid && countryValid && fileValid && websiteValid) {

        submitResult.innerHTML = "🎉 Submission Successful!";
        submitResult.style.color = "green";

        // Optional: You can collect all form data here
        /*
        let formData = {
            name: nameInput.value,
            email: emailInput.value,
            dob: dobInput.value,
            phone: phoneInput.value,
            cnic: cnicInput.value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            city: citySelect.value,
            country: countrySelect.value,
            website: websiteInput.value,
            file: profilePic.files[0]
        };
        console.log(formData);
        */
    } else {
        submitResult.innerHTML = "❌ Please fill all fields correctly before submitting";
        submitResult.style.color = "red";
    }
});