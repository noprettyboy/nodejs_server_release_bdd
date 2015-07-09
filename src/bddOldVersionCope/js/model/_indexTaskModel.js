'use strict';

(function(app) {
	app.factory('indexTask', ['$http', 
	 	function ($http) {
	 		function indexTask(data) {
                // if (taskData) {
                //     this.setData(taskData);
                // }
            }
		 	indexTask.prototype = {
		 		setData: function(data) {
                    // angular.extend(this, {
                    //     loaddata: taskData
                    // });
                },
		 		load: function(params, callback) {
	                var scope = this;
	                $.each(params, function(i, e) {
	                    if (e == null || e === "") {
	                        delete params[i];
	                    }
	                });
	            	var tempObj = {
	                    url: "../../../mock/_indexTask/",
	                    params: params,
	                    method: "GET"
	                };               
	                $http(tempObj).success(
	                	function(data) {
		                	if (data.success) {
		                        if (callback) {
		                            callback(data);
		                        }
		                    } else {
		                        alert("get data failed: " + data.message);
		                        return false;
		                    }
		                }
		            );
	            }
		 	};
		 	return indexTask;
	    }]
	);
})(app);