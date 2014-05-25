function addUser() {
	$('<label>Name<input id="user" type="text" /></label>').insertBefore($('#add'));
	$("label:last").focus();
}

function deleteUser() {
	$("label:last").remove();
	$("label:last").focus();
}

function moveToInputMenu() {
	window.USERS = new Array();
	$("input#user").each(function() {window.USERS.push($(this).val())});
	$("#inputUsers").hide();

}