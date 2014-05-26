window.MONEY_FORMAT = "\\$?[0-9]+(\\.[0-9]+|)";

function addUser() {
    $('<label>Name<input class="user" type="text" /></label>').insertBefore($('#addUser'));
    $("input.user:last").focus();
}

function deleteUser() {
    $("input.user:last").remove();
    $("input.user:last").focus();
}

function saveUsersAndContinue() {
    window.SELECTS = "";
    $("input.user").each(function() {    
        // Add all user names to the select options
        window.SELECTS += '<option value="' + $(this).val() + '">' + $(this).val() + "</option>";
    });

    if ($(".item-field").size() == 0) {
        addItem();
    }

    // Hide the other sections
    showOneScreen("inputBill");
}

function addItem() {

    $('<div class="item-field"><div class="columns small-4"><label>Item Name<input class="itemName" type="text" required></label><small class="error">Name is required and must be a string.</small></div><div class="columns small-4"><label>Item Price<input class="itemPrice" type="text" required pattern="' + window.MONEY_FORMAT + '"></label><small class="error">Not a valid-formatted price!</small></div><div class="columns small-4"><label>Item Buyer<select class="itemBuyer" type="text" required>' + window.SELECTS + '</select></label></div></div>').insertBefore($("#addItem"));
    $("input.itemName:last").focus();
}

function deleteItem() {
    $("div.item-field:last").remove();
    $("input.itemName:focus").focus();
}

function saveTipTaxAndContinue() {
    calculate();

    showOneScreen("final");

    for (user in window.USERNAMES) {
        $("#final").append('<h2>' + user + '</h2><div class="row"><div class="columns small-6">Total:</div><div class="columns small-6">' + window.USERNAMES[user].toFixed(2) + '</div></div><div class="row"><div class="columns small-6">Tip:</div><div class="columns small-6">' + (window.USERNAMES[user]*window.tipMultiplier).toFixed(2) + '</div></div><div class="row"><div class="columns small-6">Total w/tip</div><div class="columns small-6">' + (window.USERNAMES[user]*(1+window.tipMultiplier)).toFixed(2) + '</div></div>');
    };
}

function calculate() {
    window.tipMultiplier = (parseFloat($("#tip").val().replace(/[^0-9.]/g,""))/100.0);
    var tax = parseFloat($("#tax").val().replace(/[^0-9.]/g,""));

    console.log("The tip multiplier you want to use is " + (tipMultiplier*100) + "% and the tax is $" + tax);

    var subtotal = 0.0;


    // Associative array of users to money owed
    window.USERNAMES = new Array();
    $("input.user").each(function() {
        window.USERNAMES[$(this).val()] = 0.00;
    })

    // Add the subtotal of each item to each user's value, and also calculates a bill subtotal
    $(".item-field").each(function() {
        var thisItem = parseFloat($(this).find(".itemPrice").val());

        subtotal += thisItem;
        window.USERNAMES[$(this).find(".itemBuyer").val()] += thisItem;
    });

    window.taxMultiplier = (tax/subtotal);

    console.log("The tax in your area seems to be " + ((taxMultiplier)*100) + "%");

    for (user in window.USERNAMES) {
        window.USERNAMES[user] *= (1+window.taxMultiplier);
    }
}   


function showOneScreen(screenId) {
    $("div.singleStep:not(#" + screenId + ")").hide();
    $("div.singleStep#" + screenId).show();
}

