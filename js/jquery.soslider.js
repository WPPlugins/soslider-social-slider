;(function($) {

    // Plugin definition.
    $.fn.soslider = function(options) {
        var defaults = {
            onImageClick: $.noop,
            onInit: $.noop,
            dock: false,
            expanded: false,
            middle: false,
            debug: false,
            height: "0",
            width: "0",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            format_class: "soslider_class",
            orientation: "right", /* left, bottom, top */
            zindex: "1000",
            image_url: "",
            image_height: "32",
            image_width: "32",
            image_margin: 0, /* when image overlaps main container */
            image_position: 0,
            image_position_relative: "fixed",
            image_extra_margin: 0,
            slide_speed: 500,
            border_color: "#3B5998",
            border_width: 1,
            border_radius: "",
            background_color: "#FFFFFF",
            load_method: "page_load" /* slide or page_load */,
            run_event: "mouseover",
            overflow: "hidden",
            off: 0,
            gpcheck: false,
        };

        var opts = $.extend({}, defaults, options);

        //! set options
        if (opts.debug) {
            debug(this, "Plugin initiate: orientation " + opts.orientation + ", middle = " + opts.middle + ", top = " + opts.top + ", left = " + opts.left
                    + ",border_width = " + opts.border_width + ", border_color = " + opts.border_color);
            debug(this, "PI: image_height = " + opts.image_height + ", image_width = " + opts.image_width + ", image_margin = " + opts.image_margin + ", image_url = " + opts.image_url);
        }
        $(this).css("width", opts.width + "px");
        $(this).css("height", opts.height + "px");
        $(this).css("z-index", opts.zindex);
        $(this).addClass(opts.format_class);
        $(this).addClass('soslider_inner');
        $(this).css("background", "none repeat scroll 0px 0px " + opts.border_color);
        if (opts.border_radius != '') {
            $(this).css('border-radius', opts.border_radius);
        }

        $(this).show();

        var $wrapper = $("<div />");
        var $image;
        var image_size = 0;
        var padding_style = "";
        if (opts.orientation == 'left' || opts.orientation == 'right') {
            image_size = -opts.image_width;
        } else {
            image_size = -opts.image_height;
        }
        // image position
        var im_pos = 0;
        if (opts.image_position_relative == 'middle') {
            if (opts.orientation == 'left' || opts.orientation == 'right') {
                im_pos = opts.height / 2 - opts.image_height / 2;
            } else {
                im_pos = opts.width / 2 - opts.image_width / 2;
            }
        } else if (opts.image_position_relative == 'top') {
            im_pos = 0;
        } else if (opts.image_position_relative == 'bottom') {
            if (opts.orientation == 'left' || opts.orientation == 'right') {
                im_pos = opts.height - opts.image_height + parseInt(opts.border_width) * 2;
            } else {
                im_pos = opts.width - opts.image_width;
            }
        }
        else {
            im_pos = opts.image_position;
        }

        if (opts.image_extra_margin != 0) {
            im_pos += opts.image_extra_margin;
        }

        switch (opts.orientation) {
            case "right":
                padding_style = opts.border_width + "px 0px " + opts.border_width + "px " + opts.border_width + "px";
                $(this).css("padding", padding_style);
                if (opts.middle) {
                    var pos = $(window).height() / 2 - opts.height / 2;
                    $(this).css("top", pos + "px");
                } else {
                    $(this).css("top", opts.top + "px");
                }
                var r_value = -opts.width - opts.image_margin - opts.border_width;
                if (opts.debug) {
                    debug(this, opts.top + " right r_value " + r_value);
                }
                $(this).css("right", r_value + "px");
                $image = $("<image src=\"" + opts.image_url + "\" style=\"display: block;position: absolute;left: " + image_size + "px;top: " + im_pos + "px; cursor: pointer;\"/>");
                break;
            case "left":
                padding_style = opts.border_width + "px " + opts.border_width + "px " + opts.border_width + "px 0px";
                $(this).css("padding", padding_style);
                if (opts.middle) {
                    var pos = $(window).height() / 2 - opts.height / 2;
                    $(this).css("top", pos + "px");
                } else {
                    $(this).css("top", opts.top + "px");
                }
                var r_value = -opts.width - opts.image_margin - opts.border_width;
                if (opts.debug) {
                    debug(this, opts.top + " left r_value " + r_value);
                }
                $(this).css("left", r_value + "px");
                $image = $("<image src=\"" + opts.image_url + "\" style=\"display: block;position: absolute;right: " + image_size + "px;top: " + im_pos + "px; cursor: pointer;\"/>");
                break;
            case "bottom":
                padding_style = opts.border_width + "px " + opts.border_width + "px 0px " + opts.border_width + "px";
                $(this).css("padding", padding_style);
                if (opts.middle) {
                    var pos = $(window).width() / 2 - opts.width / 2;
                    $(this).css("left", pos + "px");
                } else {
                    $(this).css("left", opts.left + "px");
                }
                var r_value = -opts.height - opts.image_margin;
                -opts.border_width;
                $(this).css("bottom", r_value + "px");
                $image = $("<image src=\"" + opts.image_url + "\" style=\"display: block;position: absolute;top: " + image_size + "px;left: " + im_pos + "px; cursor: pointer;\"/>");
                break;
            case "top":
                padding_style = "0px " + opts.border_width + "px " + opts.border_width + "px " + opts.border_width + "px";
                $(this).css("padding", padding_style);
                if (opts.middle) {
                    var pos = $(window).width() / 2 - opts.width / 2;
                    $(this).css("left", pos + "px");
                } else {
                    $(this).css("left", opts.left + "px");
                }
                var r_value = -opts.height - opts.image_margin - opts.border_width;
                $(this).css("top", r_value + "px");
                $image = $("<image src=\"" + opts.image_url + "\" style=\"display: block;position: absolute;bottom: " + image_size + "px;left: " + im_pos + "px; cursor: pointer;\"/>");
                break;
        }

        $image.appendTo($wrapper)
        $wrapper.appendTo($(this));
        if (opts.orientation == 'left') {
            opts.off = $(this).css('left');
        }
        if (opts.orientation == 'right') {
            opts.off = $(this).css('right');
        }
        var $content = $("<div id='" + $(this).attr('id') + "_inner' />");
        if (opts.orientation == "left" || opts.orientation == "right")
            $content.css("width", (opts.width - opts.border_width) + "px");
        else
            $content.css("width", (opts.width - opts.border_width * 2) + "px");

        if (opts.orientation == "top" || opts.orientation == "bottom")
            $content.css("height", (opts.height - opts.border_width) + "px");
        else
            $content.css("height", (opts.height - opts.border_width * 2) + "px");

        $content.addClass('soslider_inner');
        $content.css("padding", padding_style);
        $content.css("background", "none repeat scroll 0px 0px " + opts.background_color);
        if (opts.border_radius != '') {
            $content.css('border-radius', opts.border_radius);
        }
        $content.css('overflow', opts.overflow);
        $content.appendTo($(this));


        //! Events
        var eventHandlers = {
            mouseenter: function(obje) {
                if (opts.debug) {
                    debug(obje, "mouseenter ");
                }
                opts.slide_speed = parseInt(opts.slide_speed);
                changeZIndex(obje, opts, 1);
                switch (opts.orientation) {
                    case "right":
                        $(obje).stop().animate({right: "0px"}, opts.slide_speed, "linear");
                        break;
                    case "left":
                        $(obje).stop().animate({left: "0px"}, opts.slide_speed, "linear");
                        break;
                    case "bottom":
                        $(obje).stop().animate({bottom: "0px"}, opts.slide_speed, "linear");
                        break;
                    case "top":
                        $(obje).stop().animate({top: "0px"}, opts.slide_speed, "linear");
                        break;
                }

            },
            click: function(obje) {
                if (!opts.expanded) {
                    eventHandlers.mouseenter(obje);
                    opts.expanded = !opts.expanded;
                } else {
                    eventHandlers.mouseleave(obje);
                    opts.expanded = !opts.expanded;
                }
            },
            mouseleave: function(obje, ev) {
                if (!opts.dock) {
                    if (opts.debug) {
                        debug(obje, "mouseleave ");
                    }
                    if (
                            opts.gpcheck &&
                            undefined !== ev &&
                            undefined !== ev.target.title &&
                            undefined !== ev.target.src &&
                            ev.target.src.indexOf("apis.google.com") > 0
                    ) {
                        return;
                    }
                    opts.slide_speed = parseInt(opts.slide_speed);
                    switch (opts.orientation) {
                        case "right":
                            var r_value = -opts.width - opts.image_margin - opts.border_width;
                            r_value = opts.off;
                            $(obje).stop().animate({right: r_value}, opts.slide_speed, "linear", function() {
                                changeZIndex(obje, opts, -1)
                            });
                            break;
                        case "left":
                            var r_value = -opts.width - opts.image_margin - opts.border_width;
                            r_value = opts.off;
                            $(obje).stop().animate({left: r_value}, opts.slide_speed, "linear", function() {
                                changeZIndex(obje, opts, -1)
                            });
                            break;
                        case "bottom":
                            var r_value = -opts.height - opts.image_margin - opts.border_width;
                            $(obje).stop().animate({bottom: r_value + "px"}, opts.slide_speed, "linear", function() {
                                changeZIndex(obje, opts, -1)
                            });
                            break;
                        case "top":
                            var r_value = -opts.height - opts.image_margin - opts.border_width;
                            $(obje).stop().animate({top: r_value + "px"}, opts.slide_speed, "linear", function() {
                                changeZIndex(obje, opts, -1)
                            });
                            break;
                    }
                }
            }
        }

        if (opts.OnInit) {
            if (opts.debug) {
                debug(this, "OnInit start ");
            }
            opts.OnInit.call(this);
        }

        return this.each(function() {
            if (opts.run_event == 'mouseover') {
                $(this).bind("mouseenter", function() {
                    eventHandlers.mouseenter(this);
                }).bind("mouseleave", function(e) {
                    eventHandlers.mouseleave(this, e);
                });
            } else {
                var o = this;
                $(this).find('div > img').bind("click", function() {
                    eventHandlers.click(o);
                });
            }
        });

    };

    // Private function for debugging.
    function debug(obj, info) {
        if (window.console && window.console.log) {
            window.console.log($(obj).attr('id') + ": " + info); //"soslider selection count: " + $obj.size() );
        }
    }
    ;

    function changeZIndex(obj, opts, value) {
        var z = $(obj).css('z-index');
        var new_v = parseInt(z, 10) + parseInt(value, 10);
        var x = parseInt(opts.zindex, 10) + 1;
        if (new_v <= x) {
            $(obj).css('z-index', new_v);
        }

        return false;
    }

})(jQuery);