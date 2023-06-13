const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume playing music"),

  async execute(interaction) {
    // Check if the bot is in a voice channel or not
    const connection = getVoiceConnection(interaction.guildId);
    if (typeof connection === "undefined") {
      return await interaction.reply("Can't resume if I'm not playing~");
    }
    const player = connection.state.subscription.player;
    // Users can pause playing only if they are in the same channel with the bot
    if (
      connection.joinConfig.channelId === interaction.member.voice.channel.id
    ) {
      player.unpause();
      await interaction.reply("Resumed!");
    } else {
      await interaction.reply(
        "We have to be in the same channel for unpausing~"
      );
    }
  },
};
