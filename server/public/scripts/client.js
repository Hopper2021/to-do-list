console.log('client ready');
$(readyNow);

function readyNow() {
    console.log('DOM Loaded');
    getItemList();
    $('#add-item-button').on('click', getItems);
    $('.list-items-body').on('click', '.complete-button', markComplete);
    $('.list-items-body').on('click', '.delete-button', deleteRow);
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
    $('.list-items-body').empty();
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then(function(response) {
        console.log('in GET new item list', response);
        for ( let i=0; i<response.length; i++ ) {
            $('.list-items-body').append(`
                <tr>
                    <td>${response[i].name}</td>
                    <td>${response[i].complete}</td>
                    <td><button class="complete-button">Mark Complete</button></td>
                    <td><button class="delete-button">Delete</button></td>
                </tr>
            `);
        }
    });
}

function markComplete() {
    console.log('In markComplete, this:', $(this));
}

function deleteRow() {
    console.log('In deleteRow, this:', $(this));
}
