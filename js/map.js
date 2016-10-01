// Pre-select elements
var map = $("#map"),
    canvas = map.find(".map-canvas");

// Calculate canvas constraints
var maxLeft = map.width()-canvas.width(),
    maxTop = map.height()-canvas.height();

// For canvas mouse functions
var isDown = false;
var oX, oY;


// Canvas tools and mouse functions
canvas
	.bind({
		mousedown: function(e){
			removeTool();
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
			}else if($('input[name="tool_selected"]:checked').attr("id") == "option2"){
				$("#tool")
					.addClass("smoke-effect")
					.appendTo(canvas)
					.offset(function(){
						return {left: e.pageX - 43, top: e.pageY - 30};
					});
				$(".smoke-effect")
					.css("width","80px")
					.css("height", "60px");
			}
		},
		mouseup: function(e){
			
			isDown = false;
			
			$('input[name = "nade_xMax"]').val(e.pageX);
			$('input[name = "nade_xMin"]').val(oX);
			$('input[name = "nade_yMax"]').val(e.pageY);
			$('input[name = "nade_yMin"]').val(oY);	
		},
		mousemove: function(e){
			if(isDown){
				var osX = (e.pageX - oX).toString(), osY = (e.pageY - oY).toString();
				var parentOffset = $(this).parent().offset();
				$(".nade_selection")
					.css("width", osX + "px")
					.css("height", osY + "px");
				console.log(e.pageX - parentOffset.left);
			}
		}
	});
	
//Remove nade_selection
function removeTool(){
	if($("#tool").hasClass("nade_selection")){
		$(".nade_selection")
			.css("width", "0px")
			.css("height", "0px");
		$("#tool").removeClass("nade_selection");
	}
	if($("#tool").hasClass("smoke-effect")){
		$("#tool").removeClass("smoke-effect");
	}		
}

	
//Change canvas background map
$("#mapselect").on("change", function(){
	$(".map-canvas")
		.css("background", "url(img/map_overview" + $("#mapselect").val() + ") no-repeat")
		.css("background-size", "800px 800px");
	
});


/*//Keep toolbox dropdown open on click within div and close on outside click
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
	
});*/


$("input:radio[name='tool_selected']").change(function (){
	if($(this).attr("id") == "option1"){
		console.log("clicked!");
		var val1 = $('input[name = "nade_xMax"]').val(), val2 = $('input[name = "nade_yMax"]').val();
		if(($("#tool").css("top")==null)||($("#tool").css("left")==null)){
			return;
		}else{
			if(window.XMLHttpRequest){
				xmlhttp = new XMLHttpRequest();
			}
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
					
				}
			}
			xmlhttp.open("GET", "php/nade_submit.php?p="+val1.toString()+"&q="+val2.toString());
			xmlhttp.send();
			console.log("request sent");
		}
	}
	
});