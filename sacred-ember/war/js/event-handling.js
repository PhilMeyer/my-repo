var selectedUnit;

var startDrag;
var endDrag;

var floating;

var isDraggingLeft = false;
var isDraggingRight = false;

var angles = [ 0, 45, 90, 135, 180, 225, 270, 315, 360 ];

function mouseMove(e) {
	// alert("Selected: "+selectedUnit.identifier);
	var p = new Point(adj(e.clientX), adj(e.clientY));
	// alert(p);
	// $("#debug2").html("Selected Unit: "+selectedUnit.identifier);
	$("#xycoordinates").html(p + new Point(e.clientX, e.clientY));
	if (isDraggingRight && selected != null) {
		// alert("dragging right");
		var deltaX = p.x - selected.x;
		var deltaY = p.y - selected.y;
		var theta = Math.atan2(deltaY, deltaX);
		if (theta < 0) {
			theta += 2 * Math.PI;
		}
		var angle = (theta * (180 / Math.PI) + 90) % 360;
		// $("#debug1").html("angle=" + angle);
		// $("#debug2").html("selected=" + selected);
		var position = positionMap[selectedUnit.identifier];
		// $("#debug3").html("direction=" + position.direction);
		// alert(position);
		var currentDirection = positionMap[selectedUnit.identifier].direction;
		var closestAngle = currentDirection;
		angles.forEach(function(entry) {
			if (Math.abs(angle - entry) < Math.abs(closestAngle - entry)) {
				closestAngle = entry;
			}
		});
		if (currentDirection != closestAngle) {
			positionMap[selectedUnit.identifier].direction = closestAngle;
			drawSelected();
		}
		// positionMap[getUnitAt(selected).identifier].direction = angle;
	} else if (isDraggingLeft && selected != null) {
		// var temp = floating;
		// floating = p;
		// $("#debug1").html("dragging left");
		// $("#debug3").html("selected=" + selected + " p=" + p);
		// if (temp != null) {
		// if (p.x != temp.x || p.y != temp.y) {
		// drawSelected();
		// }
		// }
	}
}

$(window).keydown(function(e) {
	// alert(e.which);
	var unit = getUnitAt(selected);
	if (unit != null) {
		var current = positionMap[unit.identifier];
		if (e.which == 37) {
			current.direction += 45;
		} else if (e.which == 39) {
			current.direction -= 45;
		}
		refreshUnits();
	}
});

function mouseDown(e) {
	if (e.which == 1) {
		// selected = new Point(adj(e.clientX), adj(e.clientY));
		var unit = getUnitAt({
			x : adj(e.clientX),
			y : adj(e.clientY)
		});
		if (unit != null) {
			startDrag = new Point(adj(e.clientX), adj(e.clientY));
			var previousSelected = selectedUnit;
			if (selectedUnit != unit) {
				selectedUnit = unit;
				selected = new Point(adj(e.clientX), adj(e.clientY));
				// alert('Down: '+selected);
				console.log('Unit: ' + unit);
				var selectedText = "Selected Unit: " + selectedUnit.type + " ["
						+ selectedUnit.identifier + "]";
				console.log(selectedText);
				$("#selected").html(selectedText);
				// refreshSelected();
				drawSelected();
			}
		}
		isDraggingLeft = true;
	} else {
		isDraggingRight = true;
	}
}

function mouseUp(e) {
	isDraggingLeft = false;
	isDraggingRight = false;
	floating = null;
	var endDrag = new Point(adj(e.clientX), adj(e.clientY));
	if (startDrag.x != endDrag.x || startDrag.y != endDrag.y) {
		var unit = getUnitAt(selected);
		if (e.which == 1) {
			// $("#debug2").html("drag over, updating unit position to " +
			// endDrag);
			positionMap[unit.identifier].x = endDrag.x;
			positionMap[unit.identifier].y = endDrag.y;
			// $("#debug3").html("drag over, about to set selected " + endDrag);
			selected = endDrag;
			refreshUnits();
			drawSelected();
		}
	}
	startDrag = null;
}