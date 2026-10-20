/* =========================================================
   RESUMEFORGE — BUILDER.JS
========================================================= */


/* =========================================================
   SECTION NAVIGATION
========================================================= */

const sectionButtons =
    document.querySelectorAll(".builder-section");

const formSections =
    document.querySelectorAll(".form-section");


sectionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const sectionId =
            button.dataset.section;

        sectionButtons.forEach((item) => {
            item.classList.remove("active");
        });

        formSections.forEach((section) => {
            section.classList.remove("active");
        });

        button.classList.add("active");

        const selectedSection =
            document.getElementById(sectionId);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

    });

});


/* =========================================================
   PERSONAL INFORMATION
========================================================= */

const fullName =
    document.getElementById("fullName");

const jobTitle =
    document.getElementById("jobTitle");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const locationInput =
    document.getElementById("location");

const linkedin =
    document.getElementById("linkedin");

const github =
    document.getElementById("github");


const previewName =
    document.getElementById("previewName");

const previewTitle =
    document.getElementById("previewTitle");

const previewEmail =
    document.getElementById("previewEmail");

const previewPhone =
    document.getElementById("previewPhone");

const previewLocation =
    document.getElementById("previewLocation");


function updatePersonalPreview() {

    if (previewName) {
        previewName.textContent =
            fullName?.value.trim() ||
            "Your Name";
    }

    if (previewTitle) {
        previewTitle.textContent =
            jobTitle?.value.trim() ||
            "Professional Title";
    }

    if (previewEmail) {
        previewEmail.textContent =
            email?.value.trim() ||
            "your@email.com";
    }

    if (previewPhone) {
        previewPhone.textContent =
            phone?.value.trim() ||
            "Phone";
    }

    if (previewLocation) {
        previewLocation.textContent =
            locationInput?.value.trim() ||
            "Location";
    }

}


[
    fullName,
    jobTitle,
    email,
    phone,
    locationInput,
    linkedin,
    github
].forEach((input) => {

    if (!input) return;

    input.addEventListener("input", () => {

        updatePersonalPreview();

        updateProgress();

        saveResume();

    });

});


/* =========================================================
   SUMMARY
========================================================= */

const summaryText =
    document.getElementById("summaryText");

const previewSummary =
    document.getElementById("previewSummary");


if (summaryText) {

    summaryText.addEventListener("input", () => {

        if (previewSummary) {

            previewSummary.textContent =
                summaryText.value.trim() ||
                "Your professional summary will appear here.";

        }

        updateProgress();

        saveResume();

    });

}


/* =========================================================
   SKILLS
========================================================= */

const skillInput =
    document.getElementById("skillInput");

const addSkillButton =
    document.getElementById("addSkill");

const skillsList =
    document.getElementById("skillsList");

const previewSkills =
    document.getElementById("previewSkills");


function createSkill(skillName) {

    const skill =
        skillName.trim();

    if (!skill) return;

    const existingSkills =
        [
            ...skillsList.querySelectorAll(".skill-tag")
        ]
        .map((tag) =>
            tag.firstChild.textContent.trim().toLowerCase()
        );

    if (
        existingSkills.includes(
            skill.toLowerCase()
        )
    ) {
        return;
    }

    const tag =
        document.createElement("span");

    tag.className =
        "skill-tag";

    tag.innerHTML = `
        ${escapeHTML(skill)}
        <button type="button">×</button>
    `;

    tag.querySelector("button").addEventListener(
        "click",
        () => {

            tag.remove();

            updateSkillPreview();

            updateProgress();

            saveResume();

        }
    );

    skillsList.appendChild(tag);

    updateSkillPreview();

    updateProgress();

    saveResume();

}


function updateSkillPreview() {

    if (!previewSkills) return;

    previewSkills.innerHTML = "";

    skillsList
        .querySelectorAll(".skill-tag")
        .forEach((tag) => {

            const skill =
                tag.firstChild.textContent.trim();

            const previewTag =
                document.createElement("span");

            previewTag.textContent =
                skill;

            previewSkills.appendChild(
                previewTag
            );

        });

}


