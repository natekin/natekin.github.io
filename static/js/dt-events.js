
		$(document).ready(function() {

			// V add proper sorting to length
			// V add expanding description (fixed height + more button)
			// V		add searchability for description
			// V 		add proper vido-links in condensed mode (simple)
			// ?		add total video hours
			//
			// add tag generator on top
			// add auto-tag turning on and off 
			//			from top menu
			//			also highlighting  
			// add flag-buttons on top for ordering
			// add event-type filter options
			// add global clear filtering option
			//
			// total filters: 
			//			search
			//			tags (on/off)
			//			language
			//			event


			//basis for all tag-wise searches			
			var all_langs = [];
			var lang_filter = "";
			var all_fests = [];
			var fest_filter = "";			
			var all_video_tags = [];
			var tag_filter = [];
			var tag_filter_query = "";

			Array.prototype.unique = function() {
			  return this.filter(function (value, index, self) { 
			    return self.indexOf(value) === index;
			  });
			}

			function render_shadow_order(str, num, dec){
				var num_length = num.toString().length;
				var num_string = "0".repeat(dec - num_length) + num;
				return "<span style='display:none;'>" + str + num_string + "</span>";
			}

			function render_video_lang(lang){
				var video_lang = '';
				if(lang.toLowerCase() === "ru"){
					video_lang = '<div class="em_ru_dt"></div>';
				}
				if(lang.toLowerCase() === "en"){
					video_lang = '<div class="em_gb_dt"></div>';
				}
				if(lang.toLowerCase() === "ua"){
					video_lang = '<div class="em_ua_dt"></div>';
				}				
				return video_lang;
			}

			function render_video_header(row){				
				var video_header = '<div class="video_header_container">';
				var video_date = '<div class="event_date">' + row.event.date + '</div>';
				var video_lang = '<div class="video_lang"><span class="nav-icon" id="' + row.video.lang.toLowerCase() + '">' + render_video_lang(row.video.lang) + '</span></div>';
				all_langs.push(row.video.lang.toLowerCase());
			  	return video_header + video_date + video_lang + '</div>';
			}

			function render_video_footer(row){				
				var video_footer = '<div class="video_footer_container">';
				var video_length = '<div class="video_length">' + row.video.length + '</div>';				
			  	return video_footer  + video_length + '</div>'; // +event_name
			}

			function render_video_small(row){
				var hidden = '<div class="hidden-lg hidden-md hidden-sm">';
				var event_date = '<h4 class="event_date_small">' + row.event.date + '</h4><br>';
				var youtube_button = '<a target="_blank" href="' + row.video.link + '"><div class="video_host"><i class="fab fa-youtube video_host_youtube"></i></div></a>';
				var video_lang = '<br><div class="event_details_small"><span class="nav-icon">' + render_video_lang(row.video.lang) + '</span>';
				var video_length = row.video.length + '</div>';
				var event_name = '<h4><a target="_blank" href="' + row.event.link + '">' + row.event.name + '</a></h4>';

				return hidden + event_date + youtube_button + video_lang + video_length + '</div>';
			}

			function render_video(row){
				var shadow_sort = render_shadow_order(row.event.date + "-" + row.event.name + "-", row.video.order, 3);
				var video_container = '<a target="_blank" href="' + row.video.link + '"><div class="video_container_main" style="background-image: url(../static/data/vid_img/' + row.video.img + ');">';
				//var video_container = '<a target="_blank" href="' + row.video.link + '"><div class="video_container_main" style="background-image: url(static/data/vid_img/' + row.video.img + ');">';				
		        var video_header = render_video_header(row);
		        var video_footer = render_video_footer(row);
		        var video_event = '<a target="_blank" href="' + row.event.link + '"><h4 class="event_name">' + row.event.name + '</h4></a>';
		        var video_small = render_video_small(row);
		        all_fests.push(row.event.name);
		        return shadow_sort + video_container + video_header + video_footer + '</div></a>' + video_event + video_small;	
			}

			function render_tags(tags){
				var tag_string = ' ';
				$.each( tags, function( key, val ) {
			  		var that_tag = '<span class="badge badge-pill">' + val + '</span>';		  		
			  		tag_string = tag_string + that_tag;
			  		all_video_tags.push(val);
			  	});
				return tag_string;
			}

			function render_content(row){
				var content_title = '<h4 class="content_title">' + row.content.title + '</h4>';
		        var content_speaker = '<h5 class="content_speaker">' +  row.content.speaker + '</h5>';
		        var content_tags = '<div class="content_tags">' + render_tags(row.tags) + '</div>'; //separate function for tags here
		        var content_more = '';
		        if(!(row.content.description === "")){
		        	var desc_container = '<div class="video_description_container"><div class="video_description">' + row.content.description + '</div></div>';
		        	var desc_toggles = '<div class="video_extend_expand_container">' + 
		        		'<h6 class="video_description_expand">развернуть</h6>' + 
		        		'<h6 class="video_description_shrink" style="display: none;">свернуть</h6>' + 
		        		'</div>';
		        	content_more = desc_container + desc_toggles;
		        }
		        return content_title + content_speaker + content_more + content_tags;
			}
			
			//build the table
			var table_events = $('#dt-events').DataTable( {
				//"ajax": "static/data/videos.txt",
				"ajax": "../static/data/videos.txt",
				"autoWidth": false,
				"deferRender": true,
				"responsive": true,
				"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Все"]],				
				"language": {
		            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
		        },
		        "columns": [
		            { "data": "event.date" },
		            { "data": "event.name" },
		            { "data": "event.link" },	
		            { "data": "video.order" },
		            { "data": "video.length" },
		            { "data": "video.img" },
		            { "data": "video.link" },
		            { "data": "video.lang" },
		            { "data": "content.title" },
		            { "data": "content.speaker" },
		            { "data": "content.description" },		            
		            { "data": "tags" }
		        ],
		        "order": [[0,"desc"],[1,"asc"],[3,"desc"]],
		        "columnDefs": [
		            {
		            	"render": function ( data, type, row ) { return render_video(row) },
		            	"targets": 0
		            },
		            {
		               	"render": function ( data, type, row ) { return render_content(row) },
		                "targets": 3
		            },
		            { 
		            	"visible": false,  
		            	"targets": [ 1, 2, 4, 5, 6, 7, 8, 9, 10, 11 ] 
		            },
		            { 
		            	"width": "10%", 
		            	"targets": 0 
		            },
		            { 
		            	"width": "90%", 
		            	"targets": 3 
		            },
		            {
		                targets: [ 0, 3 ],
		                className: 'mdl-data-table__cell--non-numeric'
		            },
		            {
				        targets: -1,
				        className: 'dt-body-left'
				    }
		        ],
		        "initComplete": function( settings, json){
		        	//collect all tags from videos and place them 
		        	all_video_tags = all_video_tags.unique().sort();
					all_langs = all_langs.unique().sort();
					all_fests = all_fests.unique().sort().reverse();
					tag_filter = Array(all_video_tags.length).fill(0);
					//console.log(tag_filter)

					var white_list = ["failconf", "puzzle", "big data", "computer vision", "deep learning", "ds tools", "ml competition", "ml models", "nlp", "overview", "sysml"];
					var white_video_tags = [];//Array(white_list.length).fill("")
					var new_video_tags = [];//Array(all_video_tags.length - white_list.length).fill("");

					//pass all colected tags into 
					$.each(all_video_tags, function( index, value ){
						var tag_content = '<span class="badge badge-pill events_tag_filter" id="' + "ef" + index + '">' + value + '</span>';

						if(white_list.includes(value)){
							white_video_tags.push(tag_content)
						}else{
							new_video_tags.push(tag_content)
						}
						//new_video_tags[index] = '<span class="badge badge-pill events_tag_filter" id="' + "ef" + index + '">' + value + '</span>';
					});

					$.each(all_langs, function( index, value ){
						all_langs[index] = '<span class="badge badge-pill events_filter_lang text-center" id="' + value + '">' + render_video_lang(value) + '</span>';
					});

					$.each(all_fests, function( index, value ){
						all_fests[index] = '<span class="badge badge-pill events_filter_fest">' + value + '</span>';
					});
			
					$("#tag_place").html(new_video_tags);
					$("#tag_place_white").html(white_video_tags);
					
					$("#lang_place").html(all_langs);
					$("#fest_place").html(all_fests);

					//console.log(all_fests);
		        },
		        "colReorder": {
		        	enable: false,
		          	order: [0, 3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11]
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

			

		    /* here be searches on hidden columns */
		    //	our extra functionality for specified seearches:
		    //		lang, fest, tags

		    //make simple exclusive filter for fests (events in general)
			$("#fest_place").delegate(".events_filter_fest", "click", function() {
				//what is the current tag and situation
				var current_tag = $(this).text();
				var is_active = $(this).hasClass("active-badge");

				//now let's see what the filter should be
				var any_filter = fest_filter.length != 0;
				
				//toggle previous classes
				$("#fest_place").find(".active-badge").removeClass("active-badge");

				//several possible situations for our exclusive filter
				//	-empty filter, we just added one: now new filter is this one
				//	-non-empty filter, not this one: drop previous filter, now this one is the content
				//	-non-empty filter, this one: new filter is blank
				if(any_filter){
					if(fest_filter == current_tag){
						//we want to forget current tag
						fest_filter = "";
					}else{
						//we want to make our tag the current choice
						$( this).addClass("active-badge");
						fest_filter = current_tag;	
					}					
				}else{
					//we have our new filter
					fest_filter = current_tag;	
					$( this).addClass("active-badge");
				}

				//and search column specifically
				//	note that this is after colreorder
				table_events.columns( 2 ).search( fest_filter ).draw();
			});


		    //similar exclusive filter but with specific rendering (hide real lang in ids, hopefully noone manages to make ru/en/ua ids on page)
			$("#lang_place").delegate(".events_filter_lang", "click", function() {
				var current_tag = $(this).attr('id');				
				var is_active = $(this).hasClass("active-badge");
				var any_filter = lang_filter.length != 0;

				$("#lang_place").find(".active-badge").removeClass("active-badge");

				if(any_filter){
					if(lang_filter == current_tag){
						lang_filter = "";
					}else{
						$( this).addClass("active-badge");
						lang_filter = current_tag;	
					}					
				}else{
					lang_filter = current_tag;	
					$( this).addClass("active-badge");
				}
				table_events.columns( 7 ).search( lang_filter ).draw();			
			});

			function construct_or_filter(filter, tags){
				var tag_string = '';

				$.each( filter, function( key, val ) {
					//console.log(key + " " + val + " | ")
					if(val == 1){
						if(tag_string == ''){
							tag_string = tags[key];	
						}else{
							tag_string = tag_string + "|" + tags[key];	
						}
					}
			  	});
				return tag_string;
			}

			//tags are way more complicated
			$(".tag_storage").delegate(".events_tag_filter", "click", function() {
				//tag_filter all_video_tags
				var this_tag = $(this).attr('id').slice(2);	
				if(tag_filter[this_tag] == 0)			{
					tag_filter[this_tag] = 1;
				}else{
					tag_filter[this_tag] = 0;
				}

				tag_filter_query = construct_or_filter(tag_filter, all_video_tags);
				//console.log(tag_filter_query);
				$( this).toggleClass("active-badge");		
				table_events.columns( 11 ).search( tag_filter_query, true, false ).draw();		
			});




		    







		} );