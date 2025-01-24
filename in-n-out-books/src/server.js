const

// import site script
app = require('../src/app'),

// define sever port
PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});