if (addSkillButton) {

    addSkillButton.addEventListener(
        "click",
        () => {

            createSkill(
                skillInput.value
            );

            skillInput.value = "";

            skillInput.focus();

        }
    );

}


if (skillInput) {

    skillInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                createSkill(
                    skillInput.value
                );

                skillInput.value = "";

            }

        }
    );

}


function connectSkillRemoveButtons() {

    skillsList
        .querySelectorAll(
            ".skill-tag button"
        )
        .forEach((button) => {

            button.onclick = () => {

                button
                    .parentElement
                    .remove();

                updateSkillPreview();

                updateProgress();

                saveResume();

            };

        });

}
/* =========================================================
   EXPERIENCE
========================================================= */

const experienceContainer =
    document.getElementById("experienceContainer");

const addExperience =
    document.getElementById("addExperience");

const previewExperience =
    document.getElementById("previewExperience");


function updateExperiencePreview() {
    if (!previewExperience || !experienceContainer) return;

    previewExperience.innerHTML = "";

    experienceContainer
        .querySelectorAll(".repeatable-card")
        .forEach((card) => {
            const role =
                card.querySelector(".experience-role")?.value.trim() || "";

            const company =
                card.querySelector(".experience-company")?.value.trim() || "";

            const start =
                card.querySelector(".experience-start")?.value.trim() || "";

            const end =
                card.querySelector(".experience-end")?.value.trim() || "";

            const description =
                card.querySelector(".experience-description")?.value.trim() || "";

            if (!role && !company && !description) return;

            const entry = document.createElement("article");
            entry.className = "preview-entry";

            entry.innerHTML = `
                <div class="preview-entry-top">
                    <strong>${escapeHTML(role)}</strong>
                    <span>
                        ${escapeHTML(start)}
                        ${start || end ? " — " : ""}
                        ${escapeHTML(end)}
                    </span>
                </div>
                <em>${escapeHTML(company)}</em>
                <p>${escapeHTML(description)}</p>
            `;

            previewExperience.appendChild(entry);
        });
}


function connectExperienceInputs(card) {
    card.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("input", () => {
            updateExperiencePreview();
            updateProgress();
            saveResume();
        });
    });

    const removeButton = card.querySelector(".remove-button");

    if (removeButton) {
        removeButton.onclick = () => {
            const cards =
                experienceContainer.querySelectorAll(".repeatable-card");

            if (cards.length > 1) {
                card.remove();
                updateExperiencePreview();
                updateProgress();
                saveResume();
            }
        };
    }
}


if (experienceContainer) {
    experienceContainer
        .querySelectorAll(".repeatable-card")
        .forEach(connectExperienceInputs);
}


if (addExperience && experienceContainer) {
    addExperience.addEventListener("click", () => {
        const count =
            experienceContainer.querySelectorAll(".repeatable-card").length + 1;

        const card = document.createElement("div");
        card.className = "repeatable-card";

        card.innerHTML = `
            <div class="repeatable-card-header">
                <strong>Experience ${String(count).padStart(2, "0")}</strong>
                <button type="button" class="remove-button">Remove</button>
            </div>

            <div class="form-grid">
                <div class="form-field">
                    <label>Job title</label>
                    <input type="text" class="experience-role"
                        placeholder="e.g. Software Engineer">
                </div>

                <div class="form-field">
                    <label>Company</label>
                    <input type="text" class="experience-company"
                        placeholder="Company name">
                </div>

                <div class="form-field">
                    <label>Start date</label>
                    <input type="text" class="experience-start"
                        placeholder="e.g. June 2025">
                </div>

                <div class="form-field">
                    <label>End date</label>
                    <input type="text" class="experience-end"
                        placeholder="e.g. Present">
                </div>

                <div class="form-field full">
                    <label>Description</label>
                    <textarea class="experience-description" rows="5"
                        placeholder="Describe your responsibilities and achievements..."></textarea>
                </div>
            </div>
        `;

        experienceContainer.appendChild(card);
        connectExperienceInputs(card);
        updateExperiencePreview();
        updateProgress();
        saveResume();
    });
}


