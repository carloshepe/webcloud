var app={

	refreshSortebleLayout : function(){
		$(".layoutSorteable").sortable( "refresh" );
	},

	// refreshElementSorteables : function(){
	// 	$(".elementSortable").sortable( "refresh" );
	// },

	createSortebleLayout: function(){
		$(".layoutSorteable").sortable({
			connectWith: ".layoutSorteable",
			cursorAt: { top: 50 },
			forceHelperSize: true,
			placeholder: "ui-state-highlight",
			appendTo: document.body,
			beforeStop: function( event, ui ) {
				console.debug("beforeStop");
				
				var helperClone=ui.helper.clone();
				helperClone.css("position","static");
				helperClone.css("height","");
				helperClone.css("width","");
                helperClone.find(".column header").css("display","inline-block");
                helperClone.find(".contentRow").first().show();
                
				ui.item.replaceWith(helperClone);
			},
			receive: function( event, ui ) {
				console.debug("receive");
				
			},
			over: function( event, ui ) {
				console.debug("over");
				
			},
			start: function( event, ui ){
				console.debug("start");
				ui.helper.css("height","");
				// if(ui.helper.height()>120){
					ui.helper.find(".contentRow").first().hide();
					if(ui.helper.hasClass("element")){
						$("section.contentRow.layoutSorteable.ui-sortable").first().sortable("disable");
						$("section.contentRow.layoutSorteable.ui-sortable").first().sortable("refresh");
					}
					
				// }
			},
			create: function( event, ui ){
							console.debug("create");
						},
			sort: function( event, ui ){
							console.debug("sort");
						},
			change: function( event, ui ){
							console.debug("change");
						},
			stop: function( event, ui ){

							console.debug("stop");
							app.createSortebleLayout();
							app.refreshSortebleLayout();
							$("section.contentRow.layoutSorteable.ui-sortable").first().sortable("enable");
						},
			update: function( event, ui ){

							console.debug("update");
						},
			remove: function( event, ui ){
							console.debug("remove");
						},
			out: function( event, ui ){
							console.debug("out");
						},
			activate: function( event, ui ){
							console.debug("activate");
						},
			deactivate: function( event, ui ){

				console.debug("deactivate");
			}




		});
	},

	// createElementSorteables: function(){
	// 	$(".elementSortable").sortable({
	// 		connectWith: ".elementSortable, .layoutSorteable",
	// 		forceHelperSize: true,
	// 		placeholder: "ui-state-highlight",
	// 		appendTo: document.body,
	// 		beforeStop: function( event, ui ) {
	// 			console.debug("beforeStop");
	// 			var helperClone=ui.helper.clone();
	// 			helperClone.css("position","static");
	// 			ui.item.replaceWith(helperClone);
	// 		},
	// 		receive: function( event, ui ) {
	// 			console.debug("receive");
	// 		},
	// 		over: function( event, ui ) {
	// 			console.debug("over");
			
	// 		},
	// 		start: function( event, ui ){
	// 			console.debug("start");
	// 			ui.helper.css("height","70px");
	// 			ui.helper.css("width","70px");
	// 		},
	// 		create: function( event, ui ){
	// 			console.debug("create");
	// 		},
	// 		sort: function( event, ui ){
	// 			console.debug("sort");
	// 		},
	// 		change: function( event, ui ){
	// 			console.debug("change");
	// 		},
	// 		stop: function( event, ui ){
	// 			console.debug("stop");
				
	// 			app.createElementSorteables();
	// 			app.refreshElementSorteables();
	// 		},
	// 		update: function( event, ui ){
	// 			console.debug("update");
	// 		},
	// 		remove: function( event, ui ){
	// 			console.debug("remove");
	// 		},
	// 		out: function( event, ui ){
	// 			console.debug("out");
	// 		},
	// 		activate: function( event, ui ){
	// 			console.debug("activate");
	// 		},
	// 		deactivate: function( event, ui ){
	// 			console.debug("deactivate");
	// 		}
	// 	});
	// }
}


function init(){
	app.createSortebleLayout();
	$( ".draggHelperImage" ).draggable({
		connectToSortable: ".layoutSorteable",
		helper: function( event ) {
			return "<div class='element'><img src='img/picture.png' width='70' height='70'></div>"
		},
		start: function( event, ui ) {
			$("body").css("overflow-x","hidden");
		},
		stop: function( event, ui ){
		}

	});
	
	$( ".elementsContainer .draggHelperLayout" ).draggable({
		appendTo: "body",
		cursor: "move",
		cursorAt: { top: 50, left: 0 },
		zIndex: 1,
		connectToSortable: ".layoutSorteable",
		helper: function( event ) {
			return rowtemplate($(this).prev());
		},
		start: function( event, ui ) {
			$("body").css("overflow-x","hidden");

		},
		stop: function( event, ui ){
			
		}
		
	});

	$( "#accordion" ).accordion({
        heightStyle: "fill"
    });
	
	$( "#mainColumn .contentRow" ).disableSelection();

	resize();
}





resize = function onResize() {
	windowHeight=$(window).height();
	heightToRest=0;
	$("[data-minus]").each(function(){
	heightToRest+=$(this).height();
	});
    $("#navContainers").css('height',(windowHeight-heightToRest)+'px');
    $( "#accordion" ).accordion( "refresh" );
    
}

$(window).load(init);
$(window).resize(resize);



function rowtemplate(inputColumns){
var marginLeftForColumns=2;
var valores=inputColumns.val();
var valoresArray=valores.split(" ");
var numColumns=valoresArray.length;
var marginLeftTotal=(numColumns-1)*marginLeftForColumns;
var widthColumn=(100-marginLeftTotal);
var initTemplate='<div><div class="row rowStyle" >';
    initTemplate+='<header>Fila</header>';
    initTemplate+='<section class="contentRow" style="overflow:hidden">';    
    for (var i = 0; i < numColumns; i++) {

    	var style='style="width:'+(valoresArray[i]*widthColumn/12)+'%;';
    	if (i==0) {
    		style+='margin-left:0px;"';
    	}else{
    		style+='margin-left:'+marginLeftForColumns+'%;"';
    	}
        initTemplate+='<div class="column layoutDropable" '+style+'>';
        initTemplate+='<header style="display:none;">Columna</header>';
        initTemplate+='<section class="contentRow layoutSorteable elementSortable">';
        initTemplate+='</section>';
        initTemplate+='</div>';
        };    
initTemplate+='</section>';
initTemplate+='</div></div>';
return initTemplate;
}

function validatecolumns(inputColumn){
var inputColumnValue=inputColumn.value;
inputColumnValue=$.trim(inputColumnValue);
var values=inputColumnValue.split(" ");
var sum=0;
for(i=0;i<values.length;i++){
	var val=parseInt(values[i]);
	if(!isNaN(val)){
		sum=sum+val;
	}
}
if (sum==12) {
	$(inputColumn).next().show();
	inputColumn.value=inputColumnValue;
}else{
	$(inputColumn).next().hide();
}
}