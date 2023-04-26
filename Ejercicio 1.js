const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', /*root cambiado por pablo1*/'pablo1', /*root cambiado por pablo1*/'pablo1', {
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


/*Inserción y actualización de un registro.*/ 

sequelize.sync()
  .then(() => User.create({
    firstName: 'Pablo',
    lastName: 'Lopes'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  })
  .then(()=> User.update({ firstName: "Jose" }, {
    where: {
      lastName: 'Rodriguez'
    }
  }).then(() => {
    console.log("Usuario actualizado");
  }))
  ;
;
