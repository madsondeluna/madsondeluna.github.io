"""
Gera localmente todas as figuras do guia de PyMOL.

Curso de Bioinformatica Basica, 18 a 20 de agosto de 2026
Madson Allan de Luna Aragao, PhD Student in Bioinformatics @ UFMG

Uso:
    pymol -cq gerar_figuras_aula.py

No macOS, se o comando "pymol" nao estiver no PATH:
    /Applications/PyMOL.app/Contents/bin/pymol -cq gerar_figuras_aula.py

As imagens sao gravadas em ./figuras_pymol/ com os mesmos nomes usados no guia.
Requer conexao de rede apenas na primeira execucao, para o fetch do PDB 1HPV.
"""

import os
from pymol import cmd, util, preset

# ---------------------------------------------------------------------------
# Configuracao
# ---------------------------------------------------------------------------
OUT = os.path.join(os.getcwd(), "figuras_pymol")
os.makedirs(OUT, exist_ok=True)

PDB = "1hpv"          # protease do HIV-1 com amprenavir
W, H = 1200, 900      # resolucao das figuras principais
WS, HS = 1000, 780    # resolucao dos paineis comparativos
DPI = 300

# Escala de hidropatia de Kyte-Doolittle, usada na secao 8
KD = {"ILE": 4.5, "VAL": 4.2, "LEU": 3.8, "PHE": 2.8, "CYS": 2.5, "MET": 1.9,
      "ALA": 1.8, "GLY": -0.4, "THR": -0.7, "SER": -0.8, "TRP": -0.9,
      "TYR": -1.3, "PRO": -1.6, "HIS": -3.2, "GLU": -3.5, "GLN": -3.5,
      "ASP": -3.5, "ASN": -3.5, "LYS": -3.9, "ARG": -4.5}


def base():
    """Reinicia a sessao e aplica o mesmo conjunto de settings a todas as figuras.

    Reiniciar antes de cada figura evita que um setting de um bloco anterior
    contamine o proximo, que e a causa mais comum de figuras inconsistentes
    dentro de uma mesma serie.
    """
    cmd.reinitialize()
    cmd.set("fetch_path", OUT)          # cache local, evita rebaixar a cada figura
    cmd.fetch(PDB, "hiv", async_=0)
    cmd.remove("solvent")               # aguas cristalograficas fora das figuras
    cmd.bg_color("white")
    for k, v in [("ray_opaque_background", 1), ("orthoscopic", 1), ("ray_shadows", 0),
                 ("depth_cue", 0), ("antialias", 2), ("specular", 0.15),
                 ("ambient", 0.30), ("direct", 0.60), ("reflect", 0.30),
                 ("surface_quality", 1), ("two_sided_lighting", 1),
                 ("cartoon_fancy_helices", 1), ("cartoon_smooth_loops", 1)]:
        cmd.set(k, v)
    cmd.hide("everything")


def shot(nome, w=W, h=H):
    cmd.png(os.path.join(OUT, nome + ".png"), width=w, height=h, dpi=DPI, ray=1)
    print("gravado:", nome)


# ---------------------------------------------------------------------------
# Duas cameras fixas reutilizadas em toda a serie.
# Fixar a camera e o que torna as figuras comparaveis entre si.
# ---------------------------------------------------------------------------
base()
cmd.show("cartoon", "polymer")
cmd.orient("polymer")
cmd.turn("x", -20)
VIEW = cmd.get_view()          # visao global do dimero

base()
cmd.show("sticks", "organic")
cmd.orient("organic")
cmd.zoom("organic", 6)
cmd.turn("x", -10)
VLIG = cmd.get_view()          # visao aproximada do sitio ativo


# ---------------------------------------------------------------------------
# Secao 3: unidade assimetrica contra montagem biologica
# ---------------------------------------------------------------------------
base()
cmd.show("cartoon", "polymer and chain A")
cmd.color("skyblue", "chain A")
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VIEW); shot("20_asu", WS, HS)