/* =========================================================
   EDUCATION
========================================================= */

const educationContainer =
    document.getElementById("educationContainer");

const addEducation =
    document.getElementById("addEducation");

const previewEducation =
    document.getElementById("previewEducation");


function updateEducationPreview() {
    if (!previewEducation || !educationContainer) return;

    previewEducation.innerHTML = "";

    educationContainer
        .querySelectorAll(".repeatable-card")
        .forEach((card) => {
            const degree =
                card.querySelector(".education-degree")?.value.trim() || "";

            const school =
                card.querySelector(".education-school")?.value.trim() || "";

            const grade =
                card.querySelector(".education-grade")?.value.trim() || "";

            const start =
                card.querySelector(".education-start")?.value.trim() || "";

            const end =
                card.querySelector(".education-end")?.value.trim() || "";

            if (!degree && !school) return;

            const entry = document.createElement("article");
            entry.className = "preview-entry";

            entry.innerHTML = `
                <div class="preview-entry-top">
                    <strong>${escapeHTML(degree)}</strong>
                    <span>
                        ${escapeHTML(start)}
                        ${start || end ? " — " : ""}
                        ${escapeHTML(end)}
                    </span>
                </div>
                <em>${escapeHTML(school)}</em>
                <p>${escapeHTML(grade)}</p>
            `;

            previewEducation.appendChild(entry);
        });
}


function connectEducationInputs(card) {
    card.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => {
            updateEducationPreview();
            updateProgress();
            saveResume();
        });
    });

    const removeButton = card.querySelector(".remove-button");

    if (removeButton) {
        removeButton.onclick = () => {
            const cards =
                educationContainer.querySelectorAll(".repeatable-card");

            if (cards.length > 1) {
                card.remove();
                updateEducationPreview();
                updateProgress();
                saveResume();
            }
        };
    }
}


if (educationContainer) {
    educationContainer
        .querySelectorAll(".repeatable-card")
        .forEach(connectEducationInputs);
}


if (addEducation && educationContainer) {
    addEducation.addEventListener("click", () => {
        const count =
            educationContainer.querySelectorAll(".repeatable-card").length + 1;

        const card = document.createElement("div");
        card.className = "repeatable-card";

        card.innerHTML = `
            <div class="repeatable-card-header">
                <strong>Education ${String(count).padStart(2, "0")}</strong>
                <button type="button" class="remove-button">Remove</button>
            </div>

            <div class="form-grid">
                <div class="form-field full">
                    <label>Degree</label>
                    <input type="text" class="education-degree"
                        placeholder="e.g. B.Tech Computer Science">
                </div>

                <div class="form-field">
                    <label>Institution</label>
                    <input type="text" class="education-school"
                        placeholder="University name">
                </div>

                <div class="form-field">
                    <label>Grade</label>
                    <input type="text" class="education-grade"
                        placeholder="e.g. 9.1 CGPA">
                </div>

                <div class="form-field">
                    <label>Start year</label>
                    <input type="text" class="education-start"
                        placeholder="2022">
                </div>

                <div class="form-field">
                    <label>End year</label>
                    <input type="text" class="education-end"
                        placeholder="2026">
                </div>
            </div>
        `;

        educationContainer.appendChild(card);
        connectEducationInputs(card);
        updateEducationPreview();
        updateProgress();
        saveResume();
    });
}
/* =========================================================
   PROJECTS
========================================================= */

const projectsContainer =
    document.getElementById("projectsContainer");

const addProject =
    document.getElementById("addProject");

const previewProjects =
    document.getElementById("previewProjects");


function updateProjectsPreview() {

    if (!previewProjects || !projectsContainer) return;

    previewProjects.innerHTML = "";

    projectsContainer
        .querySelectorAll(".repeatable-card")
        .forEach((card) => {

            const name =
                card.querySelector(".project-name")?.value.trim() || "";

            const tech =
                card.querySelector(".project-tech")?.value.trim() || "";

            const description =
                card.querySelector(".project-description")?.value.trim() || "";

            if (!name && !description) return;

            const entry =
                document.createElement("article");

            entry.className = "preview-entry";

            entry.innerHTML = `
                <strong>${escapeHTML(name)}</strong>
                <em>${escapeHTML(tech)}</em>
                <p>${escapeHTML(description)}</p>
            `;

            previewProjects.appendChild(entry);

        });

}


