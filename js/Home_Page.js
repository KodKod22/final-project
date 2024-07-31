document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const vrText = document.querySelector('.vr-text');
    const popup = document.getElementById('vr-modal');
    const closeBtn = document.querySelector('.close');
    const menuIcon = document.querySelector('.menu-icon');
    const connectButton = document.querySelector('.connect-btn');

    function toggleMenu() {
        if (sidebar.style.right === '-250px' || sidebar.style.right === '') {
            sidebar.style.right = '0';
            overlay.style.display = 'block';
        } else {
            sidebar.style.right = '-250px';
            overlay.style.display = 'none';
        }
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
    if (vrText) {
        vrText.addEventListener('click', connectVR);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    if (overlay) {
        overlay.addEventListener('click', closeOverlay);
    }
    if (connectButton) {
        connectButton.addEventListener('click', connectToVR);
    }

    window.navigateTo = navigateTo;
});