base()
cmd.show("cartoon", "polymer"); util.cbc()
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VIEW); shot("21_assembly", WS, HS)


# ---------------------------------------------------------------------------
# Secao 4: efeito de orient, margem de zoom, frente e verso
# ---------------------------------------------------------------------------
base()
cmd.show("cartoon", "polymer"); util.cbc()
cmd.zoom("polymer")
cmd.turn("x", 62); cmd.turn("y", -48)      # orientacao arbitraria, sem orient
shot("22_sem_orient", WS, HS)

base()
cmd.show("cartoon", "polymer"); util.cbc()
cmd.orient("polymer")
shot("23_com_orient", WS, HS)

for tag, buf in [("24_zoom2", 2), ("25_zoom12", 12)]:
    base()
    cmd.show("cartoon", "polymer"); cmd.color("grey80", "polymer")
    cmd.show("sticks", "organic"); util.cbay("organic")
    cmd.orient("organic"); cmd.zoom("organic", buf)
    shot(tag, WS, HS)

base()
cmd.show("surface", "polymer"); cmd.color("white", "polymer")
cmd.color("firebrick", "resn ASP+GLU"); cmd.color("marine", "resn ARG+LYS")
cmd.set_view(VIEW); shot("26_frente", WS, HS)
cmd.turn("y", 180); shot("27_verso", WS, HS)      # mesma cena girada 180 graus


# ---------------------------------------------------------------------------
# Secao 5: efeito de byres na selecao por distancia
# ---------------------------------------------------------------------------
base()
cmd.show("cartoon", "polymer"); cmd.set("cartoon_transparency", 0.85)
cmd.color("grey70", "polymer")
cmd.show("sticks", "polymer within 5 of organic")   # sem byres, cadeias cortadas
util.cbaw("polymer"); cmd.color("grey40", "polymer and elem C")
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VLIG); shot("28_sem_byres", WS, HS)

base()
cmd.show("cartoon", "polymer"); cmd.set("cartoon_transparency", 0.85)
cmd.color("grey70", "polymer"); cmd.set("cartoon_side_chain_helper", 1)
cmd.show("sticks", "byres (polymer within 5 of organic) and not hydro")
util.cbaw("polymer"); cmd.color("grey40", "polymer and elem C")
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VLIG); shot("29_com_byres", WS, HS)


# ---------------------------------------------------------------------------
# Secao 6: representacoes, side_chain_helper, raio da sonda, contorno, preset
# ---------------------------------------------------------------------------
def painel(tag, fn):
    """Renderiza um painel do sitio ativo em uma representacao diferente.

    A selecao viz e a vizinhanca do ligante; restringir a renderizacao a ela
    deixa a figura mais limpa e muito mais rapida que a proteina inteira.
    """
    base()
    cmd.select("viz", "byres (polymer within 8 of organic)"); cmd.deselect()
    fn()
    cmd.set_view(VLIG)
    shot(tag, WS, HS)

painel("03_lines", lambda: (
    cmd.show("lines", "viz"), cmd.color("grey50", "viz and elem C"),
    cmd.show("sticks", "organic"), util.cbay("organic"), cmd.set("line_width", 1.6)))

painel("04_sticks", lambda: (
    cmd.show("sticks", "viz and not hydro"), util.cbaw("viz"),
    cmd.color("grey45", "viz and elem C"),
    cmd.show("sticks", "organic"), util.cbay("organic")))

painel("05_spheres", lambda: (
    cmd.show("spheres", "viz"), util.cbaw("viz"),
    cmd.color("grey70", "viz and elem C"),
    cmd.show("spheres", "organic"), util.cbay("organic")))

painel("06_surface", lambda: (
    cmd.show("surface", "viz"), cmd.color("grey80", "viz"),
    cmd.show("sticks", "organic"), util.cbay("organic")))

