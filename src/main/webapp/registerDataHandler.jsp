<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%
String user = request.getParameter("name");
String pass = request.getParameter("pass");
response.setContentType("application/json;charset=UTF-8");
response.setHeader("pragma","no-cache");
response.setHeader("cache-control","no-cache");
Thread.sleep(1500);
response.getWriter().write("{\"user\":"+"\""+user+"\""+"}");
%>