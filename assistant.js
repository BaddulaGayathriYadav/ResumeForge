const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let currentTool = "summary";

const toolConfig = {
    summary: {
        title: "Professional summary",
        placeholder:
            "Example: Computer science student with experience in Python, machine learning and web development...",
        button: "Improve my summary",
        tip:
            "Strong summaries usually explain who you are, what you do well, and the value you can bring to the role."
    },

    experience: {
        title: "Experience bullet",
        placeholder:
            "Example: Worked on a Python project and helped the team automate repetitive tasks...",
        button: "Strengthen my bullet",
        tip:
            "Start bullets with strong action verbs and describe what you changed, built, improved or delivered."
    },

    project: {
        title: "Project description",
        placeholder:
            "Example: Built a student project using Python and machine learning to classify resumes...",
        button: "Polish my project",
        tip:
            "A strong project description quickly explains what you built, the technology used, and why it mattered."
    },

    keywords: {
        title: "Job match",
        placeholder:
            "Paste the most important part of your resume or your current skills here...",
        button: "Check job match",
        tip:
            "Use relevant keywords naturally. Match the language of the job description without stuffing unrelated terms."
    }
};


/* =========================================================
   SECURITY
========================================================= */

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   TEXT HELPERS
========================================================= */

function wordCount(text) {
    return text.trim()
        ? text.trim().split(/\s+/).length
        : 0;
}


