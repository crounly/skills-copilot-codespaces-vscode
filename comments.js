// Create web server
const express = require('express');
const app = express();
app.use(express.json());
const comments = require('./comments');

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('Comment not found');
  } else {
    res.json(comment);
  }
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    body: req.body.body
  };
  comments.push(comment);
  res.json(comment);
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('Comment not found');
  } else {
    comment.body = req.body.body;
    res.json(comment);
  }
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send('Comment not found');
  } else {
    comments.splice(index, 1);
    res.status(204).send();
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

## Middleware
In Express, middleware are functions that execute during the request-response cycle. Middleware functions can access the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

### Built-in Middleware
Express has a built-in middleware function to serve static files, such as images, CSS, JavaScript, and other static files. You can use the `express.static` function to serve static files in the `public` directory.

```js
// Path: server

