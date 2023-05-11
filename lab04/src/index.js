const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const axios = require('axios')

/* ---------------------------- setups and config --------------------------- */
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

/* ------------------------------- middleware ------------------------------- */
app.use('/api/members', require('./routes/members').router)

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/members')
    const members = data
    res.render('index', { members })
  } catch (error) {
    console.log(error.message)
  }
})

app.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const { data } = await axios.get(`http://localhost:8000/api/members/${id}`)
    const member = data[0]
    res.render('member', { member })
  } catch (error) {
    console.log(error.message)
  }
})

app.use((req, res) => res.sendFile(path.join(__dirname, 'public', '404.html')))

/* -------------------------------- listener -------------------------------- */
const PORT = process.env.PORT || 8000
app.listen(PORT)
