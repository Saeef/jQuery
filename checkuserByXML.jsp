<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%
String userId = request.getParameter("name");
response.setContentType("application/xml;charset=UTF-8");
response.setHeader("pragma","no-cache");
response.setHeader("cache-control","no-cache");
if("admin".equals(userId))
{
	response.getWriter().write("<root><success>true</success><tip>用户名已存在</tip></root>");
}
else
{
	response.getWriter().write("<root><success>false</success><tip>用户名可以使用</tip></root>");
}
%>