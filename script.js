var tabbedBoxes = tabbedBoxes || {};

tabbedBoxes.Tabs = function() {	

	// Decalre our variables, the tabs and the tab-boxes
	var tab = $(".tab-selectors li a");
	var tabBox = $('.tab-box');

	// These functions run on load
	function init() {

		// Run the functions

		// First check the query string in the browser. The user might want to open a specific tab
		checkQueryString();

		// If they click a tab then open that one
		tab.click(openTab);

	}

	// This functiion checks if the URL already has a tab name on it
	// For example a user might use an enternal URL and want to land on a specific tab open
	// So the URL might be www.domain.co.uk/index.html?tab=box-one
	function checkQueryString() {

		// Get the tab name using the getQueryStringParameterByName function
		var tabName = getQueryStringParameterByName('tab');

		console.log(tabName);

		// If a tab name exists
		if(tabName) {

			// Reset active states
			tab.removeClass('active');
			tabBox.removeClass('show');

			// Add class to the other links that have same ID/Class
			$("a."+ tabName).addClass('active');
			$("#" + tabName).addClass('show');

		}

	}

	function openTab(e) {

		// We don't want to follow these links
		e.preventDefault();

		// Reset active class and add to appropriate tab
		tab.removeClass('active');
		$(this).addClass('active');

		// Get the href of the tab
		var href = $(this).attr('href');

		// Strip the href down to just the box name
		var hrefParts = href.split('?tab=');

		// If the href splits into exactly two
		if (hrefParts.length === 2) {

			// Get the second part of the hrefParts, we chopped the first part off (starts at 0)
			var tabName = hrefParts[1];

			// Make sure there aren't two things being passed to the URL
			if (tabName.indexOf('&') !== -1) {

				// If there are then cut the one we want out and restore
				// So we woudl cut from 0 to the index of & eg (1,9)
				tabName = tabName.substring(0, tabName.indexOf('&'));

			}

			// Add class to the other links that have same href
			$("a." + tabName).addClass('active');
			$(this).addClass('active');

			// Remove all class from tabs then show/hide
			tabBox.removeClass('show')
			$('#' + tabName).addClass('show');

		}

	}

	// This checks the query string and strips it bare
	// I had some help from @rickliveshere making this
	// It's using fancy regulax expressions to strip the variable so that we can open the correct tab
	function getQueryStringParameterByName(name) {

		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		var results = regex.exec(location.search);

		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

	}

	init();

};

// ON DOC READY
$(function() {	

    new tabbedBoxes.Tabs();

});
