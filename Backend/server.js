const express = require('express')
const chatdata = require('./chatdata/chatdata')
const mongoose = require('mongoose')
// const connectDB = require("./config/db");
const cors = require('cors')
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
// const  {notFound, errorHandler} = require('./middleware/errMiddleware');

// dotenv.config();
// connectDB();

const app = express()

app.use(cors())
app.use(express.json());

// app.use(notFound);
// app.use(errorHandler);

// app.use("/user", userRoutes)
app.use("/chat",chatRoutes)
app.use("/user",userRoutes)


app.get('/', (req,res) => {
    res.send('Welcome')
})

// app.get('/chat', (req,res) => {
//     res.send(chatdata)
// })

// mongoose.connect('mongodb+srv://koushik:koushik@cluster0.v1klpsh.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
 mongoose.connect('mongodb+srv://kmaity:kmaity@chatapp.hkfsrrm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.listen(3000, () =>{
    console.log('listening on port 3000')
})
