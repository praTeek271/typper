const express = require('express');
const app = express();

app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
