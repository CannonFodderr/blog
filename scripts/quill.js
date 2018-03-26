<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

var quill = new Quill('#editor', {
    theme: 'snow',
    
});

init();

function init () {
var addIngridient = document.getElementById('addIngridient');
var amountInput = document.getElementById('amountInput');
var ingridientsList = document.getElementById('ingridientsList');
var listItems = document.getElementsByClassName('listItem');


addIngridient.addEventListener('click', addItem);
ingridientsList.addEventListener('mouseover', removeItem);
}

function addItem() {
var userInput = document.getElementById('ingridientInput');
document.getElementById('ingridientsList').innerHTML += "<div class='item listItem'><span class='removeButton'><i class='red trash alternate icon'></i></span><strong>" + ingridientInput.value + "</strong> - " + amountInput.value + "</div>";
userInput.value = "";
amountInput.value = "";
init();
};