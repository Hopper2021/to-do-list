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
    $('#item-input').val('');
    $('.list-items-body').empty();
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then(function(response) {
        console.log('in GET new item list', response);
        for ( let i=0; i<response.length; i++ ) {
            const item = response[i];
            
            $('.list-items-body').append(`
                <tr>
                    <td data-name="name-cell">${item.name}</td>
                    <td data-name="status-cell">${item.complete}</td>
                    <td><button data-id=${item.id} class="complete-button">Mark Complete</button></td>
                    <td><button data-id=${item.id} class="delete-button">Delete</button></td>
                </tr>
            `);
        }
    });
}

function markComplete() {
    console.log('In markComplete, this:', $(this));
    const itemId = $(this).data('id');
    

    $.ajax({
        method: 'PUT',
        url: `/items/${itemId}`
    }).then(function(response) {
        console.log('Success! Item marked complete.');
        getItemList();
    }).catch(function(error) {
        alert('Something went wrong!');
        console.log('Unable to mark item as complete, error:', error);
    });
}

function deleteRow() {
    console.log('In deleteRow, this:', $(this));

    const itemId = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/items/${itemId}`
    }).then(function(response) {
        console.log('Success! Item removed.');
        getItemList();
    }).catch(function(error) {
        alert('Something went wrong!');
        console.log('Unable to delete item, error:', error);
    });
}
