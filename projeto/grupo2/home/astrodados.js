const astroDados = {
    mercurio: `Mercúrio
Dados Físicos
tipo: Planeta Rochoso
localização: 1º planeta
órbita: Sol
diâmetro: 4.880 km
massa: 3,285 x 10²³ kg
gravidade: 3,7 m/s²
dia: 59 dias
ano: 88 dias
luas: 0
anéis: não


Ambiente
temperatura: ±167ºC
atmosfera: traços de O₂, Na, H₂, He, K
pressão: ~0 hPa
água: não
atividade geológica: antiga
magnetismo: fraco
exploração: sobrevoo
destaque: mais próximo do Sol, dia longo`,

    venus: `Vênus
Dados Físicos
tipo: Planeta Rochoso
localização: 2º planeta
órbita: Sol
diâmetro: 12.104 km
massa: 4,867 x 10²⁴ kg
gravidade: 8,87 m/s²
dia: 243 dias
ano: 225 dias
luas: 0
anéis: não


Ambiente
temperatura: ±464ºC
atmosfera: CO₂, N₂
pressão: ~9.200 hPa
água: não
atividade geológica: vulcões
magnetismo: fraco
exploração: pouso
destaque: mais quente, rotação retrógrada`,

    terra: `Terra
Dados Físicos
tipo: Planeta Rochoso
localização: 3º planeta
órbita: Sol
diâmetro: 12.742 km
massa: 5,972 x 10²⁴ kg
gravidade: 9,8 m/s²
rotação: 24h
translação: 365 dias
luas: 1
anéis: não

Ambiente
temperatura: ±15ºC
atmosfera: N₂, O₂, Ar
pressão: ~1.013 hPa
água: líquida, gelo, vapor
atividade geológica: intensa
magnetismo: forte
exploração: humana
destaque: vida, água líquida`,

    marte: `Marte
Dados Físicos
tipo: Planeta Rochoso
localização: 4º planeta
órbita: Sol
diâmetro: 6.792 km
massa: 6,417 x 10²³ kg
gravidade: 3,71 m/s²
dia: 24h 37min
ano: 687 dias
luas: 2
anéis: não


Ambiente
temperatura: ±-63ºC
atmosfera: CO₂, N₂, Ar
pressão: ~6 hPa
água: gelo
atividade geológica: sim
magnetismo: local
exploração: robótica
destaque: vulcão/cânion gigante`,

    jupiter: `Júpiter
Dados Físicos
tipo: Planeta Gasoso
localização: 5º planeta
órbita: Sol
diâmetro: 139.820 km
massa: 1,898 x 10²⁷ kg
gravidade: 24,79 m/s²
dia: 9h 56min
ano: 11,9 anos
luas: 79
anéis: tênues


Ambiente
temperatura: ±-108ºC
atmosfera: H₂, He
pressão: muito alta
água: vapor
atividade geológica: núcleo possível
magnetismo: muito forte
exploração: sobrevoo
destaque: maior planeta, mancha vermelha`,

    saturno: `Saturno
Dados Físicos
tipo: Planeta Gasoso
localização: 6º planeta
órbita: Sol
diâmetro: 116.460 km
massa: 5,683 x 10²⁶ kg
gravidade: 10,44 m/s²
dia: 10h 42min
ano: 29,5 anos
luas: 83
anéis: sim


Ambiente
temperatura: ±-139ºC
atmosfera: H₂, He
pressão: muito alta
água: vapor
atividade geológica: núcleo possível
magnetismo: forte
exploração: sobrevoo
destaque: anéis visíveis, baixa densidade`,

    urano: `Urano
Dados Físicos
tipo: Planeta Gasoso
localização: 7º planeta
órbita: Sol
diâmetro: 50.724 km
massa: 8,681 x 10²⁵ kg
gravidade: 8,87 m/s²
dia: 17h 14min
ano: 84 anos
luas: 27
anéis: sim


Ambiente
temperatura: ±-197ºC
atmosfera: H₂, He, CH₄
pressão: muito alta
água: gelo (profundo)
atividade geológica: possível
magnetismo: inclinado
exploração: sobrevoo
destaque: rotação lateral, azul claro`,

    netuno: `Netuno
Dados Físicos
tipo: Planeta Gasoso
localização: 8º planeta
órbita: Sol
diâmetro: 49.244 km
massa: 1,024 x 10²⁶ kg
gravidade: 11,15 m/s²
dia: 16h 6min
ano: 164,8 anos
luas: 14
anéis: sim


Ambiente
temperatura: ±-201ºC
atmosfera: H₂, He, CH₄
pressão: muito alta
água: gelo (profundo)
atividade geológica: possível
magnetismo: inclinado
exploração: sobrevoo
destaque: ventos rápidos, azul escuro`,

    sol: `Sol
Dados Físicos
tipo: Estrela
localização: centro
diâmetro: 1.391.000 km
massa: 1,989 x 10³⁰ kg
gravidade: 274 m/s²
rotação: 25-36 dias
translação: ~230 milhões de anos (ano galáctico)

Ambiente
temperatura: ±5.500ºC
atmosfera: H, He
pressão: altíssima
água: plasma
atividade geológica: não
magnetismo: intenso
exploração: sondas
destaque: energia, maior do sistema`,

    lua: `Lua
Dados Físicos
tipo: Satélite Natural
localização: órbita da Terra
diâmetro: 3.474 km
massa: 7,35 x 10²² kg
gravidade: 1,62 m/s²
rotação: 27,3 dias
translação: 27,3 dias

Ambiente
temperatura: ±-20ºC a 120ºC
atmosfera: tênue
pressão: ~0 hPa
água: gelo (polos)
atividade geológica: antiga
magnetismo: local
exploração: humana
destaque: visitada por humanos`,

    fobos: `Fobos
Dados Físicos
tipo: Satélite Natural
localização: órbita de Marte
diâmetro: 22,2 km
massa: 1,07 x 10¹⁶ kg
gravidade: 0,0057 m/s²
rotação: 7h 39min
translação: 7h 39min

Ambiente
temperatura: ±-40ºC a -112ºC
atmosfera: não
pressão: ~0 hPa
água: não
atividade geológica: crateras
magnetismo: não
exploração: sobrevoo
destaque: lua mais próxima de Marte`,

    deimos: `Deimos
Dados Físicos
tipo: Satélite Natural
localização: órbita de Marte
diâmetro: 12,4 km
massa: 1,48 x 10¹⁵ kg
gravidade: 0,003 m/s²
rotação: 30h 18min
translação: 30h 18min

Ambiente
temperatura: ±-40ºC a -112ºC
atmosfera: não
pressão: ~0 hPa
água: não
atividade geológica: crateras
magnetismo: não
exploração: sobrevoo
destaque: menor lua de Marte`,

    io: `Io
Dados Físicos
tipo: Satélite Natural
localização: órbita de Júpiter
diâmetro: 3.643 km
massa: 8,93 x 10²² kg
gravidade: 1,79 m/s²
rotação: 1,77 dias
translação: 1,77 dias

Ambiente
temperatura: ±-143ºC
atmosfera: SO₂
pressão: muito baixa
água: não
atividade geológica: vulcânica intensa
magnetismo: não
exploração: sobrevoo
destaque: mais vulcânica`,

    europa: `Europa
Dados Físicos
tipo: Satélite Natural
localização: órbita de Júpiter
diâmetro: 3.122 km
massa: 4,8 x 10²² kg
gravidade: 1,31 m/s²
rotação: 3,55 dias
translação: 3,55 dias

Ambiente
temperatura: ±-160ºC
atmosfera: O₂ tênue
pressão: muito baixa
água: gelo, oceano (sub)
atividade geológica: gelo ativo
magnetismo: induzido
exploração: sobrevoo
destaque: oceano subterrâneo`,

    ganymedes: `Ganimedes
Dados Físicos
tipo: Satélite Natural
localização: órbita de Júpiter
diâmetro: 5.268 km
massa: 1,48 x 10²³ kg
gravidade: 1,43 m/s²
rotação: 7,15 dias
translação: 7,15 dias

Ambiente
temperatura: ±-163ºC
atmosfera: O₂ tênue
pressão: muito baixa
água: gelo
atividade geológica: antiga
magnetismo: próprio
exploração: sobrevoo
destaque: maior lua do sistema`,

    calisto: `Calisto
Dados Físicos
tipo: Satélite Natural
localização: órbita de Júpiter
diâmetro: 4.821 km
massa: 1,08 x 10²³ kg
gravidade: 1,24 m/s²
rotação: 16,7 dias
translação: 16,7 dias

Ambiente
temperatura: ±-139ºC
atmosfera: CO₂ tênue
pressão: muito baixa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: mais craterada`,

    mimas: `Mimas
Dados Físicos
tipo: Satélite Natural
localização: órbita de Saturno
diâmetro: 396 km
massa: 3,75 x 10¹⁹ kg
gravidade: 0,064 m/s²
rotação: 0,94 dias
translação: 0,94 dias

Ambiente
temperatura: ±-200ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: crateras
magnetismo: não
exploração: sobrevoo
destaque: cratera Herschel`,

    encelado: `Encélado
Dados Físicos
tipo: Satélite Natural
localização: órbita de Saturno
diâmetro: 504 km
massa: 1,08 x 10²⁰ kg
gravidade: 0,113 m/s²
rotação: 1,37 dias
translação: 1,37 dias

Ambiente
temperatura: ±-201ºC
atmosfera: vapor d'água tênue
pressão: muito baixa
água: gelo, jatos
atividade geológica: ativa
magnetismo: não
exploração: sobrevoo
destaque: jatos de água, oceano interno`,

    tetis: `Tétis
Dados Físicos
tipo: Satélite Natural
localização: órbita de Saturno
diâmetro: 1.062 km
massa: 6,17 x 10²⁰ kg
gravidade: 0,145 m/s²
rotação: 1,89 dias
translação: 1,89 dias

Ambiente
temperatura: ±-187ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: cânion Ithaca Chasma`,

    dione: `Dione
Dados Físicos
tipo: Satélite Natural
localização: órbita de Saturno
diâmetro: 1.123 km
massa: 1,1 x 10²¹ kg
gravidade: 0,232 m/s²
rotação: 2,74 dias
translação: 2,74 dias

Ambiente
temperatura: ±-186ºC
atmosfera: O₂ tênue
pressão: muito baixa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: superfície brilhante`,

    reia: `Reia
Dados Físicos
tipo: Satélite Natural
localização: órbita de Saturno
diâmetro: 1.527 km
massa: 2,31 x 10²¹ kg
gravidade: 0,264 m/s²
rotação: 4,52 dias
translação: 4,52 dias

Ambiente
temperatura: ±-174ºC
atmosfera: O₂, CO₂ tênue
pressão: muito baixa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: possível anel tênue`,

    tita: `Titã
Dados Físicos
tipo: Satélite Natural
localização: órbita de Saturno
diâmetro: 5.151 km
massa: 1,35 x 10²³ kg
gravidade: 1,35 m/s²
rotação: 15,9 dias
translação: 15,9 dias

Ambiente
temperatura: ±-179ºC
atmosfera: N₂, CH₄ densa
pressão: ~1.500 hPa
água: gelo, lagos de metano
atividade geológica: ativa
magnetismo: não
exploração: pouso
destaque: atmosfera densa, lagos de metano`,

    japeto: `Japeto
Dados Físicos
tipo: Satélite Natural
localização: órbita de Saturno
diâmetro: 1.471 km
massa: 1,81 x 10²¹ kg
gravidade: 0,223 m/s²
rotação: 79,3 dias
translação: 79,3 dias

Ambiente
temperatura: ±-143ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: claro/escuro`,

    miranda: `Miranda
Dados Físicos
tipo: Satélite Natural
localização: órbita de Urano
diâmetro: 471 km
massa: 6,59 x 10¹⁹ kg
gravidade: 0,079 m/s²
rotação: 1,41 dias
translação: 1,41 dias

Ambiente
temperatura: ±-187ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: terreno caótico`,

    ariel: `Ariel
Dados Físicos
tipo: Satélite Natural
localização: órbita de Urano
diâmetro: 1.158 km
massa: 1,35 x 10²¹ kg
gravidade: 0,269 m/s²
rotação: 2,52 dias
translação: 2,52 dias

Ambiente
temperatura: ±-213ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: cânions e vales`,

    umbriel: `Umbriel
Dados Físicos
tipo: Satélite Natural
localização: órbita de Urano
diâmetro: 1.169 km
massa: 1,17 x 10²¹ kg
gravidade: 0,238 m/s²
rotação: 4,14 dias
translação: 4,14 dias

Ambiente
temperatura: ±-214ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: superfície escura`,

    titania: `Titânia
Dados Físicos
tipo: Satélite Natural
localização: órbita de Urano
diâmetro: 1.578 km
massa: 3,53 x 10²¹ kg
gravidade: 0,379 m/s²
rotação: 8,71 dias
translação: 8,71 dias

Ambiente
temperatura: ±-203ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: maior lua de Urano`,

    oberon: `Oberon
Dados Físicos
tipo: Satélite Natural
localização: órbita de Urano
diâmetro: 1.523 km
massa: 3,01 x 10²¹ kg
gravidade: 0,346 m/s²
rotação: 13,5 dias
translação: 13,5 dias

Ambiente
temperatura: ±-203ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: crateras grandes`,

    tritao: `Tritão
Dados Físicos
tipo: Satélite Natural
localização: órbita de Netuno
diâmetro: 2.710 km
massa: 2,14 x 10²² kg
gravidade: 0,779 m/s²
rotação: 5,88 dias
translação: 5,88 dias

Ambiente
temperatura: ±-235ºC
atmosfera: N₂, CH₄ tênue
pressão: muito baixa
água: gelo
atividade geológica: geysers
magnetismo: não
exploração: sobrevoo
destaque: órbita retrógrada, geysers`,

    nereida: `Nereida
Dados Físicos
tipo: Satélite Natural
localização: órbita de Netuno
diâmetro: 340 km
massa: 3,1 x 10¹⁹ kg
gravidade: 0,033 m/s²
rotação: 360 dias
translação: 360 dias

Ambiente
temperatura: ±-235ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: desconhecida
magnetismo: não
exploração: sobrevoo
destaque: órbita excêntrica`,

    plutao: `Plutão
Dados Físicos
tipo: Planeta Anão
localização: Cinturão de Kuiper
diâmetro: 2.377 km
massa: 1,31 x 10²² kg
gravidade: 0,62 m/s²
dia: 6,4 dias
ano: 248 anos
luas: 5
anéis: não

Ambiente
temperatura: ±-229ºC
atmosfera: N₂, CH₄, CO tênue
pressão: muito baixa
água: gelo
atividade geológica: criovulcões
magnetismo: não
exploração: sobrevoo
destaque: anão, órbita excêntrica`,

    caronte: `Caronte
Dados Físicos
tipo: Satélite Natural
localização: órbita de Plutão
diâmetro: 1.212 km
massa: 1,52 x 10²¹ kg
gravidade: 0,288 m/s²
rotação: 6,4 dias
translação: 6,4 dias

Ambiente
temperatura: ±-220ºC
atmosfera: não
pressão: ~0 hPa
água: gelo
atividade geológica: antiga
magnetismo: não
exploração: sobrevoo
destaque: maior lua de Plutão`
};
