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
    const response = document.querySelector('.response');
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
    
    questionElement.innerText = questions[currentQuestion];

    nextButton.addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            questionElement.innerText = questions[currentQuestion];
            progressBar.style.width = ((currentQuestion + 1) / questions.length) * 100 + '%';
            if (currentQuestion === questions.length - 1) {
                this.innerText = 'סיום';
            }
        } else {
            questionContainer.innerHTML = '<h2>תודה על המשוב!</h2>';
        }
    });

    menuIcon.addEventListener('click', toggleMenu);
    logo.addEventListener('click', goHome);
    profilePic.addEventListener('click', openProfile);

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }

    function goHome() {
        window.location.href = 'Home_Page.html';
    }

    function openProfile() {
       
    }
});
