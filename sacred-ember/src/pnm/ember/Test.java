package pnm.ember;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

@SuppressWarnings("serial")
public class Test extends HttpServlet {

	static Environment e = new Environment();
	static{
		e.initialize();
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String nextJSP = "/test.jsp";
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(nextJSP);
		ObjectMapper objectMapper = new ObjectMapper();
		req.setAttribute("positionMap", objectMapper.writeValueAsString(e.positions));
		req.setAttribute("unitList", objectMapper.writeValueAsString(e.positions.keySet()));
		dispatcher.forward(req, resp);
	}

}
