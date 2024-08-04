document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const logo = document.querySelector('.logo');
    const profilePic = document.querySelector('.profile-pic');
    const videoTitleElement = document.getElementById('video-title');
    const breadcrumb = document.querySelector('.breadcrumb');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.querySelector('.progress-bar');
    const questionContainer = document.querySelector('.question-container');
    const questionElement = document.querySelector('.question');
    const responseElement = document.querySelector('.response');
    const nextButton = document.querySelector('.next-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const videoTitle = urlParams.get('title') || 'חילוץ טנק סימן 2 מעמק';
    videoTitleElement.innerText = videoTitle;

    let currentQuestion = 0;
    const questions = [
        "איך ההרגשה לאחר הסימולציה?",
        "האם מורגש שיפור ביכולותייך?",
        "האם יש מה לשפר בסימולציה?",
        "במה הכי התקשתה?",
        "האם יש הערות נוספות?"
    ];

    const responses = [];

    questionElement.innerText = questions[currentQuestion];

    nextButton.addEventListener('click', function () {
        responses[currentQuestion] = responseElement.value;

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            questionElement.innerText = questions[currentQuestion];
            responseElement.value = responses[currentQuestion] || '';
            progressBar.style.width = ((currentQuestion + 1) / questions.length) * 100 + '%';

            if (currentQuestion === questions.length - 1) {
                this.innerText = 'סיום';
            }
        } else {
            submitFeedback();
        }
    });

    function submitFeedback() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (!userData || !userData.id) {
            return;
        }

        const feedbackData = {
            soldierID: userData.id,
            answer1: responses[0] || '',
            answer2: responses[1] || '',
            answer3: responses[2] || '',
            answer4: responses[3] || '',
            answer5: responses[4] || ''
        };

        fetch('/addFeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    questionContainer.innerHTML = '<h2>תודה על המשוב!</h2>';
                }
            })
            .catch(error => console.error('Error submitting feedback:', error));
    }

    menuIcon.addEventListener('click', toggleMenu);
    logo.addEventListener('click', goHome);

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }

    function goHome() {
        window.location.href = 'Home_Page.html';
    }
});
