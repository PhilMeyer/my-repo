
	var step = 45;
	
	document.oncontextmenu = function(){return false};
	
	//var positionMap = ${positionMap};
	//var unitList = ${unitList}
	var positionMap = {"b5":{"x":12,"y":6,"direction":310},"k2":{"x":2,"y":1,"direction":130},"k4":{"x":1,"y":3,"direction":130},"b1":{"x":3,"y":12,"direction":310},"b6":{"x":12,"y":9,"direction":310},"b7":{"x":10,"y":12,"direction":310},"b4":{"x":10,"y":8,"direction":310},"b3":{"x":6,"y":11,"direction":310},"b2":{"x":4,"y":10,"direction":310},"k3":{"x":1,"y":2,"direction":130},"k1":{"x":2,"y":2,"direction":130},"k5":{"x":3,"y":1,"direction":130}};
	var unitList = [{"identifier":"b5","type":"bane"},{"identifier":"k2","type":"karax"},{"identifier":"k4","type":"karax"},{"identifier":"b1","type":"bane"},{"identifier":"b6","type":"bane"},{"identifier":"b7","type":"bane"},{"identifier":"b4","type":"bane"},{"identifier":"b3","type":"bane"},{"identifier":"b2","type":"bane"},{"identifier":"k3","type":"karax"},{"identifier":"k1","type":"karax"},{"identifier":"k5","type":"karax"}]
	//var positionMap = {"b5":{"x":12,"y":6,"direction":310}};
	//var unitList = [{"identifier":"b5","type":"bane"}];

	
	function Point(x, y) {
		this.x = x;
		this.y = y;
	}

	Point.prototype.toString = function pointToString() {
		var ret = "(" + this.x + "," + this.y + ")";
		return ret;
	}
	
	function selectedPosition(){
		var unit = getUnitAt(selected);
		return positionMap[unit.identifier];
	}

	function getPosition(unit){
		return positionMap[unit.identifier];
	}
	
	
	function selectedUnit(){
		return getUnitAt(selected);
	}
		
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
	
	
	function adj(v) {
		return Math.floor((v - 8) / step);
	}