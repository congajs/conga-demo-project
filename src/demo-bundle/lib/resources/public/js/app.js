// app.js
function App(){}

App.prototype.init = function() {

	$.ajax({
		'url': '/api/post?include=user,comments',
		//'type': 'json'
	}).done(function(response){

		var users = {};

		// build hash of users
		response.included.forEach(function(resource){
			if (resource.type == 'users'){
				users[resource.id] = resource;
			}
		});

		var html = '';

		response.data.forEach(function(post){

			var user = users[post.relationships.user.data.id];

			html += '<div class="panel panel-default">';
			html += '<div class="panel-heading">' + post.attributes.title + '</div>';
			html += '<div class="panel-body"><p>By: ' + user.attributes['first-name'] + ' ' + user.attributes['last-name'] + ' ' + post.attributes.body + '</div>';
			html += '</div>';
			html += '</div>';
		});

		$('.blog-container').html(html);
	});

	var memoryDps = [];
	var cpuDps = [];
	var labels = [];

	var xVal = 0;
	var dataLength = 100; 

	for (var x=0; x<dataLength; x++) {
		memoryDps.push(0);
		cpuDps.push({
			x: xVal,
			y: 0
		});
		labels.push(xVal);
		xVal++;
	}


	var memoryChart = new Chartist.Line('#memory-chart', 
		{
			labels: labels,
			series: [memoryDps]},
		{
			height: 120,
			showPoint: false,
			high: 400,
			low: 0,
			axisY: {
				onlyInteger: true,
				offset: 30,
				labelInterpolationFnc: function(value) {
      				return value + 'mb';
    			}
			},
			axisX: {
				showLabel: false
			}
		}
	);

	var cpuChart = new Chartist.Line('#cpu-chart', 
		{
			labels: labels,
			series: [cpuDps]},
		{
			height: 120,
			showPoint: false,
			high: 200,
			low: 0,
			axisY: {
				onlyInteger: true,
				offset: 30,
				labelInterpolationFnc: function(value) {
      				return value + '%';
    			}
			},
			axisX: {
				showLabel: false
			}
		}
	);

	var updateChart = function (data) {

		var now = new Date();

		memoryDps.push(data.memory / 1048576);
		cpuDps.push(data.cpu);

		xVal++;

		if (memoryDps.length > dataLength)
		{
			memoryDps.shift();
			cpuDps.shift();			
		}
		
		memoryChart.update();
		cpuChart.update();
	};

	var socket = conga.get('socket.io').connect('/server-status');
	socket.on('data', function(data) {
		updateChart(data);
	});

	setTimeout(function(){
		socket.request('server.info', {}, function(data) {
			var html = '';
			html += '<table class="table">';
			html += '<tr><td>Hostname:</td><td>' + data.hostname + '</td></tr>';
			html += '<tr><td>OS Type:</td><td>' + data.type + '</td></tr>';
			html += '<tr><td>Architecture:</td><td>' + data.architecture + '</td></tr>';
			html += '</table>';

			$('.server-info-container').html(html);
		});
	}, 1000);
}

$(document).ready(function(){
	var app = new App;
	app.init();
});
