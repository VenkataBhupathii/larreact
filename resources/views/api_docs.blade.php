
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SyncSaga API Documentation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        h2 {
            color: #3498db;
            margin-top: 30px;
        }
        .endpoint {
            background-color: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 0 4px 4px 0;
        }
        .method {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            margin-right: 10px;
        }
        .get { background-color: #61affe; }
        .post { background-color: #49cc90; }
        .put { background-color: #fca130; }
        .delete { background-color: #f93e3e; }
        .path {
            font-family: monospace;
            font-size: 1.1em;
        }
        code {
            background-color: #f1f1f1;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>SyncSaga API Documentation</h1>
    <p>This documentation provides information about available API endpoints for the SyncSaga application.</p>
    
    <h2>Authentication</h2>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/auth/register</span>
        <p>Register a new user account.</p>
        <p><strong>Body:</strong> <code>{ "name": "string", "email": "string", "password": "string" }</code></p>
    </div>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/auth/login</span>
        <p>Login with existing credentials.</p>
        <p><strong>Body:</strong> <code>{ "email": "string", "password": "string" }</code></p>
    </div>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/auth/logout</span>
        <p>Logout and invalidate the current token.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/auth/user</span>
        <p>Get the currently authenticated user.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <h2>Projects</h2>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/projects</span>
        <p>Get all projects the authenticated user has access to.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/projects</span>
        <p>Create a new project.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
        <p><strong>Body:</strong> <code>{ "name": "string", "description": "string", "dueDate": "string" }</code></p>
    </div>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/projects/{id}</span>
        <p>Get a specific project by ID.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <div class="endpoint">
        <span class="method put">PUT</span>
        <span class="path">/api/projects/{id}</span>
        <p>Update a specific project.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
        <p><strong>Body:</strong> <code>{ "name": "string", "description": "string", "status": "string", "dueDate": "string" }</code></p>
    </div>
    
    <div class="endpoint">
        <span class="method delete">DELETE</span>
        <span class="path">/api/projects/{id}</span>
        <p>Delete a specific project.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <h2>Tasks</h2>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/tasks</span>
        <p>Get all tasks the authenticated user has access to.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/tasks</span>
        <p>Create a new task.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
        <p><strong>Body:</strong> <code>{ "projectId": "number", "title": "string", "description": "string", "status": "string", "assigneeId": "number", "priority": "string", "dueDate": "string" }</code></p>
    </div>
    
    <div class="endpoint">
        <span class="method put">PUT</span>
        <span class="path">/api/tasks/{id}</span>
        <p>Update a specific task.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <div class="endpoint">
        <span class="method delete">DELETE</span>
        <span class="path">/api/tasks/{id}</span>
        <p>Delete a specific task.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <h2>Messages</h2>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/messages</span>
        <p>Get all messages.</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
    </div>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/messages</span>
        <p>Send a new message (supports attachments).</p>
        <p><strong>Authorization:</strong> Bearer Token required</p>
        <p><strong>Body:</strong> <code>{ "content": "string", "attachments[]": "files" }</code></p>
    </div>
    
    <footer>
        <p>To access the React frontend application, go to: <a href="{{ env('FRONTEND_URL', 'http://localhost:8080') }}">{{ env('FRONTEND_URL', 'http://localhost:8080') }}</a></p>
    </footer>
</body>
</html>
