document.getElementById('add-soldier-form').addEventListener('submit', function(event) {
    const fileInput = document.getElementById('profile-picture');
    const file = fileInput.files[0];
    if (file && (file.size > 300 * 1024 || file.type !== 'image/png')) {
        event.preventDefault();
        alert('הקובץ חייב להיות מסוג PNG ובגודל עד 300KB.');
    }
});
