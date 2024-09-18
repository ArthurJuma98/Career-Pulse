document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    const response = await fetch(`api/jobs/${jobId}`);
    const job = await response.json();

    document.getElementById('job-title').textContent = job.title;
    document.getElementById('job-company').textContent = job.company.name;
    document.getElementById('job-location').textContent = job.location;
    document.getElementById('job-description').textContent = job.description;

    document.getElementById('apply-btn').addEventListener('click', async () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('You need to log in to apply!');
            return;
        }

        const application = {
            jobId,
            userId,
            coverLetter: 'add your cover letter here'
        };

        const applyResponse = await fetch('api/applications', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(application)
        });

        if (applyResponse.ok) {
            alert('application submitted succesfully')
        } else {
            alert('failed to submit application, please try again!')
        }
    });
});