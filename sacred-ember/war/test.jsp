<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Title of the document</title>
<style type="text/css">
body {
	font-size: 70%;
	font-family: verdana, helvetica, arial, sans-serif;
}

#bottom-part {
	position: relative;
	top: 730px;
}
</style>

</head>

<body>
	<!-- onmousedown="clicked(event)"  -->
	<div>
		<!--<canvas id="myCanvas" width="300" height="300"
		style="border: 1px solid #000000;" onmousemove="showCoords(event)" onmousedown="clicked(event)" ondragstart="drag(event)" draggable="true"/> 
		
		-->
		<!-- 
		<canvas id="background" width="720" height="720"
			style="border: 1px solid #000000; background-image:url('Map_Desert_Waste.jpg'); position: absolute; left: 8; top: 8; z-index: 0;" onmousemove="mouseMove(event)"
			onmousedown="mouseDown(event)" onmouseup="mouseUp(event)" />
						
			
		<canvas id="units" width="720" height="720" style="position: absolute; left: 8; top: 8; z-index: 1; background:rgb(204,220,227)" />
		

		<canvas id="background" width="720" height="720"
			style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
		<canvas id="units" width="720" height="720"
			style="position: absolute; left: 0; top: 0; z-index: 1;" onmousedown="mouseDown(event)" onmouseup="mouseUp(event)"></canvas>
		 -->

		<canvas id="background" width="630" height="630"
			style="position: absolute; left: 5; top: 5; z-index: 0; background-image:url('Map_Desert_Waste.jpg');"></canvas>
		<canvas id="other" width="630" height="630"
			style="position: absolute; left: 5; top: 5; z-index: 1;"></canvas>
		<canvas id="units" width="630" height="630"
			style="position: absolute; left: 5; top: 5; z-index: 2;"
			onmousedown="mouseDown(event)" onmouseup="mouseUp(event)"
			onmousemove="mouseMove(event)"></canvas>

	</div>
	<div id="bottom-part">
		<div id="xycoordinates"></div>
		<div id="selected"></div>
	</div>


</body>

<script>

	function Point(x, y) {
		this.x = x;
		this.y = y;
	}

	Point.prototype.toString = function pointToString() {
		var ret = "(" + this.x + "," + this.y + ")";
		return ret;
	}

	var step = 45;
	var start;
	var end;

	var counter = 1;
	var backgroundCanvas = document.getElementById("background");
	var unitCanvas = document.getElementById("units");
	var otherCanvas = document.getElementById("other");

	var background = backgroundCanvas.getContext("2d");
	var units = unitCanvas.getContext("2d");
	var other = otherCanvas.getContext("2d");

	var switched = 0;
	var karax = "karax";//"S_U_Karax.png";
	var bane = "bane"//"X_U_BaneThrall_slime.png";
	var selected;


	var positionMap = ${positionMap};
	var unitList = ${unitList}
	
	
	function getUnitAt(position){
		for(var i = 0; i < unitList.length; i++){
			var unit = unitList[i];
			var temp = positionMap[unit.identifier];
			if(temp.x == position.x && temp.y == position.y){
				return unit;
			}
		}
		return null;
	}
	

	function getClosestUnitTo(position){
		
		var closest;
		var closestDist;
		
		for(var i = 0; i < unitList.length; i++){
			var unit = unitList[i];
			var temp = positionMap[unit.identifier];
			var dist = distance(new Point(temp.x,temp.y), new Point(position.x, position.y));
			if(closest == null || dist < closestDist){
				closest = unit;
				closestDist = dist;
			}
		}
		return closest;
	}
	
	function refreshUnits(){
		units.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		for(var i = 0; i < unitList.length; i++){
			var unit = unitList[i];
			var position = positionMap[unit.identifier];
			//alert(unit.identifier+ " at "+ position.x +","+position.y+ " - "+ position.direction);
			drawImage(unit, position);
		}
	}
	
	
	drawGrid();
	refreshUnits();

	function doSwitch(e) {
		switched = (switched + 1) % 2;
	}

	function drawImage(unit, position) { 
		//alert('Drawing image');
		//alert('A');		
		var imageObj = new Image();
		var fileName = unit.type + ".png";
		imageObj.src = fileName; //'S_U_Karax.png';
		imageObj.onload = function() {
			//var x = point.x*step-67;
			//var y = point.y*step-67;
			var x = position.x * step;
			var y = position.y * step;
			var offset = imageObj.width / 2;
			units.save();
			units.translate(x + step / 2, y + step / 2);
			//var rotation = Math.random() * 360;
			var rotation = position.direction;
			units.rotate(rotation * Math.PI / 180);
			units.drawImage(imageObj, -offset, -offset);
			units.restore();
		};
		//alert('Done drawing image: '+fileName);
	}

	function drawGrid() {
		//alert("Drawing grid");
		background.strokeStyle = "gray";
		background.fillStyle = "#FFEEF00";
		background.lineWidth = 1;
		for ( var i = 0; i <= backgroundCanvas.width; i += step) {
			background.moveTo(i, 0);
			background.lineTo(i, backgroundCanvas.height);
		}
		for ( var i = 0; i <= backgroundCanvas.height; i += step) {
			background.moveTo(0, i);
			background.lineTo(backgroundCanvas.width, i);
		}
		background.stroke();
		//alert("Done drawing grid");
	}

	
	function distance(p1, p2){
		return Math.sqrt(Math.pow(p1.x - p2.x,2) + 	Math.pow(p1.y - p2.y,2));	
	}
	

	function mouseMove(e) {
		var p = new Point(adj(e.clientX), adj(e.clientY));
		//alert(p);
		document.getElementById("xycoordinates").innerHTML = p
				+ new Point(e.clientX, e.clientY);
	}

	

	function mouseDown(e) {
		end = null;
		selected = new Point(adj(e.clientX), adj(e.clientY));
		var unit = getClosestUnitTo({x:adj(e.clientX), y:adj(e.clientY)});
		if (unit != null) {
			selected = positionMap[unit.identifier];
			//alert('Down: '+selected);
			other.clearRect(0, 0, backgroundCanvas.width,
					backgroundCanvas.height);
			fillSquare(selected);
			document.getElementById("selected").innerHTML = "Selected: "+unit.type+ " ["+unit.identifier+"]";
		}
	    e.preventDefault();
	}

	function mouseUp(e) {
		end = new Point(adj(e.clientX), adj(e.clientY));
		if (start.x != end.x || start.y != end.y) {
			//alert("Dragged from "+start+" to "+end+".");
		} else {
			//alert("Clicked on "+start+".");
		}
		fillSquare(end);
		start = null;
	}

	function fillSquare(p) {
		//var c = document.getElementById("myCanvas");
		//var ctx = activeCanvas.getContext("2d");
		other.fillStyle = "#F5FF85";
		other.fillRect(p.x * step, p.y * step, step, step);
		//document.getElementById("debug").innerHTML = start
		//		+ new Point(e.clientX, e.clientY);
	}

	function adj(v) {
		return Math.floor((v - 8) / step);
	}

	function drawText(p, text) {
		ctx.font = "18px Arial";
		ctx.fillText(text, (p.x + 0.1) * step, (p.y + 0.85) * step);
	}

</script>

</html>

