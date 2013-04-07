(function($) {

$.fn.selectcompletion = function(options) {

	// make sure we have an options object
	options = options || {};

	// setup our defaults
	var defaults = {
	minChars: 0
	, width: 310
	, matchContains: true
	, autoFill: false
	, formatItem: function(row, i, max) {
	return row.name;
	}
	, formatMatch: function(row, i, max) {
	return row.name;
	}
	, formatResult: function(row) {
	return row.name;
	}
	};

	options = $.extend(defaults, options);

	return this.each(function() {

		var
			$this = $(this),
			keys=[],
			data=[]
			;
		
		$this.children('option').each(function() {

			var $option = $(this);

			if ($option.val() != '') { //ignore empty value options
				keys[$option.text()]=$option.val();
				data.push($option.text());
			}
		});

		var firstvalue = $this.find("option:first-child").val();
		var firstlabel = $this.find("option:first-child").text();
		var currentlabel=firstlabel;

		var $wrapper = $('<span style="display:inline-block;position:relative;"></span>').insertAfter($this);
		var $value = $('<input type="hidden" name="'+$this.attr("name")+'" value="'+firstvalue+'">')
			.appendTo($wrapper);
		var $input = $('<input type="text" style="margin:0;height:20px;" class="ui-state-default ui-combobox-input ui-widget ui-widget-content ui-corner-left ui-autocomplete-input"/>')
			.val(firstlabel)
			.appendTo($wrapper);

		var $button = $('<a style="top:0;position:absolute;margin-left:-1px;height:22px;">')
			.attr("title","Show all")
			.tooltip()
			.button({
				icons: {
					primary: "ui-icon-triangle-1-s"
				},
				text: false
			})
			.removeClass("ui-corner-all")
			.addClass("ui-corner-right ui-combobox-toggle")
			.click(function(){
				$input.focus();
				$input.autocomplete( "search", "" );
			})
			.appendTo($wrapper);		

		$input
			.autocomplete({
				minLength:0,
				source:data,
				response:function(event,ui) {
				
				},
				select:function(event,ui) {
					key=ui.item.value;
					$value.val(keys[key]);
					currentlabel=key;
				},
				close:function(event,ui) {
					$input.val(currentlabel);
				}
			})
			.focus(function(){
				$(this).autocomplete( "search", $input.val() );
			})
			;
		
		
		$this.remove();
	});
};	
  
})(jQuery);
