---
title: 'Live update patterns: how servers push data to clients'
pubDate: 2025-06-30
description: 'Exploring patterns for live updates from a server → client-side web application.'
showDate: true
tags: System design
isDraft: true
---

Common ways to implement live updates on a client include:

- **Short polling**: Short polling is a technique in which the client repeatedly sends requests to the server at fixed intervals to check for updates. The connection is closed after each request, and the server responds immediately with the current state or any available updates. While short polling is straightforward to implement, it may result in higher network traffic and server load compared to the more advanced techniques mentioned below.
- **Long polling**: Long polling extends on the idea of short polling by keeping the connection open until new data is available. While simpler to implement, it may introduce latency and increased server load compared to other approaches.
- **Server-Sent Events (SSE)**: SSE is a standard web technology that enables servers to push updates to web clients over a single HTTP connection. It's a simple and efficient mechanism for real-time updates, particularly well-suited for scenarios where updates are initiated by the server.
- **WebSockets**: WebSockets provide a full-duplex communication channel over a single, long-lived connection. This bidirectional communication allows both the server and the client to send messages to each other at any time. WebSockets are suitable for applications that require low latency and high interactivity.
- **HTTP/2 server push**: With HTTP/2, the server can push updates to the client without waiting for the client to request them. While HTTP/2 server push is not as widely used as other methods for live updates, it can be an efficient solution in certain scenarios.
