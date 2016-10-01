// Pre-select elements
var map = $("#map"),
    canvas = map.find(".map-canvas");

// Calculate canvas constraints
var maxLeft = map.width()-canvas.width(),
    maxTop = map.height()-canvas.height();

var isDown = false;
var oX, oY;

// Make canvas draggable
/*canvas.draggable({
    drag: function(e, ui) {
        // Check if canvas is within constraints
        if (ui.position.left > 0) {
            ui.position.left = 0;
        } else if (ui.position.left < maxLeft) {
            ui.position.left = maxLeft;
        }
        if (ui.position.top > 0) {
            ui.position.top = 0;
        } else if (ui.position.top < maxTop) {
            ui.position.top = maxTop;
        }
		
    }
});*/

canvas
	.bind({
		mousedown: function(e){
			if($('input[name="tool_selected"]:checked').attr("id") == "option3"){
				$("#tool")
					.addClass("nade_selection")
					.appendTo(canvas)
					.offset(function(){
						return {left: e.pageX, top: e.pageY};
					});
				oX = e.pageX; 
				oY = e.pageY;
				isDown = true;
			}
			
		},
		mouseup: function(e){
			$(".nade_selection")
					.css("width", "0px")
					.css("height", "0px");
			$("#tool").removeClass("nade_selection");
			isDown = false;
			
			$('input[name = "nade_xMax"]').val(12);
			
		},
		mousemove: function(e){
			if(isDown){
				var osX = (e.pageX - oX).toString(), osY = (e.pageY - oY).toString();
				$(".nade_selection")
					.css("width", osX + "px")
					.css("height", osY + "px");
				console.log(osX);
			}
			
			//var osX = (e.pageX - oX).toString(), osY = (e.pageY - oY).toString()
			//$("nade_selection")
			//	.css("width", "100px")
			//	.css("height", osY + "px");
			//console.log(e.pageX);
			//console.log(osY);		
		}
	});
	//.mousedown




$("#mapselect").on("change", function(){
	$(".map-canvas")
		.css("background", "url(images/map_overview" + $("#mapselect").val() + ") no-repeat")
		.css("background-size", "800px 800px");
	
});

$('button.btn.btn-default.dropdown-toggle').on('click', function (event) {
    $(this).parent().toggleClass('open');
	
});

$('body').on('click', function (e) {
    if (!$('button.btn.btn-default.dropdown-toggle').is(e.target) 
        && $('button.btn.btn-default.dropdown-toggle').has(e.target).length === 0 
        && $('.open').has(e.target).length === 0
    ) {
        $('button.btn.btn-default.dropdown-toggle').parent().removeClass('open');
    }
	
});



/*// Create simple dot marker
$("<div></div>")
    .addClass("map-marker")
    .appendTo(canvas)
    .offset(function(){
        return { left: 150, top: 150 };
    })
    // Append a label
    .append("<span><- Dot</span>");

// Create draggable Google Maps pin marker
var pin =
$("<div></div>")
    .addClass("google-pin")
    .appendTo(canvas)
    .offset(function(){
        return { left: 100, top: 100 };
    })
    // Bind mouseup/down for visual confirmation of grab
    .bind({
        mousedown: function(){
            var os = pin.offset();
            pin.offset(function(){
                return { top: os.top-3 };
            });
        },
        mouseup: function(){
            var os = pin.offset();
            pin.offset(function(){
                return { top: os.top+3 };
            });
        }
    })
    // Make it draggable
    .draggable({
        start: function(e,ui){
            ui.helper.offset(function(){
                return { top: ui.offset.top-2 };
            });
        },
        container: canvas
    });*/

