const { SlashCommandBuilder } = require("discord.js");
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const play = require("play-dl");

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
    console.log(musicParam);
    // checking if the user is in a voice channel or not
    if (interaction.isChatInputCommand() && !interaction.member.voice.channel)
      return await interaction.reply("Please jump into a voice channel~");

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    let yt_info = await play.search(musicParam, {
      limit: 1,
    });

    let stream = await play.stream(yt_info[0].url);

    let resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    let player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });

    player.play(resource);

    connection.subscribe(player);

    await interaction.reply("received!");
  },
};
