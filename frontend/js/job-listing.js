document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/jobs');
    const jobs = await response.json();

    const jobsContainer = document.getElementById('jobs-container');
    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job';
        jobDiv.innerHTML = `
        <h2>${job.title}</h2>
        <p>${job.company.name} - ${job.location}</p>
        <p>${job.description.slice(0, 100)}...</p>
        <a href="job-details.html?id=${job._id}">View Details</a>
        `;
        jobsContainer.appendChild(jobDiv);
    });
})