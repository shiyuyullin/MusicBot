const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Fetch and play music")
    .addStringOption((option) =>
      option
        .setName("musicparam")
        .setDescription(
          "musicParam could be an artist's name, a song's name or combination of both"
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    const musicParam = interaction.options.getString("musicparam");
    await interaction.reply("Received!!");
    console.log(musicParam);
  },
};
