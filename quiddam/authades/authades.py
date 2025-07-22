import os
import random
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True  # permite ler o conteúdo das mensagens

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.command()
async def teste(ctx, n: int = 1):
    rolls = [random.randint(1, 10) for _ in range(n)]
    hits = sum(d-7 for d in rolls if d >= 8)
    await ctx.send(f'🎲 Rolagem: {n}d10\n🎯 Resultados: {rolls}\n✅ Acertos: {hits}')

bot.run(os.getenv("DISCORD_TOKEN"))