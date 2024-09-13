"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jspdf_1 = require("jspdf");
// Simulate a database using an in-memory object
var database = {};
//Function to generate a unique URL for the resume based on the username
function generateResumeURL(username) {
    return "resume/".concat(username.replace(/\s*/g, '_'), ".vercel.app/resume");
}
// Function to save resume data in the simulated database
function saveResume(username, content) {
    var url = generateResumeURL(username);
    database[username] = { username: username, content: content };
    console.log("Resume saved at: ".concat(url));
}
// Function to retrieve resume data from the simulated database
function getResume(username) {
    return database[username];
}
// Event handler for generating and displaying the resume
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Retrieve form values
    var username = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var degree = document.getElementById('degree').value;
    var schoolUni = document.getElementById('schl_uni').value;
    var year = document.getElementById('Year').value;
    var officeName = document.getElementById('office-name').value;
    var jobTitle = document.getElementById('job-title').value;
    var yearExperience = document.getElementById('Year-Experience').value;
    var skills = document.getElementById('skills').value;
    // Create resume content as an HTML string
    var resumeContent = "\n      <h2>Resume</h2>\n      <p><strong>Name:</strong> ".concat(username, "</p>\n      <p><strong>Email:</strong> ").concat(email, "</p>\n      <p><strong>Degree:</strong> ").concat(degree, "</p>\n      <p><strong>School/University:</strong> ").concat(schoolUni, "</p>\n      <p><strong>Year:</strong> ").concat(year, "</p>\n      <p><strong>Office Name:</strong> ").concat(officeName, "</p>\n      <p><strong>Job Title:</strong> ").concat(jobTitle, "</p>\n      <p><strong>Year of Experience:</strong> ").concat(yearExperience, "</p>\n      <p><strong>Skills:</strong> ").concat(skills, "</p>\n    ");
    // Display resume content in the preview area
    var resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = resumeContent;
    }
    else {
        console.error('Resume output element not found.');
    }
    // Save resume data
    saveResume(username, resumeContent);
    // Update the share link button with the generated URL
    var shareLink = document.getElementById('resume-share');
    if (shareLink) {
        shareLink.setAttribute('data-url', generateResumeURL(username));
    }
    else {
        console.error('Share link button not found.');
    }
}
// Event handler for downloading the resume as a PDF
function handlePDFDownload() {
    return __awaiter(this, void 0, void 0, function () {
        var doc, resumeContent;
        return __generator(this, function (_a) {
            doc = new jspdf_1.jsPDF();
            resumeContent = document.getElementById('resumeOutput').innerText;
            // Add resume content to the PDF
            doc.text(resumeContent, 10, 10);
            // Save the PDF
            doc.save('resume.pdf');
            return [2 /*return*/];
        });
    });
}
// Add event listeners to form and buttons
var form = document.getElementById("resume-form");
var shareButton = document.getElementById('resume-share');
var downloadButton = document.getElementById('pdf-download');
if (form) {
    form.addEventListener('submit', handleFormSubmit);
}
else {
    console.error('Resume form not found.');
}
if (shareButton) {
    shareButton.addEventListener('click', function (event) {
        var button = event.currentTarget;
        var url = button.getAttribute('data-url');
        if (url) {
            // Open the shareable resume URL in a new tab
            window.open(url, '_blank');
        }
    });
}
else {
    console.error('Share button not found.');
}
if (downloadButton) {
    downloadButton.addEventListener('click', handlePDFDownload);
}
else {
    console.error('Download button not found.');
}