function connectProjectInputs(card) {

    card.querySelectorAll("input, textarea")
        .forEach((input) => {

            input.addEventListener("input", () => {

                updateProjectsPreview();
                updateProgress();
                saveResume();

            });

        });

    const removeButton =
        card.querySelector(".remove-button");

    if (removeButton) {

        removeButton.onclick = () => {

            const cards =
                projectsContainer.querySelectorAll(
                    ".repeatable-card"
                );

            if (cards.length > 1) {

                card.remove();

                updateProjectsPreview();
                updateProgress();
                saveResume();

            }

        };

    }

}


if (projectsContainer) {

    projectsContainer
        .querySelectorAll(".repeatable-card")
        .forEach(connectProjectInputs);

}


if (addProject && projectsContainer) {

    addProject.addEventListener("click", () => {

        const count =
            projectsContainer.querySelectorAll(
                ".repeatable-card"
            ).length + 1;

        const card =
            document.createElement("div");

        card.className = "repeatable-card";

        card.innerHTML = `
            <div class="repeatable-card-header">
                <strong>
                    Project ${String(count).padStart(2, "0")}
                </strong>

                <button
                    type="button"
                    class="remove-button"
                >
                    Remove
                </button>
            </div>

            <div class="form-grid">

                <div class="form-field full">
                    <label>Project name</label>

                    <input
                        type="text"
                        class="project-name"
                        placeholder="e.g. Resume Parser"
                    >
                </div>

                <div class="form-field full">
                    <label>Technologies</label>

                    <input
                        type="text"
                        class="project-tech"
                        placeholder="Python, React, Flask..."
                    >
                </div>

                <div class="form-field full">
                    <label>Description</label>

                    <textarea
                        class="project-description"
                        rows="4"
                        placeholder="Describe your project and achievements..."
                    ></textarea>
                </div>

            </div>
        `;

        projectsContainer.appendChild(card);

        connectProjectInputs(card);

        updateProjectsPreview();
        updateProgress();
        saveResume();

    });

}


/* =========================================================
   TEMPLATE SELECTION
========================================================= */

const templateOptions =
    document.querySelectorAll(".template-option");

const resumePaper =
    document.getElementById("resumePaper");


function applyTemplate(templateName) {

    if (!resumePaper || !templateName) return;

    const templateClasses = [
        "template-modern",
        "template-minimal",
        "template-classic",
        "template-tech",
        "template-creative",
        "template-ats",
        "template-corporate",
        "template-elegant",
        "template-sidepanel",
        "template-bold",
        "template-academic",
        "template-graduate"
    ];

    resumePaper.classList.remove(...templateClasses);

    resumePaper.classList.add(
        `template-${templateName}`
    );

    templateOptions.forEach((option) => {

        option.classList.toggle(
            "selected",
            option.dataset.template === templateName
        );

    });

}


templateOptions.forEach((option) => {

    option.addEventListener("click", () => {

        const templateName =
            option.dataset.template;

        applyTemplate(templateName);

        saveResume();

    });

});


/* =========================================================
   RESUME PROGRESS
========================================================= */

