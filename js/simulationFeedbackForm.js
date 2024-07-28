document.addEventListener('DOMContentLoaded', (event) => {
    var sliders = document.querySelectorAll('.slider');
    sliders.forEach(function(slider) {
        var output = document.getElementById(slider.id + 'Value');
        output.innerHTML = slider.value;
        slider.oninput = function() {
            output.innerHTML = this.value;
        }
    });
});
