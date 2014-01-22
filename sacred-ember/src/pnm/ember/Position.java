package pnm.ember;

public class Position {

	public int x, y;
	public int direction;
	
	public Position(){
		this(0,0,0);
	}
	
	public Position(int x, int y){
		this(x,y,0);
	}
	
	public Position(int x, int y, int direction){
		this.x = x;
		this.y = y;
		this.direction = direction;
	}
	
}
