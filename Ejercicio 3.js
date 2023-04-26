const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', /*root cambiado por pablo1*/ 'pablo1', /*root cambiado por pablo1*/ 'pablo1', {
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



const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
});


/* Inserción y actualización de varios registros.*/ 

sequelize.sync()
  .then(() => User.bulkCreate([{
    firstName: 'Pablo',
    lastName: 'Lopes'
  }, {
    firstName: 'Ezequiel',
    lastName: 'Ferrao'
  },
  {
    firstName: 'Pablo Ezequiel',
    lastName: 'Lopes Ferrao'
  }
]))
  .then(()=> {
    console.log('Registros insertados con éxito');
  })
  .then(()=> User.update({ firstName: "Pablo E" }, {
    where: {
      lastName: 'Lopes Ferrao'
    }
  }).then(() => {
    console.log("Usuario actualizado");
  }))
  ;
;
