/* =========================================
   WALKING WEB SQUIRREL ASSISTANT
   Controlled FAQ Assistant
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const assistant = document.getElementById("squirrel-assistant");
    const toggleButton = document.getElementById("squirrel-toggle");
    const closeButton = document.getElementById("squirrel-close");

    const chatWindow = document.getElementById("squirrel-chat");
    const messages = document.getElementById("squirrel-messages");

    const questionButtons = document.querySelectorAll(
        ".squirrel-questions button"
    );

    const form = document.getElementById("squirrel-form");
    const input = document.getElementById("squirrel-input");


    /* =========================================
       APPROVED ANSWERS
       ========================================= */

    const answers = {

        hours: `
            <strong>Our Hours 🕐</strong><br><br>
            The Walking Web is open from
            <strong>9:00 AM–7:00 PM, Monday–Saturday.</strong>
            <br><br>
            We are closed on Sundays.
        `,

        contact: `
            <strong>Contact Us 📩</strong><br><br>
            The best way to contact us is through our
            <strong>booking site.</strong>
            <br><br>
            All inquiries are answered within
            <strong>24–48 hours.</strong>
        `,

        pricing: `
            <strong>Our Pricing 💰</strong><br><br>
            Pricing depends on the service and scope
            of your project.
            <br><br>
            We recommend booking a
            <strong>free consultation</strong> so we can
            discuss your goals, vision, and the services
            that best fit your needs.
        `,

        remote: `
            <strong>How We Work 💻</strong><br><br>
            We currently work remotely.
            <br><br>
            Meetings and collaboration are handled through
            Zoom and other digital collaboration tools,
            and you'll receive updates throughout the project.
        `,

        services: `
            <strong>Our Services 💻</strong><br><br>

            We offer:
            <ul>
                <li>Website Design</li>
                <li>Marketing Insights & Social Media Moderation</li>
                <li>Local Market Intelligence Reports</li>
                <li>AI Business Efficiency Audits</li>
                <li>Small Business Digital Presence Audits</li>
                <li>Grant + Funding Readiness Consulting</li>
                <li>SOP & Knowledge Base Creation</li>
                <li>Customer Experience Audits</li>
                <li>Reputation & Review Management</li>
            </ul>
        `
    };


    /* =========================================
       QUESTIONS THE SQUIRREL UNDERSTANDS
       ========================================= */

    const keywords = {

        hours: [
            "hours",
            "open",
            "opening",
            "close",
            "closed",
            "when are you open",
            "what time",
            "business hours",
            "saturday",
            "sunday"
        ],

        contact: [
            "contact",
            "contact you",
            "reach you",
            "email",
            "message",
            "get in touch",
            "how do i contact"
        ],

        pricing: [
            "price",
            "prices",
            "pricing",
            "cost",
            "costs",
            "how much",
            "charge",
            "rate",
            "rates",
            "expensive"
        ],

        services: [
            "service",
            "services",
            "what do you do",
            "what can you do",
            "offer",
            "what do you offer",
            "website",
            "marketing",
            "social media",
            "grant",
            "sop",
            "audit",
            "reputation"
        ],

        remote: [
            "office",
            "office visit",
            "office visits",
            "in person",
            "in-person",
            "visit",
            "come to me",
            "do you travel",
            "remote",
            "zoom"
        ]
    };


    /* =========================================
       FALLBACK RESPONSE
       ========================================= */

    const fallbackAnswer = `
        Hmm... I'm just a little squirrel! 🐿️
        <br><br>
        I can help with questions about our
        <strong>hours, contact information, pricing,
        services,</strong> and <strong>how we work.</strong>
        <br><br>
        For anything else, please book a free
        consultation and our team can help you out!
    `;


    /* =========================================
       OPEN ASSISTANT
       ========================================= */

    function openAssistant() {
        assistant.classList.add("open");
        toggleButton.setAttribute("aria-expanded", "true");
        chatWindow.setAttribute("aria-hidden", "false");
    }


    /* =========================================
       CLOSE ASSISTANT
       ========================================= */

    function closeAssistant() {
        assistant.classList.remove("open");
        toggleButton.setAttribute("aria-expanded", "false");
        chatWindow.setAttribute("aria-hidden", "true");
    }


    /* =========================================
       ADD MESSAGE
       ========================================= */

    function addMessage(content, type = "bot") {

        const message = document.createElement("div");

        message.classList.add(
            "squirrel-message"
        );

        if (type === "user") {

            message.classList.add(
                "squirrel-user-message"
            );

            message.textContent = content;

        } else {

            message.classList.add(
                "squirrel-bot-message"
            );

            message.innerHTML = content;

        }

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }


    /* =========================================
       FIND APPROVED ANSWER
       ========================================= */

    function findAnswer(question) {

        const normalizedQuestion =
            question.toLowerCase().trim();

        for (const category in keywords) {

            const matches = keywords[category].some(
                keyword =>
                    normalizedQuestion.includes(keyword)
            );

            if (matches) {
                return answers[category];
            }
        }

        return fallbackAnswer;
    }


    /* =========================================
       RESPOND TO QUESTION
       ========================================= */

    function respondToQuestion(question) {

        if (!question.trim()) {
            return;
        }

        addMessage(question, "user");

        setTimeout(() => {

            const answer =
                findAnswer(question);

            addMessage(answer, "bot");

        }, 450);
    }


    /* =========================================
       TOGGLE BUTTON
       ========================================= */

    toggleButton.addEventListener(
        "click",
        () => {

            if (
                assistant.classList.contains("open")
            ) {

                closeAssistant();

            } else {

                openAssistant();

            }

        }
    );


    /* =========================================
       CLOSE BUTTON
       ========================================= */

    closeButton.addEventListener(
        "click",
        closeAssistant
    );


    /* =========================================
       SUGGESTED QUESTIONS
       ========================================= */

    questionButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const question =
                    button.dataset.question;

                const answer =
                    answers[question];

                addMessage(
                    button.textContent.trim(),
                    "user"
                );

                setTimeout(() => {

                    addMessage(
                        answer,
                        "bot"
                    );

                }, 350);

            }
        );

    });


    /* =========================================
       TYPED QUESTIONS
       ========================================= */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const question =
                input.value.trim();

            if (!question) {
                return;
            }

            respondToQuestion(question);

            input.value = "";
        }
    );


    /* =========================================
       ESC KEY CLOSES ASSISTANT
       ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                assistant.classList.contains("open")
            ) {
                closeAssistant();
            }
        }
    );

});
