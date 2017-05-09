jQuery(document).ready(function($) {

	$("input").on("input", function() {
		var label = $(this).parent('div.form-group').find('label.form-label');
		if ($(this).val() === "" && !label.hasClass('hidden-label')) {
			label.addClass('hidden-label');
			label.slideDown('200');
		}
		if ($(this).val() !== "" && label.hasClass('hidden-label')) {
			label.slideDown('200');
			label.removeClass('hidden-label')
		}
	});
	$("input").focusout(function() {
		var label = $(this).parent('div.form-group').find('label.form-label');
		if ($(this).val() !== "") {
			label.addClass('visible-label');
			$(this).addClass('filled-input');
		} else {
			label.removeClass('visible-label');
			$(this).removeClass('filled-input');
		}
	});
	$("input.form-control-date").blur(function() {
		var fullDate = $(this).val();
		var pieces = $(this).val().split("-").reverse().join("/");
		$(this).val(pieces);
	});
});

