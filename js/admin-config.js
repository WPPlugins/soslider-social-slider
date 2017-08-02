jQuery(document).ready(function() {
    jQuery('.so-color-picker').each(function() {
        jQuery(this).wpColorPicker({
            defaultColor: jQuery(this).val(),
            change: function(event, ui){
                var selectedColor = ui.color.toString();
                jQuery(this).val(selectedColor);
            }
        });
    });
});