const app = require("./app")

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});