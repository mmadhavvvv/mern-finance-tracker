const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log('Connecting to:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Success!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Failed:', err);
        process.exit(1);
    });
