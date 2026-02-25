// ── Name ──────────────────────────────────────────────────────────────────────
let input = document.getElementById("name");
let nameResult = document.getElementById("nameResult");

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") validateName();
});

function validateName() {
    let name = input.value.trim();

    if (name === "") {
        nameResult.innerHTML = "❌ Please enter your name";
        return false;
    }
    if (name.length < 3) {
        nameResult.innerHTML = "❌ Name must be at least 3 characters";
        return false;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
        nameResult.innerHTML = "❌ Only letters allowed (No numbers or symbols)";
        return false;
    }

    name = name.replace(/\s+/g, " ");
    let formattedName = name
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

    nameResult.innerHTML = "✅ Valid Name: " + formattedName;
    return true;
}

input.addEventListener("input", validateName);

// ── Email ─────────────────────────────────────────────────────────────────────
let emailInput  = document.getElementById("email");
let emailResult = document.getElementById("emailResult");

emailInput.addEventListener("input", function () {
    let username = emailInput.value.replace("@gmail.com", "").trim().replace(/\s+/g, "");

    if (username === "") {
        emailResult.innerHTML = "❌ Please enter username";
        emailInput.style.border = "2px solid red";
        return;
    }
    if (!/^[a-zA-Z0-9._]*$/.test(username)) {
        emailResult.innerHTML = "❌ Only letters, numbers, dot and underscore allowed";
        emailInput.style.border = "2px solid red";
        return;
    }

    emailInput.value = username + "@gmail.com";
    emailResult.innerHTML = "✅ Valid Gmail";
    emailInput.style.border = "2px solid green";
});

// ── Date of Birth ─────────────────────────────────────────────────────────────
let dobInput   = document.getElementById("dob");
let dobResult  = document.getElementById("dobResult");

dobInput.addEventListener("input", function () {
    let dobValue = dobInput.value;

    if (dobValue === "") {
        dobResult.innerHTML = "❌ Please select your date of birth";
        dobInput.style.border = "2px solid red";
        return;
    }

    let today     = new Date();
    let birthDate = new Date(dobValue);
    let age       = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age < 13) {
        dobResult.innerHTML = "❌ You must be at least 13 years old";
        dobInput.style.border = "2px solid red";
    } else {
        dobResult.innerHTML = "✅ Valid DOB | Your Age: " + age + " years";
        dobInput.style.border = "2px solid green";
    }
});

// ── Phone ─────────────────────────────────────────────────────────────────────
let phoneInput  = document.getElementById("phone");
let phoneResult = document.getElementById("phoneResult");

phoneInput.addEventListener("input", function () {
    let phone = phoneInput.value.replace(/\D/g, "");
    phoneInput.value = phone;

    if (phone === "") {
        phoneResult.innerHTML = "❌ Please enter phone number";
        phoneInput.style.border = "2px solid red";
        return;
    }
    if (phone.length < 11) {
        phoneResult.innerHTML = "❌ Phone number must be 11 digits";
        phoneInput.style.border = "2px solid red";
        return;
    }
    if (phone.length > 11) {
        phoneResult.innerHTML = "❌ Phone number cannot exceed 11 digits";
        phoneInput.style.border = "2px solid red";
        return;
    }
    if (!phone.startsWith("03")) {
        phoneResult.innerHTML = "❌ Phone number must start with 03";
        phoneInput.style.border = "2px solid red";
        return;
    }

    phoneResult.innerHTML = "✅ Valid Phone Number";
    phoneInput.style.border = "2px solid green";
});

// ── CNIC ──────────────────────────────────────────────────────────────────────
const cnicInput  = document.getElementById("cnic");
const cnicResult = document.getElementById("cnicResult");

cnicInput.addEventListener("input", function () {
    let value = cnicInput.value.replace(/\D/g, "");
    if (value.length > 13) value = value.slice(0, 13);

    let formatted = "";
    if      (value.length <= 5)  formatted = value;
    else if (value.length <= 12) formatted = value.slice(0, 5) + "-" + value.slice(5);
    else                          formatted = value.slice(0, 5) + "-" + value.slice(5, 12) + "-" + value.slice(12);

    cnicInput.value = formatted;

    if (value.length < 13) {
        cnicResult.innerHTML = "❌ CNIC must be 13 digits";
        cnicInput.style.border = "2px solid red";
        return;
    }
    if (/^\d{5}-\d{7}-\d{1}$/.test(formatted)) {
        cnicResult.innerHTML = "✅ Valid CNIC";
        cnicInput.style.border = "2px solid green";
    } else {
        cnicResult.innerHTML = "❌ Invalid CNIC format";
        cnicInput.style.border = "2px solid red";
    }
});

// ── Gender ────────────────────────────────────────────────────────────────────
const genderInputs = document.getElementsByName("gender");
const genderResult = document.getElementById("genderResult");

function validateGender() {
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            genderResult.innerHTML = "✅ Gender selected";
            return true;
        }
    }
    genderResult.innerHTML = "❌ Please select your gender";
    return false;
}

for (let i = 0; i < genderInputs.length; i++) {
    genderInputs[i].addEventListener("change", validateGender);
}

