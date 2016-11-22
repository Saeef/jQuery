<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%
String user = request.getParameter("user");
String pass = request.getParameter("pass");
response.setContentType("application/json;charset=UTF-8");
response.setHeader("pragma","no-cache");
response.setHeader("cache-control","no-cache");
String msg = null;
Thread.sleep(1500);
if("admin".equals(user)&&"123456".equals(pass))
{
	msg = "1";
}else
{
	msg = "0";
}
response.getWriter().write("{\"msg\":"+"\""+msg+"\""+"}");
%>