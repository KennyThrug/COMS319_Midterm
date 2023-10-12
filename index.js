
function toggleAdvancedSearch(){
    let toggleButton = document.getElementById(`toggleAdvancedSearch`);
    var card = document.getElementById(`AdvancedSearch`);
    let collapsableCard = new bootstrap.Collapse(card, {toggle: false});
    toggleButton.addEventListener('click',function () {
        collapsableCard.toggle();
    });
}

//Does the following when the page has fully loaded... Added for extra safety to avoid data races, which I have come across in the past
window.onload = function() {
    toggleAdvancedSearch();
}