const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Greeting Command"),
  cooldown: 5,
  async execute(interaction) {
    await interaction.reply("Hi There!!");
    // console.log(interaction);
  },
};
