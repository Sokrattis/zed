import random
import discord
from discord.ext import commands


bot = commands.Bot(command_prefix='!')


@bot.command()
async def teste(ctx, n: int = 1):
    # rola n dados de 1 a 10
    rolls = [random.randint(1, 10) for _ in range(n)]
    # soma 1 ponto em cada 8, 2 em 9 e 3 em 10
    hits = sum(d - 7 for d in rolls if d >= 8)
    await ctx.send(f'🎲 Rolagem: {n}d10\n🎯 Resultados: {rolls}\n✅ Acertos: {hits}')


bot.run('os.getenv('DISCORD_TOKEN')')