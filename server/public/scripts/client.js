console.log('client ready');
$(readyNow);

function readyNow() {
    console.log('DOM Loaded');
    getItemList();
    $('#add-item-button').on('click', getItems);
    $('.list-items-body').on('click', '.complete-button', markComplete);
    $('.list-items-body').on('click', '.delete-button', deleteRow);
}

/**
 * @api ajax POST item to server
 * 
 * .then call function to append new item list to DOM
 */
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

/**
 * @api ajax GET new item list as a response
 * 
 *  When add button is clicked
 *  - reset item input value to blank
 *  - empty old item list
 *  - .then append new item list to table
 * 
 *  if item property complete === true, 
 *  - make name cell and complete cell green
 */
function getItemList() {
    $('#item-input').val('');
    $('.list-items-body').empty();
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then(function(response) {
        for ( let i=0; i<response.length; i++ ) {
            const item = response[i];
        
            $('.list-items-body').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.complete}</td>
                    <td><button data-id=${item.id} class="complete-button">Mark Complete</button></td>
                    <td><button data-id=${item.id} class="delete-button">Delete</button></td>
                </tr>
            `); 
            if ( item.complete === true ){
                $('.name-cell').css('background-color', 'green');
                $('.status-cell').css('background-color', 'green');
            }
        } 
    })
};

/**
 * @api ajax PUT 
 *  when mark complete button is clicked
 *  update that item's complete property to true
 * 
 *  logic on server side
 */
function markComplete() {
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

/**
 * @api ajax DELETE
 * 
 *  when delete button is clicked
 *  item with matching data id (applied in getItemList)
 *  is deleted from server
 *  then getItemList is called to update the new list of items
 */
function deleteRow() {
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
