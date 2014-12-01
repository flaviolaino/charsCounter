/*
 * Character counter and limit jQuery plugin v1.1
 *
 * by Flavio Laino
 */
(function($) {
	'use strict';

	$.fn.charsCounter = function(options) {
		options = $.extend({
			limit_enable : false,
			limit_max : 255,
			template : [
				  '<div class="charscounter-container">'
				, '<span class="charscounter-counter">'
				, '0'
				, '</span>'
				, '<span class="charscounter-limiter-container" style="display:none">'
				, ' / '
				, '<span class="charscounter-limiter-limit">'
				, '</span>'
				, '</span>'
				, '</div>'
			],
			css : {
				position : 'absolute' ,
				right: '4px' ,
				bottom: '1px' ,
				opacity: '.6' ,
				fontSize : '10px' ,
			}
		}, options);

		return this.each(function(i, el) {
			var $el = $(el),
			    $template = $(options.template.join(''));

			$el.off('keydown blur paste').parent().find('.charscounter-container').remove();
			$el.after($template);

			var $counter_container = $el.parent()
					.css('position', 'relative')
					.find('.charscounter-container')
					.css(options.css);

			if (options.limit_enable) {
				$counter_container
					.find('.charscounter-limiter-container')
					.css('display', 'inline')
					.find('.charscounter-limiter-limit')
					.text(options.limit_max);
			}

			$el.on('keydown blur paste', function(e) {
				if (options.limit_enable) {
					var txt = get_txt();

					if (txt.length == options.limit_max) {
						if(e.which != 8  && e.which != 9 && e.which != 35 && e.which != 36 && e.which != 37 && e.which != 38 && e.which != 39 && e.which != 40 && e.which != 46){
							e.preventDefault();
						}
					}

					if (txt.length > options.limit_max) {
						if (el.nodeName == 'INPUT' || el.nodeName == 'TEXTAREA') {
							$el.val(txt.substring(0, options.limit_max - 1));
						} else {
							$el.text(txt.substring(0, options.limit_max - 1));
						}
					}
				}
			});

			$el.on('keydown keyup blur paste change', function() {
				set_count_value();
			});

			function set_count_value() {
				var txt = get_txt();

				$counter_container.find('.charscounter-counter').text(txt.length);
			}

			function get_txt() {
				return (el.nodeName == 'INPUT' || el.nodeName == 'TEXTAREA') ? $el.val() : $el.text();
			}

			set_count_value();
		});
	};
})(jQuery);
