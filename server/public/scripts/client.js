console.log('client ready');

$(readyNow);

function readyNow() {
    console.log('DOM Loaded');
    $('#add-item-button').on('click', getItems);  
}

function getItems () {
    let itemToAdd = {
        listItem: $('#item-input').val();
    }
}