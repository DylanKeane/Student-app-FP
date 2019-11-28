/* Setup port using express.
Setup 404 error using express js.
Making mongoDB database connection
Serving static files using express js in Mean stack app.
Handling errors using Express js in Angular 8 Mean stack project.*/

let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dataBaseConfig = require('./database/db');
// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
useNewUrlParser: true
}).then(() => {
console.log('Database connected sucessfully ')
},
error => {
console.log('Could not connected to database : ' + error)
}
)
// Set up express js port
const studentRoute = require('./routes/student.routes')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/student-app')));
app.use('/', express.static(path.join(__dirname, 'dist/student-app')));

//restful api route
app.use('/api', studentRoute)
// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});