function getWords(text) {
    return (text.toLowerCase().match(/[a-z][a-z+#.-]{2,}/g) || [])
        .map(word =>
            word.replace(/[.,;:!?()[\]{}]/g, "")
        )
        .filter(word => word.length >= 3);
}


/* =========================================================
   KEYWORD EXTRACTION
========================================================= */

function extractKeywords(text) {

    const stopWords = new Set([
        "the",
        "and",
        "for",
        "with",
        "from",
        "that",
        "this",
        "have",
        "has",
        "had",
        "you",
        "your",
        "our",
        "are",
        "was",
        "were",
        "will",
        "can",
        "who",
        "what",
        "into",
        "about",
        "their",
        "they",
        "them",
        "than",
        "then",
        "using",
        "used",
        "work",
        "working",
        "role",
        "team",
        "job",
        "skills",
        "experience",
        "years",
        "ability",
        "strong",
        "good",
        "including",
        "such",
        "more",
        "most",
        "other",
        "also",
        "not",
        "but",
        "all",
        "any",
        "how",
        "why",
        "where",
        "when",
        "which",
        "should",
        "would",
        "could",
        "must",
        "need",
        "needs",
        "looking",
        "lookingfor"
    ]);

    const frequency = {};

    getWords(text).forEach(word => {

        if (
            !stopWords.has(word) &&
            !/^\d+$/.test(word)
        ) {
            frequency[word] =
                (frequency[word] || 0) + 1;
        }

    });

    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(item => item[0]);
}


/* =========================================================
   JOB KEYWORDS
========================================================= */

function extractJobKeywords(jobText) {

    const commonTech = [

        "python",
        "java",
        "javascript",
        "typescript",
        "react",
        "node.js",
        "node",
        "sql",
        "html",
        "css",
        "git",
        "github",
        "aws",
        "azure",
        "docker",
        "kubernetes",
        "machine learning",
        "deep learning",
        "nlp",
        "data analysis",
        "excel",
        "power bi",
        "tableau",
        "figma",
        "communication",
        "leadership",
        "problem solving",
        "project management",
        "testing",
        "api",
        "rest",
        "mongodb",
        "postgresql"
    ];

    const lower =
        jobText.toLowerCase();

    const found =
        commonTech.filter(keyword =>
            lower.includes(keyword)
        );

    const generic =
        extractKeywords(jobText).filter(word =>
            !found.some(item =>
                item === word
            )
        );

    return [
        ...found,
        ...generic
    ].slice(0, 12);
}


/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(text) {

    return text
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}


/* =========================================================
   IMPROVE SUMMARY
========================================================= */

function improveSummary(text) {

    const clean =
        normalizeText(text);

    if (!clean) {
        return "";
    }

    let result = clean;

    result = result.replace(
        /\bI am\b/gi,
        "Professional"
    );

    result = result.replace(
        /\bI have\b/gi,
        "Experienced in"
    );

    result = result.replace(
        /\bI know\b/gi,
        "Skilled in"
    );

    result = result.replace(
        /\bI can\b/gi,
        "Able to"
    );

    result = result.replace(
        /\bworked on\b/gi,
        "contributed to"
    );

    result = result.replace(
        /\bhelped with\b/gi,
        "supported"
    );

    result = result.replace(
        /\bresponsible for\b/gi,
        "managed"
    );

    result = result.replace(
        /\bgood at\b/gi,
        "skilled in"
    );

    if (!/[.!?]$/.test(result)) {
        result += ".";
    }

    return result;
}


/* =========================================================
   IMPROVE EXPERIENCE
========================================================= */

function improveExperience(text) {

    const lines =
        normalizeText(text)
            .split("\n")
            .map(line =>
                line
                    .replace(/^[-•*]\s*/, "")
                    .trim()
            )
            .filter(Boolean);

    const replacements = [

        [/\bworked on\b/i, "Contributed to"],

        [/\bhelped with\b/i, "Supported"],

        [/\bhelped\b/i, "Supported"],

        [/\bresponsible for\b/i, "Managed"],

        [/\bmade\b/i, "Developed"],

        [/\bcreated\b/i, "Built"],

        [/\bused\b/i, "Applied"],

        [/\bdid\b/i, "Executed"],

        [/\bhandled\b/i, "Managed"],

        [/\bparticipated in\b/i, "Contributed to"],

        [/\bworked with\b/i, "Collaborated with"]
    ];

    const improved =
        lines.map(line => {

            let output = line;

            replacements.forEach(
                ([pattern, replacement]) => {

                    output =
                        output.replace(
                            pattern,
                            replacement
                        );
                }
            );

            output =
                output.charAt(0).toUpperCase() +
                output.slice(1);

            if (!/[.!?]$/.test(output)) {
                output += ".";
            }

            return "• " + output;
        });

    return improved.join("\n");
}


/* =========================================================
   IMPROVE PROJECT
========================================================= */

function improveProject(text) {

    const clean =
        normalizeText(text);

    if (!clean) {
        return "";
    }

    let result = clean;

    result = result.replace(
        /\bbuilt\b/gi,
        "Developed"
    );

    result = result.replace(
        /\bmade\b/gi,
        "Developed"
    );

    result = result.replace(
        /\bused\b/gi,
        "Applied"
    );

    result = result.replace(
        /\bworked on\b/gi,
        "Developed"
    );

    result = result.replace(
        /\bhelped\b/gi,
        "Supported"
    );

    if (!/[.!?]$/.test(result)) {
        result += ".";
    }

    return result;
}


/* =========================================================
   SCORE
========================================================= */

function calculateScore(
    content,
    jobDescription,
    tool
) {

    const text =
        content.trim();

    if (!text) {
        return 0;
    }

    let score = 45;

    const words =
        wordCount(text);

    if (words >= 12) {
        score += 10;
    }

    if (words >= 25) {
        score += 8;
    }

    if (words >= 45) {
        score += 5;
    }

    const actionVerbs = [

        "built",
        "developed",
        "created",
        "managed",
        "led",
        "improved",
        "implemented",
        "designed",
        "analyzed",
        "delivered",
        "optimized",
        "automated",
        "collaborated",
        "contributed",
        "launched",
        "tested"
    ];

    if (
        actionVerbs.some(verb =>
            text
                .toLowerCase()
                .includes(verb)
        )
    ) {
        score += 12;
    }

    if (/\d/.test(text)) {
        score += 8;
    }

    if (/[.!?]/.test(text)) {
        score += 4;
    }

    if (jobDescription.trim()) {
        score += 3;
    }

    if (
        tool === "summary" &&
        words >= 35 &&
        words <= 90
    ) {
        score += 5;
    }

    if (
        tool === "experience" &&
        text.includes("\n")
    ) {
        score += 4;
    }

    return Math.min(96, score);
}


/* =========================================================
   SCORE LABEL
========================================================= */

function scoreLabel(score) {

    if (score >= 85) {
        return "Strong";
    }

    if (score >= 70) {
        return "Good";
    }

    if (score >= 55) {
        return "Needs polish";
    }

    return "Needs work";
}


/* =========================================================
   UPDATE SCORE UI
========================================================= */

function updateScore(score) {

    const ring =
        $("#scoreRing");

    const value =
        $("#scoreValue");

    const label =
        $("#scoreLabel");

    if (!score) {

        value.textContent = "—";

        label.textContent = "Ready";

        ring.style.background =
            "conic-gradient(#8b7cff 0deg,#252d3e 0deg)";

        return;
    }

    value.textContent =
        score;

    label.textContent =
        scoreLabel(score);

    const degrees =
        Math.round(score * 3.6);

    ring.style.background =
        `conic-gradient(
            #8b7cff 0deg ${degrees}deg,
            #252d3e ${degrees}deg 360deg
        )`;
}


/* =========================================================
   SUGGESTIONS
========================================================= */

function getSuggestions(
    content,
    jobDescription,
    tool
) {

    const tips = [];

    const lower =
        content.toLowerCase();

    if (!/\d/.test(content)) {

        tips.push(
            "Add a measurable result when you have one, such as time saved, users reached or accuracy improved."
        );
    }

    const weakPhrases = [

        "worked on",
        "helped",
        "responsible for",
        "did",
        "made",
        "used"
    ];

    if (
        weakPhrases.some(
            phrase =>
                lower.includes(phrase)
        )
    ) {

        tips.push(
            "Replace task-focused phrases with specific action verbs."
        );
    }

    if (wordCount(content) < 12) {

        tips.push(
            "Add a little more context so the reader understands what you actually contributed."
        );
    }

    if (jobDescription.trim()) {

        const jobKeywords =
            extractJobKeywords(
                jobDescription
            );

        const missing =
            jobKeywords.filter(
                keyword =>
                    !lower.includes(keyword)
            );

        if (missing.length) {

            tips.push(
                `Consider adding relevant keywords you genuinely have experience with: ${missing.slice(0, 4).join(", ")}.`
            );
        }
    }

    if (
        tool === "summary" &&
        wordCount(content) > 100
    ) {

        tips.push(
            "Keep the summary focused. Aim for a concise introduction rather than a full career history."
        );
    }

    if (tool === "experience") {

        tips.push(
            "Where possible, show the outcome of the work rather than only describing the task."
        );
    }

    if (tool === "project") {

        tips.push(
            "Mention the main technology, what you built, and the problem the project solved."
        );
    }

    if (!tips.length) {

        tips.push(
            "The structure is already strong. Review every phrase and keep only details that support the target role."
        );
    }

    return tips.slice(0, 4);
}


/* =========================================================
   KEYWORD UI
========================================================= */

function setKeywords(
    content,
    jobDescription
) {

    const list =
        $("#keywordList");

    list.innerHTML = "";

    let keywords = [];

    if (jobDescription.trim()) {

        const jobKeywords =
            extractJobKeywords(
                jobDescription
            );

        keywords =
            jobKeywords.filter(
                keyword =>
                    content
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        )
            );

        if (!keywords.length) {
            keywords =
                jobKeywords.slice(0, 6);
        }

    } else {

        keywords =
            extractKeywords(content);
    }

    if (!keywords.length) {

        const empty =
            document.createElement("span");

        empty.className =
            "keyword";

        empty.textContent =
            "No keywords detected";

        list.appendChild(empty);

        return;
    }

    keywords
        .slice(0, 10)
        .forEach(keyword => {

            const tag =
                document.createElement("span");

            tag.className =
                "keyword";

            tag.textContent =
                keyword;

            list.appendChild(tag);
        });
}


/* =========================================================
   RENDER RESULT
========================================================= */

function renderResult(
    resultText,
    content,
    jobDescription
) {

    $("#emptyState").style.display =
        "none";

    $("#result").classList.add(
        "show"
    );

    $("#resultText").textContent =
        resultText;

    $("#outputSubtitle").textContent =
        "Review the improved version and suggestions before using it.";

    setKeywords(
        content,
        jobDescription
    );

    const tips =
        getSuggestions(
            content,
            jobDescription,
            currentTool
        );

    $("#tipList").innerHTML =
        tips
            .map(
                tip =>
                    `<li>${escapeHtml(tip)}</li>`
            )
            .join("");

    const score =
        calculateScore(
            content,
            jobDescription,
            currentTool
        );

    updateScore(score);

    $("#resultLabel").textContent =
        currentTool === "keywords"
            ? "Job-match guidance"
            : "Improved version";
}


/* =========================================================
   GENERATE
========================================================= */

function generate() {

    const content =
        $("#content").value.trim();

    const jobDescription =
        $("#jobDescription").value.trim();

    if (
        !content &&
        currentTool !== "keywords"
    ) {

        $("#content").focus();

        $("#outputSubtitle").textContent =
            "Add some content first, then try again.";

        return;
    }

    if (
        currentTool === "keywords" &&
        !jobDescription
    ) {

        $("#jobDescription").focus();

        $("#outputSubtitle").textContent =
            "Paste a job description to check the match.";

        return;
    }

    let result = "";

    if (currentTool === "summary") {

        result =
            improveSummary(content);
    }

    if (currentTool === "experience") {

        result =
            improveExperience(content);
    }

    if (currentTool === "project") {

        result =
            improveProject(content);
    }

    if (currentTool === "keywords") {

        const keywords =
            extractJobKeywords(
                jobDescription
            );

        const current =
            content.toLowerCase();

        const matched =
            keywords.filter(
                keyword =>
                    current.includes(
                        keyword.toLowerCase()
                    )
            );

        const missing =
            keywords.filter(
                keyword =>
                    !current.includes(
                        keyword.toLowerCase()
                    )
            );

        result =
            `Matched keywords:
${matched.length
    ? matched.join(" · ")
    : "No strong matches found yet."}

Relevant keywords to consider:
${missing.length
    ? missing.slice(0, 8).join(" · ")
    : "Your current content covers the main detected terms."}

Tip: only add a keyword when it accurately reflects your real skills or experience.`;
    }

    renderResult(
        result,
        content || jobDescription,
        jobDescription
    );
}


/* =========================================================
   CHANGE TOOL
========================================================= */

function updateTool(tool) {

    currentTool =
        tool;

    $$(".tool-tab")
        .forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.tool === tool
            );
        });

    const config =
        toolConfig[tool];

    $("#content").placeholder =
        config.placeholder;

    $("#generateBtn").textContent =
        "✦ " + config.button;

    $("#quickTip").textContent =
        config.tip;

    if (tool === "keywords") {

        $("#content").placeholder =
            "Optional: paste your current skills, resume summary or experience here...";

        $("#jobDescription").placeholder =
            "Paste the job description here. ResumeForge will look for useful keywords...";
    }
}


