'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER,
    chat: DataTypes.TEXT
  }, {});
  Chat.associate = function(models) {
    Chat.belongsTo(models.User,{
      foreignKey:'fromUserId'
    }),
    Chat.belongsTo(models.User,{
      foreignKey:'toUserId'
    })
  };
  return Chat;
};