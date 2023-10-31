var express = require('express');
var router = express.Router();
const colors = require('colors')
const path = require('path')
const cppZipper = require('pucpdf2code');

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(!req.files){
    res.send('El archivo no fue encontrado'.red);
    return;
  }

  next();
});

router.post('/', (req, res, next)=>{
  let file = req.files.file;
  cppZipper(file.data)
    .then(project=>{
      req.projectName = project.proyecto;
      req.buffer = project.buffer;
      next();
    })
    .catch((err)=>{
      console.error(err.red);
      res.status(500).send('El archivo no fue creado correctamente');
    })
});

router.post('/', (req, res)=>{
  // const zipName = `${req.projectName}.zip`;
  // const zipPath = path.join(__dirname, '..', 'files', zipName);
  // console.log(`"${zipPath}"`)
  // res.download(zipPath, zipName, (err)=>{
  //   if(err){
  //     console.log(`No se pudo encontrar el archivo ${zipName}`.red)
  //     res.status(500).end();
  //   }else{
  //     console.log(`Se envió el archivo ${zipName}`.green)
  //     res.status(204).end();
  //   }
  // })

  const fileName = `${req.projectName}.zip`
  const fileType = 'application/zip'

  res.writeHead(200, {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': fileType,
  })
  res.end(req.buffer)
})

module.exports = router;
