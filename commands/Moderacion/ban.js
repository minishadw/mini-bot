const { CommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('xdddd')
        .addUserOption(option => option.setName('usuario').setDescription('Usuario a banear').setRequired(true))
        .addStringOption(option => option.setName('razon').setDescription('Razon')),
  /**
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction, language) {
    const usuario = interaction.options.getUser('usuario');
    const razón = interaction.options.getString('razón') || 'No especificada';

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({ content: 'No tienes permisos para banear miembros.', ephemeral: true });
    }

    try {
      await usuario.send(`Has sido baneado del servidor por la siguiente razón: ${razón}`);
      await interaction.guild.bans.create(usuario.id, { days: 0, razón });
      interaction.reply({ content: `${usuario.tag} ha sido baneado del servidor por ${razón}.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Ocurrió un error al intentar banear al usuario.', ephemeral: true });
    }
  },
};