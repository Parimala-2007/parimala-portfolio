// ========================================
// Skills / Education Tabs
// ========================================

function openTab(tabName, clickedButton) {

    const tabContents = document.querySelectorAll(".tab-content");
    const tabBtns = document.querySelectorAll(".tab-btn");

    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.remove("active-content");
    });

    // Remove active state from buttons
    tabBtns.forEach(btn => {
        btn.classList.remove("active");
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);

    if (selectedTab) {
        selectedTab.classList.add("active-content");
    }

    // Activate clicked button
    if (clickedButton) {
        clickedButton.classList.add("active");
    }
}


// ========================================
// GitHub API Integration
// ========================================

const githubUsername = "Parimala-2007";
const githubProjects = document.getElementById("github-projects");

async function loadGitHubProjects() {

    if (!githubProjects) {
        return;
    }

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
        );

        if (!response.ok) {
            throw new Error(
                "GitHub repositories could not be loaded."
            );
        }

        const repositories = await response.json();

        githubProjects.innerHTML = "";

        if (repositories.length === 0) {

            githubProjects.innerHTML = `
                <p>No public repositories found.</p>
            `;

            return;
        }

        repositories.forEach(repo => {

            const projectCard = document.createElement("div");

            projectCard.className = "project-card";

            projectCard.innerHTML = `

                <div class="project-info">

                    <h3>${repo.name}</h3>

                    <p>
                        ${
                            repo.description ||
                            "No description available."
                        }
                    </p>

                    <div class="tech-tags">

                        ${
                            repo.language
                                ? `<span>${repo.language}</span>`
                                : ""
                        }

                        <span>GitHub API</span>

                    </div>

                    <div class="project-links">

                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-github"
                        >

                            <i class="fab fa-github"></i>

                            GitHub Repo

                        </a>

                    </div>

                </div>

            `;

            githubProjects.appendChild(projectCard);

        });

    } catch (error) {

        console.error(
            "GitHub API Error:",
            error
        );

        githubProjects.innerHTML = `
            <p>
                Unable to load GitHub projects.
            </p>
        `;
    }
}


// Load GitHub projects
loadGitHubProjects();


// ========================================
// Contact Form - Formspree
// ========================================

const contactForm =
    document.getElementById("portfolio-contact-form");

const formResponse =
    document.getElementById("form-response");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector(
                    ".btn-submit"
                );

            const originalButtonText =
                submitButton.textContent;

            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";

            formResponse.textContent = "";


            try {

                const formData =
                    new FormData(contactForm);

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    formResponse.textContent =
                        "Message sent successfully! Thank you.";

                    formResponse.style.color =
                        "#63b3ed";

                    contactForm.reset();

                } else {

                    const data =
                        await response.json();

                    if (data.errors) {

                        formResponse.textContent =
                            data.errors
                                .map(
                                    error =>
                                        error.message
                                )
                                .join(", ");

                    } else {

                        formResponse.textContent =
                            "Something went wrong. Please try again.";

                    }

                    formResponse.style.color =
                        "#fc8181";
                }

            } catch (error) {

                console.error(
                    "Form submission error:",
                    error
                );

                formResponse.textContent =
                    "Unable to send message. Please try again.";

                formResponse.style.color =
                    "#fc8181";

            }


            submitButton.disabled = false;

            submitButton.textContent =
                originalButtonText;

        }
    );
}