# cartoon_side_chain_helper desligado e ligado, mesma cena
base()
cmd.set("cartoon_side_chain_helper", 0)
cmd.show("cartoon", "polymer"); cmd.color("skyblue", "polymer")
cmd.show("sticks", "byres (polymer within 4.5 of organic) and not hydro")
util.cbaw("polymer"); cmd.color("grey40", "polymer and elem C")
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VLIG); shot("30_helper_off", WS, HS)
cmd.set("cartoon_side_chain_helper", 1); cmd.rebuild()
shot("31_helper_on", WS, HS)

# raio da sonda de solvente: 1.4 A (agua) contra 5.0 A
base()
cmd.set("solvent_radius", 1.4)
cmd.show("surface", "polymer"); cmd.color("palecyan", "polymer")
cmd.rebuild(); cmd.set_view(VIEW); shot("32_probe14", WS, HS)
cmd.set("solvent_radius", 5.0); cmd.rebuild(); shot("33_probe50", WS, HS)

# contorno tipo desenho tecnico
base()
cmd.show("cartoon", "polymer"); util.cbc()
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set("ray_trace_mode", 1); cmd.set("ray_trace_color", "black")
cmd.set_view(VIEW); shot("34_raytrace")

base()
cmd.show("cartoon", "polymer")
preset.publication("hiv")
cmd.set_view(VIEW); shot("40_preset")


# ---------------------------------------------------------------------------
# Secao 7: spectrum sem e com limites explicitos
# ---------------------------------------------------------------------------
base()
cmd.create("cA", "polymer and chain A")
cmd.create("cB", "polymer and chain B")
cmd.delete("hiv")
cmd.show("cartoon", "cA or cB")
cmd.spectrum("b", "blue_white_red", "cA and name CA")     # normalizado por objeto
cmd.spectrum("b", "blue_white_red", "cB and name CA")
cmd.set_view(VIEW); shot("35_spectrum_auto", WS, HS)
cmd.spectrum("b", "blue_white_red", "cA and name CA", 15, 45)   # escala comum
cmd.spectrum("b", "blue_white_red", "cB and name CA", 15, 45)
shot("36_spectrum_fixo", WS, HS)

base()
cmd.show("cartoon", "polymer"); util.cbc()
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VIEW); shot("01_chains")

base()
cmd.show("cartoon", "polymer")
cmd.spectrum("count", "rainbow", "polymer and name CA")   # gradiente N para C
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VIEW); shot("02_rainbow")


# ---------------------------------------------------------------------------
# Secao 8: hidrofobicidade
# ---------------------------------------------------------------------------
base()
cmd.select("apolar", "resn ALA+VAL+ILE+LEU+MET+PHE+TRP+PRO+GLY+CYS")
cmd.select("polar", "resn SER+THR+ASN+GLN+TYR+HIS")
cmd.select("acido", "resn ASP+GLU")
cmd.select("basico", "resn ARG+LYS")
cmd.show("surface", "polymer")
cmd.color("grey90", "polymer"); cmd.color("orange", "apolar")
cmd.color("palecyan", "polar"); cmd.color("firebrick", "acido")
cmd.color("marine", "basico")
cmd.deselect(); cmd.set_view(VIEW); shot("07_classes")

# escala continua gravada no campo B
base()
cmd.alter("polymer", "b=0.0")
for resn, val in KD.items():
    cmd.alter(f"polymer and resn {resn}", f"b={val}")
cmd.rebuild()
cmd.show("surface", "polymer")
cmd.spectrum("b", "blue_white_orange", "polymer", -4.5, 4.5)   # limites simetricos
cmd.set_view(VIEW); shot("08_kd")

# fatia mostrando o nucleo apolar
base()
cmd.show("surface", "polymer"); cmd.set("transparency", 0.3)
cmd.color("grey90", "polymer")
cmd.color("orange", "resn ALA+VAL+ILE+LEU+MET+PHE+TRP+PRO+CYS")
cmd.show("sticks", "resn ALA+VAL+ILE+LEU+MET+PHE+TRP+CYS and sidechain and not hydro")
cmd.set_view(VIEW); cmd.clip("slab", 14); shot("12_slab")


