const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', /*root cambiado por pablo1*/'pablo1', /*root cambiado por pablo1*/ 'pablo1', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



class Cars extends Sequelize.Model {}
Cars.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'users' });


/* Inserción y eliminación de un registro.*/
sequelize.sync()
  .then(() => Cars.create({
    firstName: 'Pablo',
    lastName: 'Lopes'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  })
  .then(()=> Cars.destroy( {
    where: {
      lastName: 'Lopes'
    }
  }).then(() => {
    console.log("Registro eliminado");
  }))
  ;
;