// ── Profile Picture ───────────────────────────────────────────────────────────
const profilePic = document.getElementById("profilePic");
const fileResult = document.getElementById("fileResult");

profilePic.addEventListener("change", function () {
    const file = profilePic.files[0];

    if (!file) {
        fileResult.innerHTML = "❌ Please select a file";
        profilePic.style.border = "2px solid red";
        return;
    }
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        fileResult.innerHTML = "❌ Invalid file type. Only JPG or PNG allowed";
        profilePic.style.border = "2px solid red";
        profilePic.value = "";
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        fileResult.innerHTML = "❌ File too large. Max 2MB allowed";
        profilePic.style.border = "2px solid red";
        profilePic.value = "";
        return;
    }

    fileResult.innerHTML = "✅ File selected: " + file.name;
    profilePic.style.border = "2px solid green";
});

// ── City ──────────────────────────────────────────────────────────────────────
const citySelect = document.getElementById("city");
const cityResult = document.getElementById("cityResult");

citySelect.addEventListener("change", function () {
    if (citySelect.value === "") {
        cityResult.innerHTML = "❌ Please select your city";
        citySelect.style.border = "2px solid red";
    } else {
        cityResult.innerHTML = "✅ City selected: " + citySelect.value;
        citySelect.style.border = "2px solid green";
    }
});

// ── Country ───────────────────────────────────────────────────────────────────
const countrySelect  = document.getElementById("country");
const countryResult  = document.getElementById("countryResult");

countrySelect.addEventListener("change", function () {
    if (countrySelect.value === "") {
        countryResult.innerHTML = "❌ Please select your country";
        countrySelect.style.border = "2px solid red";
    } else {
        countryResult.innerHTML = "✅ Country selected: " + countrySelect.value;
        countrySelect.style.border = "2px solid green";
    }
});

// ── Website (optional) ────────────────────────────────────────────────────────
const websiteInput  = document.getElementById("website");
const websiteResult = document.getElementById("websiteResult");

websiteInput.addEventListener("input", function () {
    let url = websiteInput.value.trim();

    if (url === "") {
        websiteResult.innerHTML = "ℹ️ Optional field";
        websiteInput.style.border = "2px solid gray";
        return;
    }
    if (/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i.test(url)) {
        websiteResult.innerHTML = "✅ Valid URL";
        websiteInput.style.border = "2px solid green";
    } else {
        websiteResult.innerHTML = "❌ Invalid URL (start with http:// or https://)";
        websiteInput.style.border = "2px solid red";
    }
});

// ── Submit Button → Validate + Download ───────────────────────────────────────
const submitButton = document.querySelector(".last-button");
const submitResult = document.createElement("p");
submitButton.parentNode.insertBefore(submitResult, submitButton.nextSibling);

submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Run name validation explicitly (it only fires on keydown/input otherwise)
    validateName();
    validateGender();

    let nameValid    = nameResult.innerHTML.includes("✅");
    let emailValid   = emailResult.innerHTML.includes("✅");
    let dobValid     = dobResult.innerHTML.includes("✅");
    let phoneValid   = phoneResult.innerHTML.includes("✅");
    let cnicValid    = cnicResult.innerHTML.includes("✅");
    let genderValid  = genderResult.innerHTML.includes("✅");
    let cityValid    = citySelect.value !== "";
    let countryValid = countrySelect.value !== "";
    let fileValid    = profilePic.files.length > 0;
    let websiteValid = websiteInput.value === "" || websiteResult.innerHTML.includes("✅");

    if (!cityValid)    { cityResult.innerHTML    = "❌ Please select your city";    citySelect.style.border    = "2px solid red"; }
    if (!countryValid) { countryResult.innerHTML = "❌ Please select your country"; countrySelect.style.border = "2px solid red"; }
    if (!fileValid)    { fileResult.innerHTML    = "❌ Please upload a profile image"; }

    if (nameValid && emailValid && dobValid && phoneValid && cnicValid &&
        genderValid && cityValid && countryValid && fileValid && websiteValid) {

        submitResult.innerHTML  = "✅ Submission Successful! Your file is downloading...";
        submitResult.style.color = "lightgreen";

        // ── Build & download the registration text file ──────────────────────
        const selectedGender = document.querySelector('input[name="gender"]:checked');

        const data = `
===== Red Card Registration Form =====

Name      : ${input.value.trim()}
Email     : ${emailInput.value}
DOB       : ${dobInput.value}
Phone     : ${phoneInput.value}
CNIC      : ${cnicInput.value}
Gender    : ${selectedGender ? selectedGender.value : ""}
City      : ${citySelect.value}
Country   : ${countrySelect.value}
Website   : ${websiteInput.value || "N/A"}
Photo     : ${profilePic.files[0] ? profilePic.files[0].name : "N/A"}

=======================================
        `.trim();

        const blob = new Blob([data], { type: "text/plain" });
        const link = document.createElement("a");
        link.href     = URL.createObjectURL(blob);
        link.download = "Registration_Form.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } else {
        submitResult.innerHTML  = "❌ Please fill all fields correctly before submitting.";
        submitResult.style.color = "red";
    }
});
