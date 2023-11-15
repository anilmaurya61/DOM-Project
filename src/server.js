const issuesRoutes = require('../src/Routes/issues-routes')
const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path')

const port = process.env.PORT || 3000

app.use(cors());
app.use(express.static(path.join(__dirname,'./Frontend')));
app.use(express.json());
app.use('/issues',issuesRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './Frontend/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})