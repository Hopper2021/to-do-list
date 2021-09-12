console.log('client ready');
$(readyNow);

function readyNow() {
    console.log('DOM Loaded');
    $('#add-item-button').on('click', getItems);
    getItemList();
}

function getItems () {
    let itemToAdd = {
        name: $('#item-input').val(),
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
    $('#list-items-row').empty();
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then(function(response) {
        console.log('in GET new item list', response);
        for ( let i=0; i<response.length; i++ ) {
            $('#list-item-row').append(`
                <tr>
                    <td>${response[i].id}</td>
                    <td>${response[i].name}</td>
                    <td>${response[i].complete}</td>
                </tr>
            `);
        }
    });
}