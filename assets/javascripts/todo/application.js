Todo.Application = (function() {
	function Application() {
		
	}

	var ROUTES = {
		'/': Todo.IndexRoute
	  , '/contact': Todo.ContactPage
	};

	Application.fn = Application.prototype;

	Application.fn.run = function() {
		var routeClass = ROUTES[location.pathname]; 

		if (routeClass) {
			var route = new routeClass();
			route.run();
		} else {
			console.log('[ROUTE]', location.pathname, "doesn't have a route function");
		}
	};
	
	return Application;
})();


console.log(location.href);