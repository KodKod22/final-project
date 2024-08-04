document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const vrText = document.querySelector('.vr-text');
    const popup = document.getElementById('vr-modal');
    const closeBtn = document.querySelector('.close');
    const menuIcon = document.querySelector('.menu-icon');
    const connectButton = document.querySelector('.connect-btn');
    const profilePic = document.querySelector('.profile-pic img');

    function loadUserProfile() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        console.log('Loaded user data:', userData); 
        if (userData && userData.profile) {
            const profilePic = document.querySelector('.profile-pic img');
            profilePic.src = userData.profile; 
            console.log('Profile picture updated to:', userData.profile);
        } else {
            console.error('No profile image found or userData is not set.'); 
        }
    }
    

    function toggleMenu() {
        sidebar.style.right = sidebar.style.right === '-250px' || !sidebar.style.right ? '0' : '-250px';
        overlay.style.display = sidebar.style.right === '0' ? 'block' : 'none';
    }

    function connectVR() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    function closeModal() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }

    function closeOverlay() {
        closeModal();
        toggleMenu();
    }

    function connectToVR() {
        const vrNumber = document.getElementById('vr-number').value;
        if (vrNumber) {
            closeModal();
            alert('החיבור אל המשקפיים בוצע בהצלחה!');
        } else {
            alert('אנא הזן מספר משקפיים.');
        }
    }

    function navigateTo(page) {
        window.location.href = page;
    }

    menuIcon.addEventListener('click', toggleMenu);
    vrText.addEventListener('click', connectVR);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeOverlay);
    connectButton.addEventListener('click', connectToVR);

    loadUserProfile(); 
    window.navigateTo = navigateTo;
});