/* =========================================================
   CHARACTER COUNT
========================================================= */

function updateCount() {

    const count =
        $("#content").value.length;

    $("#contentCount").textContent =
        `${count} character${count === 1 ? "" : "s"}`;
}


/* =========================================================
   LOAD SAVED RESUME
========================================================= */

function loadSavedResume() {

    const saved =
        localStorage.getItem(
            "resumeForgeData"
        );

    if (!saved) {

        $("#savedBadge")
            .classList
            .remove("show");

        $("#outputSubtitle").textContent =
            "No saved resume found in this browser yet.";

        return;
    }

    try {

        const data =
            JSON.parse(saved);

        let content = "";

        if (currentTool === "summary") {

            content =
                data.summary || "";
        }

        if (currentTool === "experience") {

            const experience =
                Array.isArray(data.experiences)
                    ? data.experiences
                    : [];

            content =
                experience
                    .slice(0, 2)
                    .map(
                        item =>
                            item.description || ""
                    )
                    .filter(Boolean)
                    .join("\n");
        }

        if (currentTool === "project") {

            content = "";

            $("#outputSubtitle").textContent =
                "Projects are not stored in the current builder save data yet. Paste your project description here.";
        }

        if (currentTool === "keywords") {

            const pieces = [

                data.title,

                data.summary,

                ...(Array.isArray(data.skills)
                    ? data.skills
                    : [])
            ]
            .filter(Boolean);

            content =
                pieces.join(" · ");
        }

        $("#content").value =
            content;

        updateCount();

        $("#savedBadge")
            .classList
            .add("show");

        if (content) {

            $("#outputSubtitle").textContent =
                "Saved resume content loaded. You can improve it now.";
        }

    } catch (error) {

        console.log(
            "Could not load saved resume.",
            error
        );
    }
}


