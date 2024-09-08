// Interface to define the structure of resume data
interface ResumeData {
    username: string;
    content: string; // Resume content in a string format
  }
  
  // Simulate a database using an in-memory object
  const database: Record<string, ResumeData> = {};
  
  // Function to generate a unique URL for the resume based on the username
  function generateResumeURL(username: string): string {
    return `${username}.vercel.app/resume`;
  }
  
  // Function to save resume data in the simulated database
  function saveResume(username: string, content: string): void {
    const url = generateResumeURL(username);
    database[username] = { username, content };
    console.log(`Resume saved at: ${url}`);
  }
  
  // Function to retrieve resume data from the simulated database
  function getResume(username: string): ResumeData | undefined {
    return database[username];
  }
  
  // Event handler for generating and displaying the resume
  function handleFormSubmit(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Retrieve form values
    const username = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const schoolUni = (document.getElementById('schl/uni') as HTMLInputElement).value;
    const year = (document.getElementById('Year') as HTMLInputElement).value;
    const officeName = (document.getElementById('office-name') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
    const yearExperience = (document.getElementById('Year-Experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
  
    // Create resume content as an HTML string
    const resumeContent = `
      <h2>Resume</h2>
      <p><strong>Name:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Degree:</strong> ${degree}</p>
      <p><strong>School/University:</strong> ${schoolUni}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Office Name:</strong> ${officeName}</p>
      <p><strong>Job Title:</strong> ${jobTitle}</p>
      <p><strong>Year of Experience:</strong> ${yearExperience}</p>
      <p><strong>Skills:</strong> ${skills}</p>
    `;
  
    // Display resume content in the preview area
    const resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
      resumeOutput.innerHTML = resumeContent;
    } else {
      console.error('Resume output element not found.');
    }
  
    // Save resume data
    saveResume(username, resumeContent);
  
    // Update the share link button with the generated URL
    const shareLink = document.getElementById('resume-share') as HTMLButtonElement;
    if (shareLink) {
      shareLink.setAttribute('data-url', generateResumeURL(username));
    } else {
      console.error('Share link button not found.');
    }
  }
  
  // Event handler for downloading the resume as a PDF
  async function handlePDFDownload(): Promise<void> {
    // Import jsPDF from the jsPDF library
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();
  
    // Get resume content from the preview area
    const resumeContent = (document.getElementById('resumeOutput') as HTMLElement).innerText;
  
    // Add resume content to the PDF
    doc.text(resumeContent, 10, 10);
    
    // Save the PDF
    doc.save('resume.pdf');
  }
  
  // Add event listeners to form and buttons
  const form = document.getElementById('resumeForm');
  const shareButton = document.getElementById('resume-share');
  const downloadButton = document.getElementById('pdf-download');
  
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  } else {
    console.error('Resume form not found.');
  }
  
  if (shareButton) {
    shareButton.addEventListener('click', (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const url = button.getAttribute('data-url');
      if (url) {
        // Open the shareable resume URL in a new tab
        window.open(url, '_blank');
      }
    });
  } else {
    console.error('Share button not found.');
  }
  
  if (downloadButton) {
    downloadButton.addEventListener('click', handlePDFDownload);
  } else {
    console.error('Download button not found.');
  }
  