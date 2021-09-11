console.log('client ready');
$(readyNow);

function readyNow() {
    console.log('DOM Loaded');
    $('#add-item-button').on('click', getItems);  
}

function getItems () {
    let itemToAdd = {
        name: $('#item-input').val(),
        complete: '',
    }
    $.ajax({
        method: 'POST',
        url: '/items',
        data: itemToAdd
    }).then(function(response){
        console.log('Success! Item added.');
        getItemList(response);
    }).catch(function(error) {
        alert('Something went wrong!');
        console.log('Error in getItems POST:', error);
    });
}

function getItemList() {
    $('#list-of-items').empty();
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then(function(response) {
        console.log('in GET new item list', response);
        // TODO Append item list to DOM
    });
}