const express = require('express')
const app = express();
app.use('/', (req, res) => {
    res.send('<h1>Hey raj,welcome back to backend</h1>')

})
app.listen(3000, () => {
    console.log("super saiyannnnn independent")
})