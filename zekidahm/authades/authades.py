import os
import random
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True  # permite ler o conteúdo das mensagens

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.command()
async def teste(ctx, arg=None):
    # validação: só aceita inteiros de 1 a 9
    try:
        n = int(arg) if arg is not None else 1
    except (TypeError, ValueError):
        await ctx.send("Por favor use `!teste N` onde N é um número inteiro de 1 a 9.")
        return
    if not 1 <= n <= 9:
        await ctx.send("Por favor use `!teste N` onde N é um número inteiro de 1 a 9.")
        return

    # rola os dados
    rolls = [random.randint(1, 10) for _ in range(n)]
    # formata cada resultado com 🔆 para acertos
    parts = []
    for d in rolls:
        hits = max(d - 7, 0)
        parts.append(f"{d} {'🔆' * hits}".strip())
    joined = ", ".join(parts)

    # monta e envia a mensagem
    timestamp = ctx.message.created_at.strftime("%H:%M:%S")
    user = ctx.author.name
    await ctx.send(f"{joined}")

token = os.getenv("DISCORD_TOKEN")
bot.run(token)