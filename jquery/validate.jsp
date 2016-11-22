<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%
String user = request.getParameter("mName");
response.setContentType("application/json;charset=UTF-8");
response.setHeader("pragma","no-cache");
response.setHeader("cache-control","no-cache");
if(user.equals("admin"))
	response.getWriter().write("false");
else
	response.getWriter().write("true");
%>