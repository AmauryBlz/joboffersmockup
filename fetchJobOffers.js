// Replace with your actual API URL, App ID, and App Key from the French API
const apiUrl = "https://api.francetravail.io/partenaire"; // Update this with the actual base URL for the API
const app_id = 'PAR_testoffreapi_6510d76b2c4c41fc07858955b1f08327354412c372c461c88fa91f03035925b';  // Your API Client ID
const app_key = '91710efdc7f928d9a614066c147b22d62178d9a1270f2d1c20a68dde5c3912'; // Your API Secret Key

// Function to fetch job offers
async function fetchJobOffers() {
    try {
        // Build the full API URL with App ID and App Key
        const fullUrl = `${apiUrl}?client_id=${app_id}&client_secret=${app_key}&results_per_page=5`; // Update this according to your API requirements

        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const jobList = data.results;
        let jobHtml = "";

        jobList.forEach(job => {
            jobHtml += `
            <div class="col-md-8 offset-md-2">
                <div class="job-listing">
                    <h5>${job.title}</h5>
                    <div class="company">Company: ${job.company.display_name}</div>
                    <div class="location">Location: ${job.location.display_name}</div>
                    <div class="salary">Salary: ${job.salary_min ? `€${job.salary_min} - €${job.salary_max}` : "Not Provided"}</div>
                    <p class="description">
                        ${job.description.substring(0, 150)}...
                    </p>
                    <a href="${job.redirect_url}" class="btn apply-btn">Apply Now</a>
                </div>
            </div>
            `;
        });

        document.querySelector('.row').innerHTML = jobHtml;

    } catch (error) {
        console.error("Error fetching job offers:", error);
        document.querySelector('.row').innerHTML = `<p>Error fetching job offers. Please try again later.</p>`;
    }
}

// Call the function to fetch and display job offers
fetchJobOffers();
