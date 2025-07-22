import os
import random
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True  # permite ler o conteúdo das mensagens

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.command()
async def teste(ctx, n: int = 1):
    # rola os dados
    rolls = [random.randint(1, 10) for _ in range(n)]
    # monta cada peça: valor + tantos 🔆 quantos os acertos (8=1, 9=2, 10=3)
    parts = []
    for d in rolls:
        hits = max(d - 7, 0)
        parts.append(f"{d} {'🔆' * hits}".strip())
    joined = ", ".join(parts)
    # pega horário e usuário
    timestamp = ctx.message.created_at.strftime("%H:%M:%S")
    user = ctx.author.name
    # envia no formato desejado
    await ctx.send(f"\n➝ Resultado de {n} dados:  {joined}")

token = os.getenv("DISCORD_TOKEN")
bot.run(token)