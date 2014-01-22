package pnm.ember;

public class Unit {

	public String identifier;
	public String type;
	
	public Unit(){}
	
	public Unit(String identifier, String type) {
		this.identifier = identifier;
		this.type = type;
	}
	
	public String toString(){
		return identifier;
	}
	
}
