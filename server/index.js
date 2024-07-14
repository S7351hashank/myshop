

const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Product");

const {dbconnect} = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect and cloudinary
dbconnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"https://myshop-storemanage.vercel.app",
		// origin:"http://localhost:3000",
		credentials: true,
	})
)


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product", productRoutes);

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