# ---------------------------------------------------------------------------
# Secao 9: carga formal, potencial eletrostatico, pontes salinas
# ---------------------------------------------------------------------------
base()
cmd.show("surface", "polymer"); cmd.color("white", "polymer")
cmd.color("firebrick", "resn ASP+GLU"); cmd.color("marine", "resn ARG+LYS")
cmd.color("palecyan", "resn HIS")
cmd.set_view(VIEW); shot("09_carga")

base()
cmd.create("prot", "polymer")
util.protein_vacuum_esp("prot", mode=2, quiet=1)
# a superficie fica em prot_e_chg; prot_e_pot e a rampa, recriada com limites fixos
cmd.ramp_new("prot_e_pot", "prot_e_map", [-15, 0, 15], ["red", "white", "blue"])
cmd.set("surface_color", "prot_e_pot", "prot_e_chg")
cmd.delete("hiv"); cmd.disable("prot"); cmd.disable("prot_e_pot")
cmd.set_view(VIEW); shot("10_esp")

base()
cmd.show("cartoon", "polymer"); cmd.set("cartoon_transparency", 0.8)
cmd.color("grey70", "polymer"); cmd.set("cartoon_side_chain_helper", 1)
cmd.select("ps", "byres ((resn ASP+GLU and name OD1+OD2+OE1+OE2) within 4 of "
                 "(resn ARG+LYS and name NH1+NH2+NE+NZ))")
cmd.show("sticks", "ps and sidechain and not hydro"); util.cbaw("ps")
cmd.color("firebrick", "ps and resn ASP+GLU and elem C")
cmd.color("marine", "ps and resn ARG+LYS and elem C")
cmd.distance("sal", "(resn ASP+GLU and name OD1+OD2+OE1+OE2)",
                    "(resn ARG+LYS and name NH1+NH2+NE+NZ)", 4.0)
cmd.hide("labels", "sal")
cmd.set("dash_color", "black"); cmd.set("dash_width", 3.5)
cmd.deselect(); cmd.set_view(VIEW); shot("37_ponte_salina")


# ---------------------------------------------------------------------------
# Secao 10: SASA relativa por residuo
# ---------------------------------------------------------------------------
base()
cmd.set("dot_solvent", 1); cmd.set("dot_density", 3)
rel = cmd.get_sasa_relative("hiv")
for (obj, segi, chain, resi), val in rel.items():
    # macro no formato /objeto/segi/cadeia/residuo; barras fora de ordem falham
    cmd.alter(f"/{obj}/{segi}/{chain}/{resi}", f"b={val}")
cmd.rebuild()
cmd.show("surface", "polymer")
cmd.spectrum("b", "white_red", "polymer", 0.0, 1.0)
cmd.set_view(VIEW); shot("11_sasa")


# ---------------------------------------------------------------------------
# Secao 11: bolso de ligacao, ligacoes de hidrogenio, interface, cavidades
# ---------------------------------------------------------------------------
base()
cmd.show("surface", "byres (polymer within 9 of organic)")
cmd.color("grey85", "polymer")
cmd.color("orange", "byres (polymer within 9 of organic) and "
                    "resn ALA+VAL+ILE+LEU+MET+PHE+TRP+PRO+CYS")
cmd.set("transparency", 0.1)
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VLIG); shot("13_bolso")

base()
cmd.show("cartoon", "polymer"); cmd.set("cartoon_transparency", 0.85)
cmd.color("grey70", "polymer"); cmd.set("cartoon_side_chain_helper", 1)
cmd.show("sticks", "byres (polymer within 4.2 of organic) and sidechain and not hydro")
util.cbaw("polymer"); cmd.color("grey35", "polymer and elem C")
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.distance("hb", "polymer", "organic", 3.5, mode=2)   # criterio de ligacao de H
cmd.hide("labels", "hb")
cmd.set("dash_color", "black"); cmd.set("dash_width", 3.5); cmd.set("dash_radius", 0.04)
cmd.set_view(VLIG); shot("14_hbond")

