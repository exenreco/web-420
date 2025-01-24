// Import the application
import { in_n_out_Books } from '../src/app';


const

// import site script
app = require('../src/app'),

// define sever port
PORT = process.env.PORT || 3000;

// start server
in_n_out_Books.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});