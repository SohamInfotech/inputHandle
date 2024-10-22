const server = require('express');
const app = server();
const fs = require('fs')


var so = [];
var index = null;
var editedata = null;
function getdata() {
    var a = fs.readFileSync("data.json", "utf-8")
    if (a) {
        so = JSON.parse(a)
    }
}
getdata()

function setdata() {
    fs.writeFileSync('data.json', JSON.stringify(so))
}



app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index.ejs', { data: so, editedata: editedata })
})
app.get('/page', (req, res) => {
    if (index) {

        
        so[index] = req.query;  
        index = null;
        editedata = null;
    } else {
        so.push(req.query)
        setdata()
    }
    res.redirect('/')
})

app.get('/deletedata', (req, res) => {
    so.splice(req.query.delet, 1)
    setdata()
    res.redirect("/")
})
app.get('/editdata', (req, res) => {
    console.log(req.query);
    index = req.query.edit;
    editedata = so[index];
    res.render('index.ejs', { data: so, editedata: editedata })
})


app.listen(150)
