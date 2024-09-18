document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    const response = await fetch(`api/jobs/${jobId}`);
    const job = await response.json();

    document.getElementById('job-title').textContent = job.title;
    document.getElementById('job-company').textContent = job.company.name;
    document.getElementById('job-location').textContent = job.location;
    document.getElementById('job-description').textContent = job.description;
})