const express = require("express");
const mysql = require("mysql");
const { send } = require("process");
const { resourceLimits } = require("worker_threads");

const app = express();

app.use(express.json());

//Habilitar cores
//permitir que haga peticiones desde un client
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const connectBD = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JoElOoO2025@",
  database: "Challenge5",
});

app.get("/", (req, res) => {
  res.send("Welcome to the products ");
});

app.listen(3001, () => {
  console.log("server running in port 3001");
});

app.get('/autos', (req,res)=>{
    const sql = 'SELECT * FROM autos'

    connectBD.query(sql,(error,result)=>{
        if (error) throw error;
        if (result.length > 0){
            res.json(result)
        } else {
            res.send('Not results') 
        }
    })
})

app.get('/autos/:id',(req,res)=>{

    const id = req.params.id
    const sql = `SELECT * FROM autos WHERE idautos = ${id}`

    connectBD.query(sql,(error,result) =>{
        if (error) throw error;
        if (result.length > 0){
            res.json(result)
        } else {
            res.send('Not result')
        }
    })

})

app.post('/agregar-auto',(req,res)=>{
    const sql = 'INSERT INTO autos SET ?'

    const autosObj = {
        idautos: req.body.idautos,
        nombre_vehiculo: req.body.nombre_vehiculo,
        año_fabricacion: req.body.año_fabricacion,
        precio: req.body.precio,
        cantidad: req.body.cantidad
    }

    connectBD.query(sql, autosObj, error => {
        if (error) throw error

        res.send('Auto agregado correctamente')
    })
    console.log(autosObj)

})

app.put('/actualizar-auto/:id', (req,res) => {
    const id = req.params.id
    const {nombre_vehiculo, año_fabricacion,precio,cantidad} = req.body

    const sql = `UPDATE autos SET nombre_vehiculo = '${nombre_vehiculo}', año_fabricacion = '${año_fabricacion}', precio = '${precio}', cantidad = '${cantidad}'`

    connectBD.query(sql, error =>{
        if (error) throw error  

        res.send('Vehiculo Actualizado')
    })
})
