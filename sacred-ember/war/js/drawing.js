


function refreshUnits() {
	units.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	selectedContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

	for (var i = 0; i < unitList.length; i++) {
		var unit = unitList[i];
		var position = positionMap[unit.identifier];
		// alert(unit.identifier+ " at "+ position.x +","+position.y+ " - "+
		// position.direction);
		if(unit != selectedUnit){
			drawImage(unit, position, units);
		}
	}
	drawSelected();
	
		//units.globalAlpha = 1;
	//}
	//if(floating != null){
		//var position = getPosition(selectedUnit);
		//position.x = floating.x;
		//position.y = floating.y;
		//drawImage(selectedUnit, position, selectedContext);
	//}
	//drawImage()
}

function drawSelected(){
	selectedContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	var position = getPosition(selectedUnit);
	drawImage(selectedUnit, position, selectedContext);
	other.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	fillSquare(position);
}


function fillSquare(p) {
	// var c = document.getElementById("myCanvas");
	// var ctx = activeCanvas.getContext("2d");
	other.fillStyle = "#F5FF85";
	other.fillRect(p.x * step, p.y * step, step, step);
	// document.getElementById("debug").innerHTML = start
	// + new Point(e.clientX, e.clientY);
}

function drawImage(unit, position, canvas) {
	// alert('Drawing image');
	// alert('A');
	var imageObj = new Image();
	var fileName = unit.type + ".png";
	imageObj.src = fileName; // 'S_U_Karax.png';
	imageObj.onload = function() {
		// var x = point.x*step-67;
		// var y = point.y*step-67;
		var x = position.x * step;
		var y = position.y * step;
		var offset = imageObj.width / 2;
		canvas.save();
		if(isDraggingLeft && unit.identifier == selectedUnit.identifier){
			canvas.globalAlpha = 0.5;
		}
		canvas.translate(x + step / 2, y + step / 2);
		// var rotation = Math.random() * 360;
		var rotation = position.direction;
		canvas.rotate(rotation * Math.PI / 180);
		canvas.drawImage(imageObj, -offset, -offset);
		canvas.restore();
	};
	// alert('Done drawing image: '+fileName);
}

function drawGrid() {
	// alert("Drawing grid");
	background.strokeStyle = "gray";
	background.fillStyle = "#FFEEF00";
	background.lineWidth = 1;
	for (var i = 0; i <= step * 50; i += step) {
		background.moveTo(i, 0);
		background.lineTo(i, backgroundCanvas.width);
	}
	for (var i = 0; i <= step * 50; i += step) {
		background.moveTo(0, i);
		background.lineTo(backgroundCanvas.width, i);
	}
	background.stroke();
	// alert("Done drawing grid");
}

function drawText(p, text) {
	ctx.font = "18px Arial";
	ctx.fillText(text, (p.x + 0.1) * step, (p.y + 0.85) * step);
}