var SoccerApp = angular.module('SoccerApp', []);

SoccerApp.controller('MainCtrl', function($scope, $http, $log) {
	var parseDate = function(d) {
		return new Date((d - (25567 + 1))*86400*1000);
	}

	$scope.formatDay = function(d) {
		if (typeof d === 'undefined') { return; }
		var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		return days[d.getDay()];
	}
	$scope.formatDate = function(d) {
		if (typeof d === 'undefined') { return; }
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
	}
	$scope.formatTime = function(t) {
		if (typeof t === 'undefined') { return; }
		var hour = parseInt(t.split(':')[0]);
		var period = 'AM';
		if (hour > 12) {
			hour = hour - 12;
			period = 'PM';
		}
		if (hour == 12) period = 'PM';
		if (hour == 0) period = 'AM';
		var min = t.split(':')[1].substring(0, t.length - 3);
		return hour + ':' + min + ' ' + period;
	}
	$scope.changeDate = function(date) {
		$scope.current_date = date;
	}
	$scope.isCurrentDate = function(row) {
		return $scope.formatDate(row['Date']) == $scope.formatDate($scope.current_date);
	}

	$http.get('https://sheetsu.com/apis/b17a3b64').success(function(response) {
		$scope.dates = [];
		$scope.division = [];
		$scope.data = response.result;
		$scope.data.sort(function(a,b) {
			var d1 = new Date(a['Date']);
			var d2 = new Date(b['Date']);

			var t1 = a['Time'];
			var t2 = b['Time'];

			if (d1 < d2) return -1;
			if (d1 > d2) return 1;
			if (t1 < t2) return -1;
			if (t1 > t2) return 1;
			return 0;
		});

		for (i in $scope.data) {
			var date = parseDate($scope.data[i]['Date']);
			var found = false;
			for (j in $scope.dates) {
				if ($scope.formatDate($scope.dates[j]) == $scope.formatDate(date)) {
					found = true;
					break;
				}
			}
			if (found == false) {
				$scope.dates.push(date);
			}
			$scope.data[i]['Date'] = date;
		}
		$scope.dates.sort(function(a, b) {
		    a = new Date(a);
		    b = new Date(b);
		    return a>b ? -1 : a<b ? 1 : 0;
		});
		$scope.current_date = $scope.dates[0];
		for (i in $scope.dates) {
			if ($scope.dates[i] >= new Date()) {
				$scope.current_date = $scope.dates[i];
			}
		}
		$scope.dates.reverse();
	});
});