base()
cmd.show("cartoon", "polymer"); cmd.set("cartoon_transparency", 0.7)
cmd.color("palecyan", "chain A"); cmd.color("wheat", "chain B")
cmd.show("sticks", "byres (chain A within 4.5 of chain B) and sidechain and not hydro")
cmd.show("sticks", "byres (chain B within 4.5 of chain A) and sidechain and not hydro")
util.cbac("byres (chain A within 4.5 of chain B) and chain A")
util.cbay("byres (chain B within 4.5 of chain A) and chain B")
cmd.set_view(VIEW); shot("17_interface")

base()
cmd.set("surface_cavity_mode", 1)
cmd.set("surface_cavity_radius", 5)
cmd.set("surface_cavity_cutoff", -5)
cmd.show("surface", "polymer"); cmd.color("skyblue", "polymer")
cmd.show("cartoon", "polymer"); cmd.set("cartoon_transparency", 0.82)
cmd.set("cartoon_color", "grey60")
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.rebuild(); cmd.set_view(VIEW); shot("15_cavidade")

base()
cmd.show("surface", "polymer"); cmd.set("transparency", 0.55)
cmd.color("grey90", "polymer")
cmd.show("cartoon", "polymer")
cmd.spectrum("count", "rainbow", "polymer and name CA")
cmd.show("sticks", "organic"); util.cbay("organic")
cmd.set_view(VIEW); shot("18_combo")


# ---------------------------------------------------------------------------
# Secao 12: avaliacao de modelos
# ---------------------------------------------------------------------------
# putty codifica o B-factor na espessura do tubo alem da cor
base()
cmd.show("cartoon", "polymer"); cmd.cartoon("putty", "polymer")
cmd.set("cartoon_putty_scale_min", 0.5)
cmd.set("cartoon_putty_scale_max", 4.0)
cmd.set("cartoon_putty_transform", 0)
cmd.spectrum("b", "blue_white_red", "polymer and name CA")
cmd.rebuild(); cmd.set_view(VIEW); shot("16_putty")

# faixas de confianca no estilo AlphaFold, ilustradas sobre B normalizado
base()
bs = []
cmd.iterate("polymer and name CA", "bs.append(b)", space={"bs": bs})
lo, hi = min(bs), max(bs)
cmd.alter("polymer", f"b=100.0*(b-{lo})/({hi}-{lo})")
cmd.rebuild()
cmd.show("cartoon", "polymer")
cmd.color("grey60", "polymer")
cmd.color("orange", "polymer and b < 50")
cmd.color("yellow", "polymer and b > 50 and b < 70")
cmd.color("skyblue", "polymer and b > 70 and b < 90")
cmd.color("blue", "polymer and b > 90")
cmd.set_view(VIEW); shot("38_plddt")

# desvio por residuo: cadeia B superposta a cadeia A, duas copias identicas
base()
cmd.create("ref", "polymer and chain A")
cmd.create("mod", "polymer and chain B")
cmd.delete("hiv")
cmd.align("mod", "ref")
for at in cmd.get_model("mod and name CA").atom:
    sel_ref = f"ref//A/{at.resi}/CA"
    if cmd.count_atoms(sel_ref) == 1:
        d = cmd.get_distance(f"mod//B/{at.resi}/CA", sel_ref)
        cmd.alter(f"mod//B/{at.resi}/", f"b={d}")
cmd.rebuild()
cmd.hide("everything"); cmd.show("cartoon", "mod")
cmd.spectrum("b", "white_red", "mod and polymer", 0.0, 2.0)
cmd.orient("mod"); shot("39_desvio")

print("\nConcluido. Figuras em:", OUT)
