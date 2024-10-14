<script>
// Example API URL (Replace with your actual API URL and API Key)
const apiUrl = "https://api.adzuna.com/v1/api/jobs/fr/search/1?app_id=your_app_id&app_key=your_api_key&results_per_page=5";

async function fetchJobOffers() {
    try {
        const response = await fetch(apiUrl);
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
    }
}

fetchJobOffers();
</script>