function updateProgress() {

    const requiredFields = [
        fullName,
        jobTitle,
        email,
        phone,
        locationInput,
        summaryText
    ].filter(Boolean);

    let total = requiredFields.length;
    let completed = 0;

    requiredFields.forEach((field) => {

        if (field.value.trim()) {
            completed++;
        }

    });

    if (skillsList) {

        total++;

        if (
            skillsList.querySelectorAll(".skill-tag").length > 0
        ) {
            completed++;
        }

    }

    if (experienceContainer) {

        total++;

        const hasExperience = [
            ...experienceContainer.querySelectorAll(
                ".repeatable-card"
            )
        ].some((card) => {

            return [
                ".experience-role",
                ".experience-company",
                ".experience-description"
            ].some((selector) => {

                return card
                    .querySelector(selector)
                    ?.value.trim();

            });

        });

        if (hasExperience) completed++;

    }

    if (educationContainer) {

        total++;

        const hasEducation = [
            ...educationContainer.querySelectorAll(
                ".repeatable-card"
            )
        ].some((card) => {

            return [
                ".education-degree",
                ".education-school"
            ].some((selector) => {

                return card
                    .querySelector(selector)
                    ?.value.trim();

            });

        });

        if (hasEducation) completed++;

    }

    if (projectsContainer) {

        total++;

        const hasProjects = [
            ...projectsContainer.querySelectorAll(
                ".repeatable-card"
            )
        ].some((card) => {

            return [
                ".project-name",
                ".project-description"
            ].some((selector) => {

                return card
                    .querySelector(selector)
                    ?.value.trim();

            });

        });

        if (hasProjects) completed++;

    }

    const percentage = total
        ? Math.round((completed / total) * 100)
        : 0;

    const progressBar =
        document.getElementById("progressBar");

    const completionPercent =
        document.getElementById("completionPercent");

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    if (completionPercent) {
        completionPercent.textContent = `${percentage}%`;
    }

    return percentage;

}


/* =========================================================
   SAFE HTML TEXT
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   REFRESH PREVIEW
========================================================= */

function refreshResumePreview() {

    updatePersonalPreview();

    if (previewSummary && summaryText) {

        previewSummary.textContent =
            summaryText.value.trim() ||
            "Your professional summary will appear here.";

    }

    updateSkillPreview();
    updateExperiencePreview();
    updateEducationPreview();
    updateProjectsPreview();
    updateProgress();

}
/* =========================================================
   SAVE RESUME LOCALLY
========================================================= */

function saveResume() {
    try {
        const resumeData = {
            personal: {
                fullName: fullName?.value || "",
                jobTitle: jobTitle?.value || "",
                email: email?.value || "",
                phone: phone?.value || "",
                location: locationInput?.value || "",
                linkedin: linkedin?.value || "",
                github: github?.value || ""
            },
            summary: summaryText?.value || "",
            skills: skillsList
                ? Array.from(
                    skillsList.querySelectorAll(".skill-tag")
                ).map(tag => tag.textContent.trim())
                : [],
            savedAt: new Date().toISOString()
        };

        localStorage.setItem(
            "resumeforge_resume",
            JSON.stringify(resumeData)
        );

    } catch (error) {
        console.error("Unable to save resume:", error);
    }
}


/* =========================================================
   LOAD RESUME LOCALLY
========================================================= */

function loadResume() {
    try {
        const savedData = localStorage.getItem(
            "resumeforge_resume"
        );

        if (!savedData) return;

        const data = JSON.parse(savedData);

        if (data.personal) {
            if (fullName) fullName.value = data.personal.fullName || "";
            if (jobTitle) jobTitle.value = data.personal.jobTitle || "";
            if (email) email.value = data.personal.email || "";
            if (phone) phone.value = data.personal.phone || "";
            if (locationInput) locationInput.value = data.personal.location || "";
            if (linkedin) linkedin.value = data.personal.linkedin || "";
            if (github) github.value = data.personal.github || "";
        }

        if (summaryText) {
            summaryText.value = data.summary || "";
        }

        if (data.skills && skillsList) {
            skillsList.innerHTML = "";

            data.skills.forEach(skill => {
                const tag = document.createElement("span");
                tag.className = "skill-tag";
                tag.textContent = skill;
                skillsList.appendChild(tag);
            });
        }

        refreshResumePreview();

    } catch (error) {
        console.error("Unable to load saved resume:", error);
    }
}


/* =========================================================
   AUTOMATIC SAVE
========================================================= */

document.querySelectorAll(
    "input, textarea, select"
).forEach(field => {
    field.addEventListener("input", saveResume);
    field.addEventListener("change", saveResume);
});


/* =========================================================
   INITIALIZE BUILDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadResume();
    refreshResumePreview();
});
