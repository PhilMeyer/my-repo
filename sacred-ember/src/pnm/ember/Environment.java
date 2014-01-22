package pnm.ember;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class Environment {
	
	Map<Unit,Position> positions = new HashMap<>();
	
	public void initialize(){
		positions.put(new Unit("k1","karax"), new Position(2,2,130));
		positions.put(new Unit("k2","karax"), new Position(2,1,130));
		positions.put(new Unit("k3","karax"), new Position(1,2,130));
		positions.put(new Unit("k4","karax"), new Position(1,3,130));
		positions.put(new Unit("k5","karax"), new Position(3,1,130));
		
		// var initial2 = [{x:"3",y:"12"}, {x:"4",y:"10"}, {x:"6",y:"11"}, {x:"10",y:"8"}, {x:"12",y:"6"}, {x:"12",y:"9"}];

		positions.put(new Unit("b1","bane"), new Position(3,12,310));
		positions.put(new Unit("b2","bane"), new Position(4,10,310));
		positions.put(new Unit("b3","bane"), new Position(6,11,310));
		positions.put(new Unit("b4","bane"), new Position(10,8,310));
		positions.put(new Unit("b5","bane"), new Position(12,6,310));
		positions.put(new Unit("b6","bane"), new Position(12,9,310));
		positions.put(new Unit("b7","bane"), new Position(10,12,310));
	}
	
	
	public static void main(String[] args) throws JsonGenerationException, JsonMappingException, IOException {
		Environment e = new Environment();
		e.initialize();
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(mapper.writeValueAsString(e.positions));
		System.out.println(mapper.writeValueAsString(e.positions.keySet()));
	}
	
}
