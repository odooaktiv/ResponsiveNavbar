odoo.define('responsive_navbar.navbar', function (require) {
'use strict';

    $(document).ready(function() {

        function manage_menu(){
			var view_width = $(window).width();
			var menu_ul = $('#top_menu');
			var extra_menus = $("#extra_menu_ul");
			if(view_width > 767)
			{
				if(check_operation_required())
				{
					$('#extra_menu_btn').removeClass('hidden');
					while(check_operation_required())
					{
						var extracted_menu = $(menu_ul).find("#extra_menu_btn").prev().detach();
						extracted_menu.prependTo($("#extra_menu_ul"));
					}
				}
				else
				{
					if($(extra_menus).children('li').length)
					{
						$('#extra_menu_btn').addClass('hidden');
						var stop_operation = false;
						while(!stop_operation)
						{
							var extracted_menu = $("#extra_menu_ul").children("li:first-child").detach();
							extracted_menu.insertAfter($(menu_ul).find("#extra_menu_btn").prev());
							var updated_extra_menus = $("#extra_menu_ul li");
							if(!updated_extra_menus.length)
							{
								stop_operation = true;
							}
							if(check_operation_required())
							{
								stop_operation = true;
								while(check_operation_required())
								{
									$('#extra_menu_btn').removeClass('hidden');
									var extracted_menu = $(menu_ul).find("#extra_menu_btn").prev().detach();
									extracted_menu.prependTo($("#extra_menu_ul"));
								}
							}
						}
					}
					else
					{
						$('#extra_menu_btn').addClass('hidden');
					}
				}
			}
			else
			{
				if($(extra_menus).children('li').length)
				{
					
					var open_dropdowns = $("#top_menu").find(".dropdown.dropdown_open").find('.dropdown-toggle')
					$(open_dropdowns).each(function () {
						if($(this).parent(".dropdown").hasClass('dropdown_open'))
						{
							$(this).parent().children('.dropdown-menu').toggle()
							$(this).parent(".dropdown").removeClass('dropdown_open')
							$(this).parent(".dropdown").removeClass('open')
							$(this).attr('aria-expanded',false)
							$(this).parent(".dropdown").removeClass('drop-left')
							$(this).parent(".dropdown").removeClass('drop-right')
							$(this).parent(".dropdown").removeClass('drop-center')
						}
					});
					var extracted_menu = $(extra_menus).children('li').detach();
					extracted_menu.insertAfter($(menu_ul).find("#extra_menu_btn").prev());
					$('#extra_menu_btn').addClass('hidden');

				}
				else
				{
					$('#extra_menu_btn').addClass('hidden');
				}
			}

			function check_operation_required(){
				var li_height = $(menu_ul).children("li:first-child").outerHeight();
				var ul_height = $(menu_ul).height();
				var ul_calculated_height = $(menu_ul).outerHeight();
				var ul_parent_height = $(menu_ul).parent().height();
				if(ul_height > (1.5 * li_height) || ul_parent_height > (1.5 * ul_calculated_height))
				{
					return true;
				}
				else
				{
					return false;
				}
			}
        }


        function close_open_dropdowns(e){
        	var open_dropdowns = $("#top_menu").find(".dropdown.dropdown_open").find('.dropdown-toggle')
			$(open_dropdowns).each(function () {
				var current_dropdown = $(this).parent().children('.dropdown-menu').get(0)
				if($(e.target).hasClass('dropdown-toggle') || $(e.target).parent().hasClass('dropdown-toggle'))
				{
					if($(e.target).hasClass('dropdown-toggle'))
					{
						if(!current_dropdown.contains(e.target) && this !== e.target)
						{
							if($(this).parent(".dropdown").hasClass('dropdown_open'))
							{
								$(this).parent().children('.dropdown-menu').toggle()
								$(this).parent(".dropdown").removeClass('dropdown_open')
								$(this).parent(".dropdown").removeClass('open')
								$(this).attr('aria-expanded',false)
								$(this).parent().children('.dropdown-menu').removeClass('drop-left')
								$(this).parent().children('.dropdown-menu').removeClass('drop-right')
								$(this).parent().children('.dropdown-menu').removeClass('drop-center')
							}

						}
					}
					else if($(e.target).parent().hasClass('dropdown-toggle'))
					{
						if(!current_dropdown.contains($(e.target).parent()[0]) && this !== $(e.target).parent()[0])
						{
							if($(this).parent().parent(".dropdown").hasClass('dropdown_open'))
							{
								$(this).parent().parent().children('.dropdown-menu').toggle()
								$(this).parent().parent(".dropdown").removeClass('dropdown_open')
								$(this).parent().parent(".dropdown").removeClass('open')
								$(this).parent().attr('aria-expanded',false)
								$(this).parent().parent().children('.dropdown-menu').removeClass('drop-left')
								$(this).parent().parent().children('.dropdown-menu').removeClass('drop-right')
								$(this).parent().parent().children('.dropdown-menu').removeClass('drop-center')
							}

						}
					}
				}
				else
				{
					if($(this).parent(".dropdown").hasClass('dropdown_open'))
					{
						$(this).parent().children('.dropdown-menu').toggle()
						$(this).parent(".dropdown").removeClass('dropdown_open')
						$(this).parent(".dropdown").removeClass('open')
						$(this).attr('aria-expanded',false)
						$(this).parent().children('.dropdown-menu').removeClass('drop-left')
						$(this).parent().children('.dropdown-menu').removeClass('drop-right')
						$(this).parent().children('.dropdown-menu').removeClass('drop-center')
					}
				}
			});
        }


		$("#top_menu").on('click','.dropdown-toggle, .dropdown-toggle span', function (e) {
			var element = $(this)
			if(!$(e.target).hasClass('dropdown-toggle'))
			{
				element = $(this).parent() 
			}

			close_open_dropdowns(e);
        	$(element).parent().children('.dropdown-menu').toggle();
        	if($(element).parent().children('.dropdown-menu').css('display') == 'none')
        	{
        		$(element).parent(".dropdown").removeClass('dropdown_open')
        		$(element).parent(".dropdown").removeClass('open')
        		$(element).attr('aria-expanded',false)
        		$(element).parent().children('.dropdown-menu').removeClass('drop-left')
				$(element).parent().children('.dropdown-menu').removeClass('drop-right')
				$(element).parent().children('.dropdown-menu').removeClass('drop-center')
        	}
        	else
        	{
        		manage_dropdown_drop($(element).parent().children('.dropdown-menu'))
        		$(element).parent(".dropdown").addClass('dropdown_open')
        		$(element).parent(".dropdown").addClass('open')
        		$(element).attr('aria-expanded',true)
        	}
		  	e.preventDefault();
		  	e.stopPropagation();
		});

		function manage_dropdown_drop(dropdown){
			var moved_left = false;
			var moved_right = false;
			$(dropdown).removeClass('drop-left')
			$(dropdown).removeClass('drop-right')
			$(dropdown).removeClass('drop-center')
			while(check_drop_required(dropdown))
			{
				var left = $(dropdown).offset().left;
				var right = left + $(dropdown).outerWidth()
				var window_width = $(window).width();
				if(left < 0 && !moved_right)
				{
					moved_left = true;
					if(!moved_right)
					{
						$(dropdown).removeClass('drop-left')
						$(dropdown).addClass('drop-right')
						moved_right = true;
					}
				}
				else if(right > window_width && !moved_left)
				{
					moved_right = true;
					if(!moved_left)
					{
						$(dropdown).removeClass('drop-right')
						$(dropdown).addClass('drop-left')
						moved_left = true;
					}
				}
				else if(moved_left && moved_right)
				{
					$(dropdown).removeClass('drop-left')
					$(dropdown).removeClass('drop-right')
					$(dropdown).addClass('drop-center')
				}
			}
		}

		function check_drop_required(dropdown){
			var left = $(dropdown).offset().left;
			var right = left + $(dropdown).outerWidth()
			var window_width = $(window).width();
			if (left < 0 || right > window_width && !$(dropdown).hasClass("drop-center"))
			{
				return true
			}
			else
			{
				return false
			}
		}

		function manage_opendropdowns_on_resize()
		{
			var open_dropdowns = $("#top_menu").find(".dropdown.dropdown_open").find('.dropdown-toggle')
			$(open_dropdowns).each(function () {
				manage_dropdown_drop($(this).parent().children('.dropdown-menu'));
			});
		}

		$(document).click(function (e) {
			close_open_dropdowns(e);
		});


		var execute_manage_menu;
        $(window).on("resize", function() {
        	clearTimeout(execute_manage_menu);
        	execute_manage_menu = null;
			execute_manage_menu = setTimeout(function() {
				manage_menu();
				manage_opendropdowns_on_resize();
			}, 1000);
        });

        manage_menu()

    });

});