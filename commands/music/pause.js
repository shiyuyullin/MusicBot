const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause playing music"),

  async execute(interaction) {
    // Check if the bot is in a voice channel or not
    const connection = getVoiceConnection(interaction.guildId);
    if (typeof connection === "undefined") {
      return await interaction.reply("Can't pause if I'm not playing~");
    }
    const player = connection.state.subscription.player;
    // Users can pause playing only if they are in the same channel with the bot
    if (
      connection.joinConfig.channelId === interaction.member.voice.channel.id
    ) {
      player.pause();
      await interaction.reply("Paused!");
    } else {
      await interaction.reply("We have to be in the same channel for pausing~");
    }
  },
};
