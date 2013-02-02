/**
 * Form text box hints.
 * 
 * This plug-in will allow you to set a 'hint' on a text box or
 * textarea.  The hint will only display when there is no value
 * that the user has typed in, or that is default in the form.
 * 
 * You can define the hint value, either as an option passed to
 * the plug-in or by altering the default values.  You can also
 * set the hint class name in the same way.
 * 
 * Examples of use:
 * 
 *     $('form *').textboxhint();
 * 
 *     $('.date').textboxhint({
 *         hint: 'YYYY-MM-DD'
 *     });
 * 
 *     $.fn.textboxhint.defaults.hint = 'Enter some text';
 *     $('textarea').textboxhint({ classname: 'blurred' });
 *
 * @copyright Copyright (c) 2009, 
 *            Andrew Collington, andy@amnuts.com
 * @license New BSD License
 */
(function($) {
    $.fn.textboxhint = function(userOptions) {
        var options = $.extend({}, $.fn.textboxhint.defaults, userOptions);
		if ($(this).val() == options.hint)
			$(this).val(''); 
        return $(this).filter(':text,textarea').each(function(){
            if ($(this).val() == '') {
                $(this).focus(function(){
                    if ($(this).attr('typedValue') == '') {
                        $(this).removeClass(options.classname).val('');
                    }
                }).blur(function(){
                    $(this).attr('typedValue', $(this).val());
                    if ($(this).val() == '') {
                        $(this).addClass(options.classname).val(options.hint);
                    }
                }).blur();
            }
        });
    };
 
    $.fn.textboxhint.defaults = {
        hint: 'Please enter a value',
        classname: 'hint'
    };
})(jQuery);