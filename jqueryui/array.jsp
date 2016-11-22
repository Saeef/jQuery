<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%
response.setContentType("text/html;charset=UTF-8");
response.setHeader("pragma","no-cache");
response.setHeader("cache-control","no-cache");
response.getWriter().write("[\"ActionScript\",\"AppleScript\",\"Asp\",\"BASIC\",\"Clojure\",\"COBOL\",\"ColdFusion\",\"Erlang\",\"Haskell\",\"Java\",\"JavaScript\"]");
%>