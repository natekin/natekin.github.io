
		$(document).ready(function() {

			var all_dates = [];
			var date_filter = "";
			var all_time_orders = [];
			var time_orders = "";
			var all_places = [];
			var places_filter = "";
			
			var all_sections = [];
			var sections_filter = "";

			var all_types = [];
			var types_filter = "";
			var all_levels = [];
			var levels_filter = "";

			
			Array.prototype.unique = function() {
			  return this.filter(function (value, index, self) { 
			    return self.indexOf(value) === index;
			  });
			}

			function render_slot(num){
				if(num == "1") return "11:00 - 12:45";
				if(num == "2") return "13:00 - 14:30";
				if(num == "3") return "15:30 - 17:15";
				if(num == "4") return "17:30 - 19:00";
				if(num == "5") return "19:15 - 20:30";
				return "";
			}

			function dict_place(num){
				if(num == "1") return "Main stage";
				if(num == "2") return "Pain stage";
				if(num == "3") return "Black stage";
				if(num == "4") return "Space stage";
				if(num == "5") return "Cube stage";
				if(num == "6") return "Community lab";
				if(num == "7") return "Community roof";
				return "";
			}

			function render_time(row){
				var main_date = '<h5 class="content_speaker">' +  row.main.date + ' мая</h5>';
				var main_order = '<div style="display:none">' + row.main.place + "_" + row.main.order + "_" + row.main.time_start + '</div>';
				var main_time = '<h6 style="margin-top: -5px; margin-bottom:20px;">' +  row.main.time_start + ' - ' + row.main.time_end  + '</h6>';
				var main_place = 'Зал:<br><h6 style="margin-top: 0px;">' + dict_place(row.main.place) + '</h6>';

				return main_date + main_order + main_time + main_place;				
				//all_fests.push(row.event.name);		        
			}

			//super simple - just round photo
			//TODO: section render with underline
			function render_speaker(row){
				var speaker = '<h5 class="content_speaker text-center">' +  row.content.speaker + '</h5>';
				if(row.render.order == "x"){
					speaker = '';
				}

				var img = '<div class="text-center"><img src="../static/img/speakers/' + row.render.img + '" style="width: 70px; height: 70px; border-radius: 100%;"></div>'

				return '<div class="hidden-xs" style="margin-left: -25px;">' + speaker + img + "</div>";	;

		        //return '<div class="hidden-xs" style="margin-left: -25px;">' + speaker + img + "</div>";	
			}

			// as usual, without tags
			function render_content(row){
				var content_title = '<h4 class="content_title">' + row.content.title + '</h4>';
				//var section = '<h5 class="content_speaker">' + '<span class="hidden-lg hidden-md hidden-sm">' + row.content.speaker + '<br></span> Секция ' +  row.main.section + '</h5>';
				var section = '<h5 class="content_speaker">' + '<span class="">' + row.content.speaker + ',</span> секция ' +  row.main.section + '</h5>';
				if(row.render.order == "x"){
					section = '<h5 class="content_speaker">' + row.content.speaker + '</h5>';
				}

		        var content_more = '';
		        if(!(row.content.description === "")){
		        	var desc_container = '<div class="video_description_container"><div class="video_description">' + row.content.description + '</div></div>';
		        	var desc_toggles = '<div class="video_extend_expand_container">' + 
		        		'<h6 class="video_description_expand">развернуть</h6>' + 
		        		'<h6 class="video_description_shrink" style="display: none;">свернуть</h6>' + 
		        		'</div>';
		        	content_more = desc_container + desc_toggles;
		        }
		        return content_title + section + content_more;
			}
			
			//build the table
			var table_schedule = $('#dt-schedule').DataTable( {
				//"ajax": "static/data/videos.txt",
				"ajax": "../static/data/speakers.txt?v=0.0.4",
				"autoWidth": false,
				"deferRender": true,
				"responsive": true,
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Все"]],				
				"language": {
		            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
		        },
		        "columns": [
		            { "data": "main.date" },
		            { "data": "main.time_start" },
		            { "data": "main.time_end" },
		            { "data": "main.section" },	
		            { "data": "main.order" },
		            { "data": "main.type" },
		            { "data": "main.place" },
		            { "data": "main.level" },
		            { "data": "render.order" },
		            { "data": "render.img" },
		            { "data": "render.lang" },
		            { "data": "content.title" },
		            { "data": "content.speaker" },
		            { "data": "content.description" }
		        ],
		        "order": [[1,"asc"]],
		        "columnDefs": [
		            {
		            	"render": function ( data, type, row ) { return render_time(row) },
		            	"width": "15%", 
		            	"targets": 1
		            },
		            {
		            	"render": function ( data, type, row ) { return render_speaker(row) },
		            	"width": "15%", 
		            	"className": 'hidden-xs',
		            	"targets": 8
		            },
		            {
		               	"render": function ( data, type, row ) { return render_content(row) },
		               	"width": "90%", 
		                "targets": 11
		            },
		            { 
		            	"visible": false,  
		            	"targets": [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13 ] 
		            },
		            {
		                targets: [ 1, 8, 11 ],
		                className: 'dt-body-left mdl-data-table__cell--non-numeric'
		            },
		            {
				        targets: 8,
				        className: 'hidden-xs'
				    }
		        ],
		        "initComplete": function( settings, json){
		        	all_dates = ["10", "11"];
		        	$.each(all_dates, function( index, value ){ all_dates[index] = '<span class="badge badge-pill dates_filter text-center" style="font-size:14px; font-weight: 500;" id="' + value + 'may">' + value + '</span>'; });
		        	$("#date_place").html(all_dates);

		        	all_time_orders = ["1", "2", "3", "4", "5"];
		        	$.each(all_time_orders, function( index, value ){ all_time_orders[index] = '<span class="badge badge-pill time_filter text-center" style="font-size:14px; font-weight: 500;" id="' + value + '">' + render_slot(value) + '</span>'; });
		        	$("#time_place").html(all_time_orders);

		        	all_places = ["1", "2", "3", "4", "5", "6", "7"];
		        	$.each(all_places, function( index, value ){ all_places[index] = '<span class="badge badge-pill place_filter text-center"  style="font-size:14px; font-weight: 500;" id="' + value + '">' + dict_place(value) + '</span>'; });
		        	$("#place_place").html(all_places);

		        	table_schedule.columns( 0 ).search("10").draw();
		        }

		    } );

			//now within one big container, seems to work fine
			$("#container_video_magic").delegate(".video_description_expand", "click", function() {
				$( this ).parent().prev().find(".video_description").toggleClass( "open_description", 300 );
				$( this ).next().toggle();
				$( this ).toggle();
			});
		    $("#container_video_magic").delegate(".video_description_shrink", "click", function() {
				$( this ).parent().prev().find(".video_description").toggleClass( "open_description", 300 );
				$( this ).prev().toggle();
				$( this ).toggle();
			});

			
		    //another exclusive filter, a little hard to wrap a function around it
			$("#date_place").delegate(".dates_filter", "click", function() {
				var current_tag = $(this).attr('id').substr(0,2).toString();		
				var is_active = $(this).hasClass("active-badge");
				$("#date_place").find(".active-badge").removeClass("active-badge");

				if(date_filter.length != 0){
					if(date_filter == current_tag){
						date_filter = "";
					}else{
						$( this).addClass("active-badge");
						date_filter = current_tag;	
					}					
				}else{
					date_filter = current_tag;	
					$( this).addClass("active-badge");
				}
				
				console.log(date_filter == "0")
				table_schedule.columns( 0 ).search( date_filter, true, false ).draw();

				//table_schedule.columns( 0 ).search( date_filter ).draw();
				//table_schedule.columns( 0 ).search( date_filter ).draw();			
			});

			//another exclusive filter, a little hard to wrap a function around it
			$("#time_place").delegate(".time_filter", "click", function() {
				var current_tag = $(this).attr('id');				
				var is_active = $(this).hasClass("active-badge");
				$("#time_place").find(".active-badge").removeClass("active-badge");

				if(time_orders.length != 0){
					if(time_orders == current_tag){
						time_orders = "";
					}else{
						$( this).addClass("active-badge");
						time_orders = current_tag;	
					}					
				}else{
					time_orders = current_tag;	
					$( this).addClass("active-badge");
				}
				table_schedule.columns( 4 ).search( time_orders ).draw();			
			});

			$("#place_place").delegate(".place_filter", "click", function() {
				var current_tag = $(this).attr('id');	
				//console.log(current_tag);
				var is_active = $(this).hasClass("active-badge");
				$("#place_place").find(".active-badge").removeClass("active-badge");

				if(places_filter.length != 0){
					if(places_filter == current_tag){
						places_filter = "";
					}else{
						$( this).addClass("active-badge");
						places_filter = current_tag;	
					}					
				}else{
					places_filter = current_tag;	
					$( this).addClass("active-badge");
				}
				table_schedule.columns( 6 ).search( places_filter ).draw();			
			});

		} );