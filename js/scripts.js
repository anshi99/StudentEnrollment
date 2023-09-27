
$(document).ready(function () {
    $("#enrollmentForm").on("submit", function (e) {
        e.preventDefault();

        // get all fields from form as variables
        var name = $("#name").val();
        var email = $("#email").val();
        var website = $("#website").val();
        var imgLink = $("#imageLink").val();
        var gender = $("input[name=gender]:checked").val();
        var skills = []
        $("input[name='skills']:checked").each(function () {
            skills.push($(this).val());
        });

        // Validate Name Field
        if (!validateName(name)) {
            return;
        }
        // Validate Email Field
        if (!validateEmail(email)) {
            return;
        }
        // Remove https/http tags from website link
        if(website.includes("http://")){
            console.log('contains http');
            website = website.replace('http://', '');
        }
        if(website.includes("https://")){
            website = website.replace('https://', '');
        }
        // Validate Website Field
        if (!validateWebsite(website)) {
            return;
        }
        // Validate Image Link Field
        if (!validateImgLink(imgLink)) {
            return;
        }
        // Validate Skills Field
        if (!validateSkills(skills)) {
            return;
        }

        // if all fields are verified append fields to table
        $("#enrolled-students").append(
            '<tr>'
            + '<td>'
            + '<div class="text-start">'
            + '<p class="fw-bold m-0">' + name + '</p>'
            + '<p class="p-0 m-0">' + gender + '</p>'
            + '<p class="p-0 m-0">' + email + '</p>'
            + '<p class="p-0 m-0"><a href="https://' + website + '"'
            + 'target="_blank">' + website + '</a></p>'
            + '<p class="p-0 m-0">' + skills + '</p>'
            + '</div>'
            + '</td>'
            + '<td class="w-25">'
            + '<img src="' + imgLink + '"'
            + 'class="img-fluid w-100">'
            + '</td>'
            + '</tr>');

        // Show table
        $("table").removeClass('d-none');
        // reset form
        resetForm();
    })
});

//validate name
function validateName(name) {
    // Check if name field is not null
    if (name.length == 0) {
        $("#errName").html("This field cannot be empty");
        $("#errName").removeClass("d-none");
        return false;
    }
    // hide error field from name field
    $("#errName").addClass("d-none");
    return true;
}

//validate email address
function validateEmail(email) {
    // Check if email field is not null
    if (email.length == 0) {
        $("#errEmail").html("This field cannot be empty");
        $("#errEmail").removeClass("d-none");
        return false;
    }
    // Email Regex pattern
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Check if email matches with the regex pattern
    if (!emailPattern.test(email)) {
        $("#errEmail").html("Enter a valid Email Address.");
        $("#errEmail").removeClass("d-none");
        return false;
    }
    // hide form error field after validation
    $("#errEmail").addClass("d-none");
    return true;
}

//validate website url
function validateWebsite(website) {
    // Check if website field is not null
    if (website.length == 0) {
        $("#errWebsite").html("This field cannot be empty");
        $("#errWebsite").removeClass("d-none");
        return false;
    }
    // website regex
    let websitePattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    // check if website matches with regex
    if (!websitePattern.test(website)) {
        $("#errWebsite").html("Enter a valid URL");
        $("#errWebsite").removeClass("d-none");
        return false;
    }
    // hide website error field from website field
    $("#errWebsite").addClass("d-none");
    return true;
}

// validate image link 
function validateImgLink(imgLink) {
    // check if image link field is not empty
    if (website.length == 0) {
        $("#errImg").html("This field cannot be empty");
        $("#errImg").removeClass("d-none");
        return false;
    }
    // image regex pattern
    let imgPattern = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
    // check if the image link field matches with image regex
    if (!imgPattern.test(imgLink)) {
        $("#errImg").html("Enter a valid Image URL");
        $("#errImg").removeClass("d-none");
        return false;
    }
    // hide form error field from image link class
    $("#errImg").addClass("d-none");
    return true;
}

// validate skills field 
function validateSkills(skills) {
    // check if atleast one checkbox is selected from the checkbox field
    if (skills.length == 0) {
        $("#errSkills").html("Check atleast one checkbox.");
        $("#errSkills").removeClass("d-none");
        return false;
    }
    // hide form error field from the checkbox field
    $("#errSkills").addClass("d-none");
    return true;
}

// Reset form method
function resetForm() {
    $("#enrollmentForm").trigger("reset");
}