/* =========================================================
   COPY RESULT
========================================================= */

$("#copyBtn")
    .addEventListener(
        "click",
        async () => {

            const text =
                $("#resultText")
                    .textContent;

            try {

                await navigator.clipboard
                    .writeText(text);

                $("#copyBtn")
                    .textContent =
                    "Copied ✓";

                setTimeout(() => {

                    $("#copyBtn")
                        .textContent =
                        "Copy";

                }, 1400);

            } catch (error) {

                $("#copyBtn")
                    .textContent =
                    "Select & copy";
            }
        }
    );


/* =========================================================
   EVENT LISTENERS
========================================================= */

$("#generateBtn")
    .addEventListener(
        "click",
        generate
    );


$("#loadResumeBtn")
    .addEventListener(
        "click",
        loadSavedResume
    );


$("#content")
    .addEventListener(
        "input",
        updateCount
    );


$$(".tool-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                updateTool(
                    tab.dataset.tool
                );
            }
        );
    });


/* =========================================================
   MOBILE MENU
========================================================= */

$("#menuBtn")
    .addEventListener(
        "click",
        () => {

            const menu =
                $("#mobileMenu");

            const isOpen =
                menu.style.display === "block";

            menu.style.display =
                isOpen
                    ? "none"
                    : "block";
        }
    );


/* =========================================================
   INITIAL STATE
========================================================= */

updateTool("summary");

updateCount();

updateScore(0);