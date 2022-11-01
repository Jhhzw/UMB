import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import Command from 'structures/Command'
import { CommandType, Emoji } from 'structures/enums'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Gets bots current ping.'),
  type: CommandType.Info,
  run: async (client, interaction): Promise<void> => {
    const { user, guild, createdTimestamp } = interaction
    const member = interaction.inCachedGuild() ? interaction.member : undefined

    const embed = new EmbedBuilder()
      .setDescription('`Pinging...`')
      .setColor(
        guild?.members.me?.displayHexColor || user.hexAccentColor || null,
      )

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    })

    const heartbeat = `\`\`\`ini\n[ ${Math.round(client.ws.ping)}ms ]\`\`\``
    const latency = `\`\`\`ini\n[ ${Math.floor(
      message.createdTimestamp - createdTimestamp,
    )}ms ]\`\`\``

    embed
      .setTitle(`Pong  ${Emoji.Pong}`)
      .setDescription(null)
      .addFields(
        { name: 'Heartbeat', value: heartbeat, inline: true },
        { name: 'API Latency', value: latency, inline: true },
      )
      .setFooter({
        text: member?.displayName || user.username,
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp()
    await interaction.editReply({ embeds: [embed] })
  },
})
