# -*- coding: utf-8 -*-
"""
banco_central_entrada_v3.py
===========================
Fachada COMPLETA del Banco Central de Chile (Agustinas 1180, Santiago) como GEOMETRÍA PARAMÉTRICA
en metros reales, pensada para ser muestreada a nube de puntos (three.js).

v3 (respecto de la v2):
  * Escala real: la puerta de bronce mide 6,20 m de alto x 3,50 m de ancho (dato oficial del Banco).
    Con ese patrón se rectificaron las tres fotos (ortofotos) y se remidió TODO: umbral a +0,80 m
    (4 peldaños de 20 cm), pilastras de 2,05 m, bahías de 2,50 m, cornisa del portal a 8,80 m, etc.
  * Fachada de altura completa: planta baja + 2.º y 3.º piso, capiteles estilizados (collarín, campana en
    dos hileras, volutas), entablamento con la inscripción "BANCO CENTRAL DE CHILE" en relieve, cornisa
    con dentículos y antepecho con balaustrada. Remate cerrado a 22,00 m.
  * N_BAHIAS = 3 por lado -> 36,7 m de ancho: prácticamente la fachada real por calle Agustinas
    (la manzana mide ~36 m según OpenStreetMap). Con 16:9 y la fachada completa en alto se ven ~39 m.

Uso
---
  blender -b -P banco_central_entrada_v3.py                              # construye y guarda entrada_v3.blend
  blender -b -P banco_central_entrada_v3.py -- --glb entrada_v3.glb      # además exporta GLB
  blender -b -P banco_central_entrada_v3.py -- --obj entrada_v3.obj      # además exporta OBJ (triángulos, sin materiales)
  blender -b -P banco_central_entrada_v3.py -- --bahias 2 --arista 0.30 --sin-inscripcion
  blender -b -P banco_central_entrada_v3.py -- --eje Z                   # convención nativa de Blender (ver abajo)
  o pegarlo en el editor de texto de Blender y presionar "Run Script".

Convenciones (marco de diseño)
------------------------------
  * X hacia la derecha, +Y arriba, la fachada mira a +Z, centrada en X = 0, vereda en Y = 0.
  * EJE_ARRIBA = "Y": los vértices se escriben literalmente así dentro de Blender (se ve "acostado" en el
    viewport; es lo que pide el muestreador). El GLB se exporta con export_yup=False para no rotar de nuevo.
  * EJE_ARRIBA = "Z": convención nativa de Blender (Z arriba, fachada a -Y). El GLB con "+Y Up" (por defecto)
    entrega exactamente +Y arriba / fachada a +Z.
  * Todos los objetos con rotación 0 y escala 1 (nada espejado). La única ubicación no nula es la de las
    hojas, cuyo ORIGEN está en el eje de bisagras.
  * Todo triangulado, normales hacia afuera y coherentes (cada cara se emite contra su normal esperada).
  * Sólo superficies visibles: dorsos contra el muro, bases apoyadas y contactos entre piezas NO se emiten;
    el paño se recorta alrededor de todo lo que lo tapa. Superficies grandes en retícula global de MAX_ARISTA.
  * La fachada se corta en X = ±SEMI sin tapas laterales (continúa); arriba está cerrada (antepecho).

Piezas (nombres de objeto)
--------------------------
  Muro, Pilastra_L/R (las del portal), Pilastra_L2.., Capitel_L/R.., Cornisa (dintel + cornisa + ménsulas del
  portal), Jamba_L/R, Hoja_Izquierda/Derecha (origen en la bisagra), Medallon_L/R, Escalinata, Farol_L/R,
  Ventana_L1.. (planta baja: alféizar, reja, parteluz, friso con dentículos), Ventana_Alta_L1.. (todo el
  panel del 2.º y 3.º piso de la bahía), Ventana_Central (2.º y 3.º piso sobre el portal), Reja_L1..,
  Entablamento (arquitrabe, friso, cornisa con dentículos), Inscripcion, Parapeto, Vereda.
  L/R = izquierda/derecha vistos desde la calle (X<0 / X>0). El número crece hacia afuera.
"""

import bpy
import sys
import os
import time
from math import ceil, floor, cos, sin, pi, sqrt

# ═══════════════════════════════════════════════════════════════════════════════════════════
#  MEDIDAS (metros) — escala fijada por la puerta oficial de 6,20 x 3,50 m; cotas desde la vereda
# ═══════════════════════════════════════════════════════════════════════════════════════════
EJE_ARRIBA = "Y"          # "Y" (pedido) | "Z" (nativo Blender). Sobreescribible con -- --eje Z
MAX_ARISTA = 0.25         # tamaño de celda de la retícula de subdivisión (-- --arista 0.35 para aligerar)
SEGS = 16                 # segmentos de las superficies de revolución

# ---- extensión ----
N_BAHIAS = 3              # bahías de ventana por lado (1 -> 18,4 m; 2 -> 27,5 m; 3 -> 36,7 m de ancho total)

# ---- vereda / calle ----
INCLUIR_VEREDA = True
VEREDA_FONDO = 4.00       # del plano del muro al cordón
CORDON_ALTO = 0.15
CALLE_FONDO = 1.50

# ---- escalinata ----
N_PELDANOS = 4
CONTRAHUELLA = 0.20       # umbral a +0,80 m
HUELLA = 0.36
DESCANSO_FONDO = 1.30     # del plano del muro al primer peldaño
ESCALINATA_ANCHO = 6.10   # entre los pedestales de los faroles

# ---- zócalo de granito ----
ZOCALO_ALTO = 1.75
ZOCALO_RESALTE = 0.09
ZOCALO_MOLDURA = [(1.75, 1.90, 0.17), (1.90, 2.00, 0.12)]   # (y0, y1, resalte)
MURO_BASE = 2.00                                             # arranque del paño de sillería

# ---- rejas de ventilación del zócalo ----
INCLUIR_REJAS = True
REJA_ANCHO = 1.30
REJA_Y0 = 0.45
REJA_ALTO = 0.75

# ---- portal: vano y puerta ----
VANO_ANCHO = 3.50         # luz de piedra entre jambas (la "puerta de 3,5 m")
MARCO_ANCHO = 0.21        # montante fijo de bronce a cada lado -> hojas de 1,54 m cada una
VANO_ALTO = 6.20          # altura de las hojas
MARCO_RESALTE = 0.12
RETRANQUEO = 0.53         # las hojas quedan 53 cm detrás del plano del muro
HOJA_ESPESOR = 0.10
HOJA_MONTANTE = 0.18
HOJA_PANELES = [(0.75, 1.90, "leon"), (2.13, 4.52, "aldaba"), (4.85, 5.95, "roseton")]   # (v0, v1, ornamento)

# ---- jambas (pilares lisos que flanquean el vano) ----
JAMBA_ANCHO = 0.85
JAMBA_RESALTE = 0.21

# ---- dintel / cornisa / ménsulas del portal ----
DINTEL_X = 1.86                                                          # semiancho de las fajas
DINTEL_FAJAS = [(7.00, 7.22, 0.25), (7.22, 7.46, 0.30), (7.46, 7.72, 0.35)]   # (y0, y1, resalte)
CORNISA_NIVELES = [(7.72, 7.90, 0.40), (7.90, 8.40, 0.52), (8.40, 8.80, 0.72)]
MENSULA = dict(x0=1.86, x1=2.45, y0=6.15, y1=7.72, vuelo=0.49)

# ---- medallones sobre las jambas ----
MEDALLON_X = 2.175
MEDALLON_Y = 4.00
MEDALLON_R = 0.19

# ---- pilastras acanaladas de orden gigante ----
PILASTRA_SEP = 0.03       # franja de muro entre jamba y pilastra
PILASTRA_ANCHO = 2.05
PILASTRA_RESALTE = 0.385
PILASTRA_BASE = [(2.00, 2.70, 0.44), (2.70, 2.93, 0.48)]   # dado + capitel del dado (a la altura del alféizar)
ESTRIAS_N = 7
ESTRIA_ANCHO = 0.14
ESTRIA_FONDO_ANCHO = 0.08
ESTRIA_PROF = 0.06
ESTRIA_FILETE = 0.09
ESTRIAS_Y0 = 3.20
ESTRIAS_Y1 = 16.05
# capitel: (y0, y1, exceso a cada lado respecto del fuste, profundidad z)
CAPITEL = dict(y0=16.25,
               collar=(16.25, 16.42, 0.05, 0.44),
               campana1=(16.42, 16.75, 0.12, 0.50),
               campana2=(16.75, 17.05, 0.20, 0.56),
               cuello=(17.05, 17.42, 0.10, 0.45),
               voluta=(17.22, 0.20, 0.30, 0.62),            # (y centro, radio, z0, z1)
               abaco=(17.42, 17.60, 0.325, 0.66))

# ---- bahías de ventana ----
BAHIA_ANCHO = 2.50
VENTANA_MARGEN = 0.09     # de la pilastra al hueco -> hueco de 2,32 m
VENTANA_RETRANQUEO = 0.44
PARTELUZ_ANCHO = 0.10
ALFEIZAR = (2.70, 2.93, 0.14)          # planta baja (y0, y1, resalte)
VENTANA_Y1 = 7.25                      # dintel del hueco de planta baja
TRAVESANO_Y = 6.00
REJA_VENTANA = dict(y_rail=3.74, y1=3.92, paso=0.16, radio=0.014, z=-0.20)
FRISO = dict(y0=7.25, y1=8.35, resalte=0.10, dentil_y0=7.85, dentil_y1=8.13, dentil_ancho=0.09,
             dentil_paso=0.27, dentil_resalte=0.09, cap_resalte=0.20)
PISO2 = dict(alfeizar=(8.85, 9.10, 0.08), y1=11.95, travesano=10.40, dintel=(11.95, 12.85, 0.04),
             denticulos=dict(y0=12.85, y1=13.20, resalte=0.06, d_y0=12.90, d_y1=13.15, ancho=0.14, paso=0.30, d_resalte=0.10))
PISO3 = dict(alfeizar=(13.45, 13.66, 0.10), y1=16.25, travesano=15.40, retranqueo=0.50, moldura=(16.90, 17.10, 0.08),
             margen_capitel=0.25)
CENTRAL_SEMIANCHO = 1.65               # ventanas del 2.º y 3.º piso sobre el portal

# ---- entablamento y antepecho ----
ARQUITRABE = [(17.60, 17.78, 0.42), (17.78, 18.00, 0.47)]
FRISO_ENT = (18.00, 18.95, 0.40)
INCLUIR_INSCRIPCION = True
INSCRIPCION = dict(texto="BANCO CENTRAL DE CHILE", y0=18.15, alto=0.65, relieve=0.03)
CORNISA_ENT = [(18.95, 19.10, 0.50), (19.10, 19.50, 0.50), (19.50, 19.95, 0.75), (19.95, 20.35, 0.95), (20.35, 20.60, 1.05)]
DENTICULOS_ENT = dict(y0=19.14, y1=19.46, ancho=0.16, paso=0.34, resalte=0.16)   # sobre el nivel 19,10-19,50
PARAPETO = dict(y0=20.60, y1=22.00, pedestal_z=0.50, pedestal_extra=0.10,
                plinto=(20.60, 21.05, 0.42), balaustre=(21.05, 21.75, 0.12, 0.30, 0.15, 0.27), coping=(21.75, 22.00, 0.45))
ALTO_TOTAL = PARAPETO["y1"]

# ---- faroles ----
FAROL_X = 4.00
FAROL_Z = 2.10
PEDESTAL_LADO = 1.25
PEDESTAL_ALTO = 0.85
PEDESTAL_TAPA = 0.10
FAROL_ESCALA = 1.6        # escala del candelabro de bronce respecto del modelo v2
FUSTE_ALTO = 1.76

# ---- juntas de sillería (surcos horizontales en el paño) ----
INCLUIR_JUNTAS = True
JUNTAS_PASO = 0.95
JUNTA_ANCHO = 0.025
JUNTA_PROF = 0.015

# ---- salida ----
NOMBRE_COLECCION = "BancoCentral_Fachada"
ARCHIVO_BLEND = "entrada_v3.blend"     # "" para no guardar

# ═══════════════════════════════════════════════════════════════════════════════════════════
#  DERIVADAS
# ═══════════════════════════════════════════════════════════════════════════════════════════
Y_D = N_PELDANOS * CONTRAHUELLA               # cota del umbral (0,80)
A_V = VANO_ANCHO / 2                          # semiancho del vano de piedra
HOJA_ANCHO = VANO_ANCHO / 2 - MARCO_ANCHO     # ancho de cada hoja (1,54)
Y_V = Y_D + VANO_ALTO                         # dintel del vano (= base de las fajas) = 7,00
Z_P = -RETRANQUEO                             # plano de la puerta
X_J0, X_J1 = A_V, A_V + JAMBA_ANCHO           # jamba
X_P0 = X_J1 + PILASTRA_SEP                    # primera pilastra
E = ESCALINATA_ANCHO / 2
Y_MURO_TOPE = ARQUITRABE[0][0]                # el paño llega hasta el arquitrabe
IDENT = ((1, 0, 0), (0, 1, 0), (0, 0, 1))
MIRROR = ((-1, 0, 0), (0, 1, 0), (0, 0, 1))   # espejo en X: sólo para CONSTRUIR geometría (no es una transformación de objeto)
PILASTRAS, BAHIAS, SEMI, JUNTAS_Y = [], [], 0.0, []


def preparar_layout():
    """Ritmo de la fachada hacia +X (el lado -X es simétrico)."""
    global PILASTRAS, BAHIAS, SEMI, JUNTAS_Y
    PILASTRAS, BAHIAS = [], []
    x = X_P0
    for k in range(N_BAHIAS + 1):
        PILASTRAS.append((x, x + PILASTRA_ANCHO))
        x += PILASTRA_ANCHO
        if k < N_BAHIAS:
            BAHIAS.append((x, x + BAHIA_ANCHO))
            x += BAHIA_ANCHO
    SEMI = x
    JUNTAS_Y = []
    y = MURO_BASE + JUNTAS_PASO
    while y < Y_MURO_TOPE - 0.2:
        JUNTAS_Y.append(round(y, 3))
        y += JUNTAS_PASO


# ═══════════════════════════════════════════════════════════════════════════════════════════
#  ÁLGEBRA MÍNIMA
# ═══════════════════════════════════════════════════════════════════════════════════════════
def sub(a, b): return (a[0] - b[0], a[1] - b[1], a[2] - b[2])
def add(a, b): return (a[0] + b[0], a[1] + b[1], a[2] + b[2])
def mul(a, s): return (a[0] * s, a[1] * s, a[2] * s)
def dot(a, b): return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
def cross(a, b): return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])
def norm(a):
    l = sqrt(dot(a, a))
    return (a[0] / l, a[1] / l, a[2] / l) if l > 1e-12 else (0.0, 0.0, 0.0)
def dist(a, b): return sqrt(dot(sub(a, b), sub(a, b)))


def P(v):
    """Marco de diseño (X der, +Y arriba, fachada a +Z) -> coordenadas de Blender según EJE_ARRIBA."""
    x, y, z = v
    return (x, y, z) if EJE_ARRIBA == "Y" else (x, -z, y)


def reticula(lo, hi):
    """Fracciones de subdivisión de [lo, hi] sobre una retícula GLOBAL de paso MAX_ARISTA
    (caras coplanares vecinas comparten los vértices de su borde común: sin T-junctions)."""
    L = hi - lo
    if L <= MAX_ARISTA * 1.25:
        return [0.0, 1.0]
    pts = [lo]
    k = floor(lo / MAX_ARISTA) + 1
    while k * MAX_ARISTA < hi - 1e-9:
        p = k * MAX_ARISTA
        if p - lo > 0.3 * MAX_ARISTA and hi - p > 0.3 * MAX_ARISTA:
            pts.append(p)
        k += 1
    pts.append(hi)
    return [(p - lo) / L for p in pts]


# ═══════════════════════════════════════════════════════════════════════════════════════════
#  ACUMULADOR DE MALLA
# ═══════════════════════════════════════════════════════════════════════════════════════════
class Malla:
    """Acumula triángulos en el marco de diseño. Suelda vértices por posición. Cada cuadrilátero se
    emite con una normal esperada: si el orden de vértices no la respeta, se invierte."""

    def __init__(self):
        self.verts, self.tris, self._idx = [], [], {}
        self.M, self.t = IDENT, (0.0, 0.0, 0.0)

    def marco(self, M=IDENT, t=(0.0, 0.0, 0.0)):
        self.M, self.t = M, t

    def _p(self, p):
        M, t = self.M, self.t
        return (M[0][0] * p[0] + M[0][1] * p[1] + M[0][2] * p[2] + t[0],
                M[1][0] * p[0] + M[1][1] * p[1] + M[1][2] * p[2] + t[1],
                M[2][0] * p[0] + M[2][1] * p[1] + M[2][2] * p[2] + t[2])

    def _n(self, n):
        M = self.M
        return (M[0][0] * n[0] + M[0][1] * n[1] + M[0][2] * n[2],
                M[1][0] * n[0] + M[1][1] * n[1] + M[1][2] * n[2],
                M[2][0] * n[0] + M[2][1] * n[1] + M[2][2] * n[2])

    def _v(self, p):
        k = (round(p[0], 5), round(p[1], 5), round(p[2], 5))
        i = self._idx.get(k)
        if i is None:
            i = len(self.verts)
            self.verts.append(k)
            self._idx[k] = i
        return i

    def _tri_p(self, a, b, c):
        ia, ib, ic = self._v(a), self._v(b), self._v(c)
        if ia == ib or ib == ic or ia == ic:
            return
        self.tris.append((ia, ib, ic))

    def quad(self, a, b, c, d, n, sub_=True, su=None, sv=None):
        """a,b,c,d en orden cíclico; n normal esperada (marco local); su/sv fracciones de subdivisión."""
        A, B, C, D = self._p(a), self._p(b), self._p(c), self._p(d)
        N = self._n(n)
        nr = add(cross(sub(B, A), sub(C, A)), cross(sub(C, A), sub(D, A)))
        if dot(nr, N) < 0:
            B, D = D, B
            su, sv = sv, su
        if su is None:
            k = max(1, ceil(max(dist(A, B), dist(D, C)) / MAX_ARISTA)) if sub_ else 1
            su = [i / k for i in range(k + 1)]
        if sv is None:
            k = max(1, ceil(max(dist(A, D), dist(B, C)) / MAX_ARISTA)) if sub_ else 1
            sv = [i / k for i in range(k + 1)]

        def bil(s, t):
            ab = add(mul(A, 1 - s), mul(B, s))
            dc = add(mul(D, 1 - s), mul(C, s))
            return add(mul(ab, 1 - t), mul(dc, t))

        grid = [[bil(s, t) for t in sv] for s in su]
        for i in range(len(su) - 1):
            for j in range(len(sv) - 1):
                p00, p10, p11, p01 = grid[i][j], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]
                self._tri_p(p00, p10, p11)
                self._tri_p(p00, p11, p01)


# ═══════════════════════════════════════════════════════════════════════════════════════════
#  PRIMITIVAS
# ═══════════════════════════════════════════════════════════════════════════════════════════
def quad_rect(m, mk, a0, a1, b0, b1, n):
    """Rectángulo alineado a ejes parametrizado por mk(a,b)->(x,y,z), subdividido en la retícula global."""
    if a1 - a0 < 1e-6 or b1 - b0 < 1e-6:
        return
    m.quad(mk(a0, b0), mk(a1, b0), mk(a1, b1), mk(a0, b1), n, su=reticula(a0, a1), sv=reticula(b0, b1))


def rect_huecos(m, mk, a0, a1, b0, b1, huecos, n):
    """Rectángulo menos una lista de huecos rectangulares (a0,a1,b0,b1). Sólo se emite lo visible."""
    hs = []
    for h in huecos:
        ha0, ha1, hb0, hb1 = max(h[0], a0), min(h[1], a1), max(h[2], b0), min(h[3], b1)
        if ha1 - ha0 > 1e-6 and hb1 - hb0 > 1e-6:
            hs.append((ha0, ha1, hb0, hb1))
    if not hs:
        quad_rect(m, mk, a0, a1, b0, b1, n)
        return
    sa = sorted(set([a0, a1] + [h[0] for h in hs] + [h[1] for h in hs]))
    sb = sorted(set([b0, b1] + [h[2] for h in hs] + [h[3] for h in hs]))
    for i in range(len(sa) - 1):
        for j in range(len(sb) - 1):
            ca, cb = (sa[i] + sa[i + 1]) / 2, (sb[j] + sb[j + 1]) / 2
            if any(h[0] <= ca <= h[1] and h[2] <= cb <= h[3] for h in hs):
                continue
            quad_rect(m, mk, sa[i], sa[i + 1], sb[j], sb[j + 1], n)


def caja(m, x0, x1, y0, y1, z0, z1, caras="+x -x +y -y +z -z"):
    """Paralelepípedo emitiendo sólo las caras indicadas."""
    c = caras.replace(" ", "")
    if "+z" in c: quad_rect(m, lambda a, b: (a, b, z1), x0, x1, y0, y1, (0, 0, 1))
    if "-z" in c: quad_rect(m, lambda a, b: (a, b, z0), x0, x1, y0, y1, (0, 0, -1))
    if "+x" in c: quad_rect(m, lambda a, b: (x1, a, b), y0, y1, z0, z1, (1, 0, 0))
    if "-x" in c: quad_rect(m, lambda a, b: (x0, a, b), y0, y1, z0, z1, (-1, 0, 0))
    if "+y" in c: quad_rect(m, lambda a, b: (a, y1, b), x0, x1, z0, z1, (0, 1, 0))
    if "-y" in c: quad_rect(m, lambda a, b: (a, y0, b), x0, x1, z0, z1, (0, -1, 0))


def revolucion(m, perfil, centro, eje="Y", segs=SEGS, arco=(0.0, 2 * pi), mod=None):
    """Superficie de revolución. perfil = [(r, h)] de abajo hacia arriba por la cara exterior.
    eje 'Y': centro=(cx, cz), h = Y.  eje 'Z': centro=(cx, cy), h = Z.  eje 'X': centro=(cy, cz), h = X."""
    th0, th1 = arco

    def punto(r, h, i):
        th = th0 + (th1 - th0) * i / segs
        if mod:
            r = r * mod(i)
        c, s = cos(th), sin(th)
        if eje == "Y": return (centro[0] + r * c, h, centro[1] + r * s)
        if eje == "Z": return (centro[0] + r * c, centro[1] + r * s, h)
        return (h, centro[0] + r * c, centro[1] + r * s)

    def normal(nr, nh, i):
        th = th0 + (th1 - th0) * (i + 0.5) / segs
        c, s = cos(th), sin(th)
        if eje == "Y": return (nr * c, nh, nr * s)
        if eje == "Z": return (nr * c, nr * s, nh)
        return (nh, nr * c, nr * s)

    for (r0, h0), (r1, h1) in zip(perfil, perfil[1:]):
        dr, dh = r1 - r0, h1 - h0
        L = sqrt(dr * dr + dh * dh)
        if L < 1e-9:
            continue
        nr, nh = dh / L, -dr / L
        for i in range(segs):
            m.quad(punto(r0, h0, i), punto(r0, h0, i + 1), punto(r1, h1, i + 1), punto(r1, h1, i), normal(nr, nh, i))


def esfera(m, c, R, segs=SEGS, anillos=10):
    perfil = [(R * sin(pi * k / anillos), c[1] - R * cos(pi * k / anillos)) for k in range(anillos + 1)]
    revolucion(m, perfil, (c[0], c[2]), "Y", segs)


def cupula(m, cxy, h0, R, eje="Z", segs=SEGS, anillos=5):
    perfil = [(R * cos(0.5 * pi * k / anillos), h0 + R * sin(0.5 * pi * k / anillos)) for k in range(anillos + 1)]
    revolucion(m, perfil, cxy, eje, segs)


def toro(m, c, R, r, e1, e2, e3, segs_mayor=24, segs_menor=8):
    def pt(i, j):
        th, ph = 2 * pi * i / segs_mayor, 2 * pi * j / segs_menor
        radial = add(mul(e1, cos(th)), mul(e2, sin(th)))
        p = add(c, add(mul(radial, R + r * cos(ph)), mul(e3, r * sin(ph))))
        n = add(mul(radial, cos(ph)), mul(e3, sin(ph)))
        return p, n
    for i in range(segs_mayor):
        for j in range(segs_menor):
            (a, na), (b, nb), (c_, nc), (d, nd) = pt(i, j), pt(i + 1, j), pt(i + 1, j + 1), pt(i, j + 1)
            m.quad(a, b, c_, d, add(add(na, nb), add(nc, nd)), sub_=False)


def tubo(m, puntos, radio, segs=8):
    """Tubo a lo largo de una polilínea (transporte paralelo del marco)."""
    n = len(puntos)
    anillos, prev_u = [], None
    for i, p in enumerate(puntos):
        if i == 0: t = sub(puntos[1], puntos[0])
        elif i == n - 1: t = sub(puntos[-1], puntos[-2])
        else: t = add(norm(sub(puntos[i], puntos[i - 1])), norm(sub(puntos[i + 1], puntos[i])))
        t = norm(t)
        if prev_u is None:
            ref = (0, 1, 0) if abs(t[1]) < 0.9 else (1, 0, 0)
            u = norm(cross(ref, t))
        else:
            u = norm(sub(prev_u, mul(t, dot(prev_u, t))))
        v = cross(t, u)
        prev_u = u
        anillos.append([(add(p, mul(add(mul(u, cos(2 * pi * k / segs)), mul(v, sin(2 * pi * k / segs))), radio)),
                         add(mul(u, cos(2 * pi * k / segs)), mul(v, sin(2 * pi * k / segs)))) for k in range(segs)])
    for i in range(n - 1):
        for k in range(segs):
            k2 = (k + 1) % segs
            (a, na), (b, nb) = anillos[i][k], anillos[i][k2]
            (c, nc), (d, nd) = anillos[i + 1][k2], anillos[i + 1][k]
            m.quad(a, b, c, d, add(add(na, nb), add(nc, nd)), sub_=False)


def escalonado_x(m, x0, x1, niveles, z_atras=0.0, z_bajo=None, tapa_x0=False, tapa_x1=False,
                 huecos=(), tapa_superior=True):
    """Moldura horizontal como pila de niveles (y0, y1, resalte) extruida en X: frentes, franjas expuestas
    entre niveles, tapas laterales opcionales, tapa superior del último nivel y sofito del primero."""
    def huecos_en(y):
        return [(h[0], h[1], -1e9, 1e9) for h in huecos if h[2] <= y <= h[3]]
    for i, (y0, y1, z) in enumerate(niveles):
        rect_huecos(m, lambda a, b: (a, b, z), x0, x1, y0, y1, huecos, (0, 0, 1))
        if tapa_x0: quad_rect(m, lambda a, b: (x0, a, b), y0, y1, z_atras, z, (-1, 0, 0))
        if tapa_x1: quad_rect(m, lambda a, b: (x1, a, b), y0, y1, z_atras, z, (1, 0, 0))
        if i + 1 < len(niveles):
            zn = niveles[i + 1][2]
            if z > zn:
                rect_huecos(m, lambda a, b: (a, y1, b), x0, x1, zn, z, huecos_en(y1), (0, 1, 0))
            elif zn > z:
                rect_huecos(m, lambda a, b: (a, y1, b), x0, x1, z, zn, huecos_en(y1), (0, -1, 0))
        elif tapa_superior:
            rect_huecos(m, lambda a, b: (a, y1, b), x0, x1, z_atras, z, huecos_en(y1), (0, 1, 0))
        if i == 0 and z_bajo is not None and z > z_bajo:
            rect_huecos(m, lambda a, b: (a, y0, b), x0, x1, z_bajo, z, huecos_en(y0), (0, -1, 0))


def prisma_frontal(m, poly, z0, z1):
    """Prisma de base poligonal (convexo, en el plano XY) entre z0 y z1: frente + costados (sin dorso)."""
    n = len(poly)
    cx = sum(p[0] for p in poly) / n
    cy = sum(p[1] for p in poly) / n
    # frente (abanico desde el centroide, sin subdividir)
    for i in range(n):
        a, b = poly[i], poly[(i + 1) % n]
        m._tri_p(*(lambda A, B, C: (A, B, C) if dot(cross(sub(B, A), sub(C, A)), (0, 0, 1)) > 0 else (A, C, B))(
            (cx, cy, z1), (a[0], a[1], z1), (b[0], b[1], z1)))
    for i in range(n):
        a, b = poly[i], poly[(i + 1) % n]
        mid = ((a[0] + b[0]) / 2 - cx, (a[1] + b[1]) / 2 - cy, 0.0)
        m.quad((a[0], a[1], z0), (b[0], b[1], z0), (b[0], b[1], z1), (a[0], a[1], z1), mid, sub_=False)


def rx(s, x0, x1, y0, y1):
    """Rectángulo (x0,x1,y0,y1) reflejado en X si s < 0."""
    xa, xb = sorted((s * x0, s * x1))
    return (xa, xb, y0, y1)


def sim(s, xa, xb):
    """Intervalo [xa,xb] llevado al lado s (±1)."""
    return (xa, xb) if s > 0 else (-xb, -xa)


# ═══════════════════════════════════════════════════════════════════════════════════════════
#  PIEZAS
# ═══════════════════════════════════════════════════════════════════════════════════════════
def muro_frente(m, x0, x1, y0, y1, huecos, z):
    """Paño de sillería con juntas horizontales rehundidas (geometría real)."""
    if not INCLUIR_JUNTAS:
        rect_huecos(m, lambda a, b: (a, b, z), x0, x1, y0, y1, huecos, (0, 0, 1))
        return
    ya = y0
    for yj in [y for y in JUNTAS_Y if y0 + JUNTA_ANCHO < y < y1 - JUNTA_ANCHO]:
        j0, j1 = yj - JUNTA_ANCHO / 2, yj + JUNTA_ANCHO / 2
        rect_huecos(m, lambda a, b: (a, b, z), x0, x1, ya, j0, huecos, (0, 0, 1))
        rect_huecos(m, lambda a, b: (a, b, z - JUNTA_PROF), x0, x1, j0, j1, huecos, (0, 0, 1))
        hj = [(h[0], h[1], -1e9, 1e9) for h in huecos if h[2] < yj < h[3]]
        rect_huecos(m, lambda a, b: (a, j0, b), x0, x1, z - JUNTA_PROF, z, hj, (0, 1, 0))
        rect_huecos(m, lambda a, b: (a, j1, b), x0, x1, z - JUNTA_PROF, z, hj, (0, -1, 0))
        ya = j1
    rect_huecos(m, lambda a, b: (a, b, z), x0, x1, ya, y1, huecos, (0, 0, 1))


def rejas_de_bahia(b0, b1, s):
    """Intervalo X de la reja de ventilación de la bahía (b0,b1) del lado s (centrada)."""
    c = (b0 + b1) / 2
    return sim(s, c - REJA_ANCHO / 2, c + REJA_ANCHO / 2)


def huecos_bahia(xa, xb, b0, b1):
    """Huecos que las piezas de una bahía abren en el paño (lado +X; se reflejan con rx)."""
    ys0, ys1, _ = ALFEIZAR
    return [(xa - 0.05, xb + 0.05, ys0, ys1), (xa, xb, ys1, VENTANA_Y1), (b0, b1, FRISO["y0"], FRISO["y1"]),
            (b0, b1, PISO2["alfeizar"][0], Y_MURO_TOPE)]


def construir_muro(m):
    S = SEMI
    m.marco(IDENT)
    # ---- zócalo de granito ----
    hz = [(-E, E, 0.0, Y_D), (-X_J1, X_J1, Y_D, ZOCALO_ALTO)]
    if INCLUIR_REJAS:
        for s in (-1, 1):
            for b0, b1 in BAHIAS:
                xa, xb = rejas_de_bahia(b0, b1, s)
                hz.append((xa, xb, REJA_Y0, REJA_Y0 + REJA_ALTO))
    rect_huecos(m, lambda a, b: (a, b, ZOCALO_RESALTE), -S, S, 0.0, ZOCALO_ALTO, hz, (0, 0, 1))
    # ---- moldura del zócalo (dos tramos, la interrumpen las jambas; los dados de las pilastras apoyan encima) ----
    hp = [rx(s, x0, x1, MURO_BASE, MURO_BASE + 0.01) for s in (-1, 1) for x0, x1 in PILASTRAS]
    for s in (-1, 1):
        xa, xb = sim(s, X_J1, S)
        escalonado_x(m, xa, xb, ZOCALO_MOLDURA, z_atras=0.0, z_bajo=ZOCALO_RESALTE, huecos=hp)
    # ---- paño de sillería ----
    huecos = [(-X_J1, X_J1, MURO_BASE, CORNISA_NIVELES[0][0]),
              (-X_P0, X_P0, CORNISA_NIVELES[0][0], CORNISA_NIVELES[-1][1]),
              (-X_P0, X_P0, CORNISA_NIVELES[-1][1], Y_MURO_TOPE)]
    for s in (-1, 1):
        for x0, x1 in PILASTRAS:
            huecos.append(rx(s, x0, x1, MURO_BASE, CAPITEL["y0"]))
        for b0, b1 in BAHIAS:
            for h in huecos_bahia(b0 + VENTANA_MARGEN, b1 - VENTANA_MARGEN, b0, b1):
                huecos.append(rx(s, *h))
    muro_frente(m, -S, S, MURO_BASE, Y_MURO_TOPE, huecos, 0.0)


def construir_pilastra(m, x0, x1):
    """Pilastra acanalada de orden gigante (simétrica: sirve para ambos lados con x0 < x1). Sin capitel."""
    m.marco(IDENT)
    zr = PILASTRA_RESALTE
    zprev = ZOCALO_MOLDURA[-1][2]
    for (y0, y1, z) in PILASTRA_BASE:
        quad_rect(m, lambda a, b: (a, b, z), x0, x1, y0, y1, (0, 0, 1))
        quad_rect(m, lambda a, b: (x0, a, b), y0, y1, 0.0, z, (-1, 0, 0))
        quad_rect(m, lambda a, b: (x1, a, b), y0, y1, 0.0, z, (1, 0, 0))
        if z > zprev:
            quad_rect(m, lambda a, b: (a, y0, b), x0, x1, zprev, z, (0, -1, 0))
        zprev = z
    ys0 = PILASTRA_BASE[-1][1]
    quad_rect(m, lambda a, b: (a, ys0, b), x0, x1, zr, zprev, (0, 1, 0))          # cara superior del capitel del dado
    # fuste (hasta el collarín del capitel)
    yt = CAPITEL["y0"]
    quad_rect(m, lambda a, b: (x0, a, b), ys0, yt, 0.0, zr, (-1, 0, 0))
    quad_rect(m, lambda a, b: (x1, a, b), ys0, yt, 0.0, zr, (1, 0, 0))
    quad_rect(m, lambda a, b: (a, b, zr), x0, x1, ys0, ESTRIAS_Y0, (0, 0, 1))
    quad_rect(m, lambda a, b: (a, b, zr), x0, x1, ESTRIAS_Y1, yt, (0, 0, 1))
    # acanaladuras (estrías trapezoidales modeladas), cerradas en ambos extremos
    margen = ((x1 - x0) - ESTRIAS_N * ESTRIA_ANCHO - (ESTRIAS_N - 1) * ESTRIA_FILETE) / 2
    ya, yb = ESTRIAS_Y0, ESTRIAS_Y1
    zf = zr - ESTRIA_PROF
    d = (ESTRIA_ANCHO - ESTRIA_FONDO_ANCHO) / 2
    xprev = x0
    for k in range(ESTRIAS_N):
        xa = x0 + margen + k * (ESTRIA_ANCHO + ESTRIA_FILETE)
        xb = xa + ESTRIA_ANCHO
        quad_rect(m, lambda a, b: (a, b, zr), xprev, xa, ya, yb, (0, 0, 1))
        m.quad((xa, ya, zr), (xa + d, ya, zf), (xa + d, yb, zf), (xa, yb, zr), (ESTRIA_PROF, 0, d))
        m.quad((xb, ya, zr), (xb - d, ya, zf), (xb - d, yb, zf), (xb, yb, zr), (-ESTRIA_PROF, 0, d))
        quad_rect(m, lambda a, b: (a, b, zf), xa + d, xb - d, ya, yb, (0, 0, 1))
        m.quad((xa, ya, zr), (xb, ya, zr), (xb - d, ya, zf), (xa + d, ya, zf), (0, 1, 0), sub_=False)
        m.quad((xa, yb, zr), (xb, yb, zr), (xb - d, yb, zf), (xa + d, yb, zf), (0, -1, 0), sub_=False)
        xprev = xb
    quad_rect(m, lambda a, b: (a, b, zr), xprev, x1, ya, yb, (0, 0, 1))


def construir_capitel(m, x0, x1):
    """Capitel estilizado (bajo poligonaje): collarín, campana en dos hileras con repisas, cuello,
    cuatro volutas de esquina + dos centrales y ábaco. x0..x1 = fuste."""
    m.marco(IDENT)
    c, zr = CAPITEL, PILASTRA_RESALTE
    cy0, cy1, ce, cz = c["collar"]
    caja(m, x0 - ce, x1 + ce, cy0, cy1, 0.0, cz, "+z +x -x")
    rect_huecos(m, lambda a, b: (a, cy0, b), x0 - ce, x1 + ce, 0.0, cz, [(x0, x1, 0.0, zr)], (0, -1, 0))
    rect_huecos(m, lambda a, b: (a, cy1, b), x0 - ce, x1 + ce, 0.0, cz, [(x0, x1, 0.0, zr)], (0, 1, 0))
    # campana: dos tramos que arrancan de la sección del fuste y se abren hacia arriba (repisa = puntas de hojas)
    ny0, ny1, ne, nz = c["cuello"]
    for key, nxt in (("campana1", None), ("campana2", (x0 - ne, x1 + ne, nz))):
        ty0, ty1, te, tz = c[key]
        xa1, xb1 = x0 - te, x1 + te
        m.quad((x0, ty0, zr), (x1, ty0, zr), (xb1, ty1, tz), (xa1, ty1, tz), (0, -(tz - zr), (ty1 - ty0)))
        m.quad((x0, ty0, 0.0), (x0, ty0, zr), (xa1, ty1, tz), (xa1, ty1, 0.0), (-1, 0, 0))
        m.quad((x1, ty0, 0.0), (x1, ty0, zr), (xb1, ty1, tz), (xb1, ty1, 0.0), (1, 0, 0))
        hueco = [(x0, x1, 0.0, zr)] if nxt is None else [(nxt[0], nxt[1], 0.0, nxt[2])]
        rect_huecos(m, lambda a, b: (a, ty1, b), xa1, xb1, 0.0, tz, hueco, (0, 1, 0))
    caja(m, x0 - ne, x1 + ne, ny0, ny1, 0.0, nz, "+z +x -x")
    ay0, ay1, ae, az = c["abaco"]
    caja(m, x0 - ae, x1 + ae, ay0, ay1, 0.0, az, "+z +x -x")
    rect_huecos(m, lambda a, b: (a, ay0, b), x0 - ae, x1 + ae, 0.0, az, [(x0 - ne, x1 + ne, 0.0, nz)], (0, -1, 0))
    quad_rect(m, lambda a, b: (a, ay1, b), x0 - ae, x1 + ae, ARQUITRABE[0][2], az, (0, 1, 0))
    vy, vr, vz0, vz1 = c["voluta"]
    for xv in (x0 - ae + vr, x1 + ae - vr):
        revolucion(m, [(vr, vz0), (vr, vz1), (0.0, vz1)], (xv, vy), "Z", SEGS)
    xc = (x0 + x1) / 2
    for xv in (xc - 0.32, xc + 0.32):
        revolucion(m, [(vr * 0.55, vz0), (vr * 0.55, vz1 - 0.08), (0.0, vz1 - 0.08)], (xv, vy - 0.06), "Z", 12)


def hueco_vidriado(m, xa, xb, y0, y1, zr, travesano=None, z_dintel=0.0):
    """Hueco de ventana: vidrio retranqueado a zr con parteluz y travesaño modelados, derrames y dintel."""
    xm, pw = (xa + xb) / 2, PARTELUZ_ANCHO
    pz = zr + 0.08
    huecos = [(xm - pw / 2, xm + pw / 2, y0, y1)]
    ty0 = ty1 = None
    if travesano is not None:
        ty0, ty1 = travesano, travesano + 0.10
        huecos.append((xa, xb, ty0, ty1))
    rect_huecos(m, lambda a, b: (a, b, zr), xa, xb, y0, y1, huecos, (0, 0, 1))
    quad_rect(m, lambda a, b: (xa, a, b), y0, y1, zr, 0.0, (1, 0, 0))
    quad_rect(m, lambda a, b: (xb, a, b), y0, y1, zr, 0.0, (-1, 0, 0))
    quad_rect(m, lambda a, b: (a, y1, b), xa, xb, zr, z_dintel, (0, -1, 0))
    quad_rect(m, lambda a, b: (a, b, pz), xm - pw / 2, xm + pw / 2, y0, y1, (0, 0, 1))
    for xs, nx in ((xm - pw / 2, -1), (xm + pw / 2, 1)):
        hs = [(ty0, ty1, zr, pz)] if travesano is not None else []
        rect_huecos(m, lambda a, b: (xs, a, b), y0, y1, zr, pz, hs, (nx, 0, 0))
    if travesano is not None:
        for x0_, x1_ in ((xa, xm - pw / 2), (xm + pw / 2, xb)):
            caja(m, x0_, x1_, ty0, ty1, zr, pz, "+z +y -y")
    return pz


def alfeizar(m, xa, xb, y0, y1, sr, zr, pz, huecos_extra=(), con_base=True):
    """Alféizar con orejas de 5 cm; su cara superior se recorta donde apoyan parteluz, reja y muro."""
    xm, pw = (xa + xb) / 2, PARTELUZ_ANCHO
    xa2, xb2 = xa - 0.05, xb + 0.05
    quad_rect(m, lambda a, b: (a, b, sr), xa2, xb2, y0, y1, (0, 0, 1))
    quad_rect(m, lambda a, b: (xa2, a, b), y0, y1, 0.0, sr, (-1, 0, 0))
    quad_rect(m, lambda a, b: (xb2, a, b), y0, y1, 0.0, sr, (1, 0, 0))
    if con_base:
        quad_rect(m, lambda a, b: (a, y0, b), xa2, xb2, 0.0, sr, (0, -1, 0))
    hs = [(xa2, xa, zr, 0.0), (xb, xb2, zr, 0.0), (xm - pw / 2, xm + pw / 2, zr, pz)] + list(huecos_extra)
    rect_huecos(m, lambda a, b: (a, y1, b), xa2, xb2, zr, sr, hs, (0, 1, 0))


def construir_ventana(m, xa, xb, b0, b1):
    """Ventana baja de una bahía (hueco xa..xb; bahía b0..b1 para el friso). Coordenadas absolutas."""
    m.marco(IDENT)
    zr = -VENTANA_RETRANQUEO
    ys0, ys1, sr = ALFEIZAR
    yh = VENTANA_Y1
    rj = REJA_VENTANA
    rz0, rz1 = rj["z"] - 0.03, rj["z"] + 0.03
    pz = hueco_vidriado(m, xa, xb, ys1, yh, zr, TRAVESANO_Y, z_dintel=FRISO["resalte"])
    alfeizar(m, xa, xb, ys0, ys1, sr, zr, pz, huecos_extra=[(xa, xb, rz0, rz1)])
    # reja de barrotes: pletina apoyada en el alféizar, barrotes, pasamanos y puntas
    caja(m, xa, xb, ys1, ys1 + 0.06, rz0, rz1, "+z -z +y")
    caja(m, xa, xb, rj["y_rail"], rj["y_rail"] + 0.06, rz0, rz1, "+z -z +y -y")
    x = xa + 0.08
    while x < xb - 0.04:
        revolucion(m, [(rj["radio"], ys1 + 0.06), (rj["radio"], rj["y_rail"])], (x, rj["z"]), "Y", 8)
        revolucion(m, [(rj["radio"], rj["y_rail"] + 0.06), (rj["radio"], rj["y1"]), (0.0, rj["y1"] + 0.05)], (x, rj["z"]), "Y", 8)
        x += rj["paso"]
    # friso con dentículos (ancho de bahía, entre pilastras)
    f = FRISO
    fy0, fy1, fz = f["y0"], f["y1"], f["resalte"]
    dy0, dy1, dz, cz = f["dentil_y0"], f["dentil_y1"], f["dentil_resalte"], f["cap_resalte"]
    n = int((b1 - b0 - 0.16) // f["dentil_paso"]) + 1
    total = (n - 1) * f["dentil_paso"] + f["dentil_ancho"]
    xd0 = (b0 + b1) / 2 - total / 2
    dents = [(xd0 + k * f["dentil_paso"], xd0 + k * f["dentil_paso"] + f["dentil_ancho"]) for k in range(n)]
    rect_huecos(m, lambda a, b: (a, b, fz), b0, b1, fy0, dy1, [(d0, d1, dy0, dy1) for d0, d1 in dents], (0, 0, 1))
    for d0, d1 in dents:
        caja(m, d0, d1, dy0, dy1, fz, fz + dz, "+z +x -x -y")
    quad_rect(m, lambda a, b: (a, b, cz), b0, b1, dy1, fy1, (0, 0, 1))
    rect_huecos(m, lambda a, b: (a, dy1, b), b0, b1, fz, cz, [(d0, d1, fz, fz + dz) for d0, d1 in dents], (0, -1, 0))
    quad_rect(m, lambda a, b: (a, fy1, b), b0, b1, 0.0, cz, (0, 1, 0))
    for x0_, x1_ in ((b0, xa), (xb, b1)):
        quad_rect(m, lambda a, b: (a, fy0, b), x0_, x1_, 0.0, fz, (0, -1, 0))


def construir_panel_alto(m, b0, b1, xa, xb, y_base, base_visible=True):
    """Panel completo del 2.º y 3.º piso de una bahía (b0..b1) con ventanas xa..xb: alféizares, huecos,
    losa de dintel, curso de dentículos, moldura superior; hasta el arquitrabe."""
    m.marco(IDENT)
    p2, p3 = PISO2, PISO3
    zr2, zr3 = -VENTANA_RETRANQUEO, -p3["retranqueo"]
    # ---- 2.º piso ----
    _, sy1, sr = p2["alfeizar"]
    sy0 = y_base
    pz2 = zr2 + 0.08
    alfeizar(m, xa, xb, sy0, sy1, sr, zr2, pz2, con_base=base_visible)
    for x0_, x1_ in ((b0, xa - 0.05), (xb + 0.05, b1)):
        quad_rect(m, lambda a, b: (a, b, 0.0), x0_, x1_, sy0, sy1, (0, 0, 1))
    dy0, dy1, dz = p2["dintel"]
    hueco_vidriado(m, xa, xb, sy1, dy0, zr2, p2["travesano"], z_dintel=dz)
    for x0_, x1_ in ((b0, xa), (xb, b1)):
        quad_rect(m, lambda a, b: (a, b, 0.0), x0_, x1_, sy1, dy0, (0, 0, 1))
        quad_rect(m, lambda a, b: (a, dy0, b), x0_, x1_, 0.0, dz, (0, -1, 0))
    quad_rect(m, lambda a, b: (a, b, dz), b0, b1, dy0, dy1, (0, 0, 1))          # losa del dintel
    # ---- curso de dentículos ----
    d = p2["denticulos"]
    n = int((b1 - b0 - 0.20) // d["paso"]) + 1
    total = (n - 1) * d["paso"] + d["ancho"]
    xd0 = (b0 + b1) / 2 - total / 2
    dents = [(xd0 + k * d["paso"], xd0 + k * d["paso"] + d["ancho"]) for k in range(n)]
    rect_huecos(m, lambda a, b: (a, b, d["resalte"]), b0, b1, d["y0"], d["y1"],
                [(a_, b_, d["d_y0"], d["d_y1"]) for a_, b_ in dents], (0, 0, 1))
    for a_, b_ in dents:
        caja(m, a_, b_, d["d_y0"], d["d_y1"], d["resalte"], d["resalte"] + d["d_resalte"], "+z +x -x +y -y")
    quad_rect(m, lambda a, b: (a, d["y0"], b), b0, b1, dz, d["resalte"], (0, -1, 0))
    quad_rect(m, lambda a, b: (a, d["y1"], b), b0, b1, 0.0, d["resalte"], (0, 1, 0))
    # ---- 3.º piso ----
    ay0, ay1, ar = p3["alfeizar"]
    quad_rect(m, lambda a, b: (a, b, 0.0), b0, b1, d["y1"], ay0, (0, 0, 1))
    pz3 = zr3 + 0.08
    alfeizar(m, xa, xb, ay0, ay1, ar, zr3, pz3)
    for x0_, x1_ in ((b0, xa - 0.05), (xb + 0.05, b1)):
        quad_rect(m, lambda a, b: (a, b, 0.0), x0_, x1_, ay0, ay1, (0, 0, 1))
    hueco_vidriado(m, xa, xb, ay1, p3["y1"], zr3, p3["travesano"], z_dintel=0.0)
    for x0_, x1_ in ((b0, xa), (xb, b1)):
        quad_rect(m, lambda a, b: (a, b, 0.0), x0_, x1_, ay1, p3["y1"], (0, 0, 1))
    # ---- banda superior lisa con moldura (deja libre la huella de los capiteles) ----
    my0, my1, mr = p3["moldura"]
    c0, c1 = b0 + p3["margen_capitel"], b1 - p3["margen_capitel"]
    rect_huecos(m, lambda a, b: (a, b, 0.0), b0, b1, p3["y1"], Y_MURO_TOPE, [(c0, c1, my0, my1)], (0, 0, 1))
    caja(m, c0, c1, my0, my1, 0.0, mr, "+z +x -x +y -y")


def construir_reja(m, xa, xb):
    """Reja de ventilación rehundida en el zócalo de granito."""
    m.marco(IDENT)
    y0, y1 = REJA_Y0, REJA_Y0 + REJA_ALTO
    zz = ZOCALO_RESALTE
    zf = zz - 0.10
    zb = zf + 0.05
    quad_rect(m, lambda a, b: (a, b, zf), xa, xb, y0, y1, (0, 0, 1))
    quad_rect(m, lambda a, b: (a, y1, b), xa, xb, zf, zz, (0, -1, 0))
    quad_rect(m, lambda a, b: (a, y0, b), xa, xb, zf, zz, (0, 1, 0))
    quad_rect(m, lambda a, b: (xa, a, b), y0, y1, zf, zz, (1, 0, 0))
    quad_rect(m, lambda a, b: (xb, a, b), y0, y1, zf, zz, (-1, 0, 0))
    caja(m, xa, xb, y0 + 0.03, y0 + 0.08, zb - 0.02, zb + 0.02, "+z +y -y")
    caja(m, xa, xb, y1 - 0.08, y1 - 0.03, zb - 0.02, zb + 0.02, "+z +y -y")
    x = xa + 0.10
    while x < xb - 0.05:
        revolucion(m, [(0.015, y0 + 0.08), (0.015, y1 - 0.08)], (x, zb), "Y", 8)
        x += 0.14


def construir_jamba(m, lado):
    m.marco(MIRROR if lado < 0 else IDENT)
    x0, x1, z = X_J0, X_J1, JAMBA_RESALTE
    y0, y1 = Y_D, CORNISA_NIVELES[0][0]
    me = MENSULA
    rect_huecos(m, lambda a, b: (a, b, z), x0, x1, y0, y1,
                [(me["x0"], me["x1"], me["y0"], y1), (x0, DINTEL_X, Y_V, y1)], (0, 0, 1))
    quad_rect(m, lambda a, b: (x1, a, b), y0, y1, 0.0, z, (1, 0, 0))            # cara hacia la pilastra
    quad_rect(m, lambda a, b: (x0, a, b), y0, Y_V, Z_P, z, (-1, 0, 0))          # derrame del vano
    xm0, xm1 = HOJA_ANCHO, A_V                                                   # montante fijo de bronce
    caja(m, xm0, xm1, y0, Y_V, Z_P, Z_P + MARCO_RESALTE, "+z -x")
    revolucion(m, [(0.035, y0), (0.035, Y_V)], ((xm0 + xm1) / 2, Z_P + MARCO_RESALTE), "Y", 8, arco=(0.0, pi))


def mensula(m):
    """Ménsula (voluta doble) colgando bajo la cornisa, sobre la jamba (lado derecho; se espeja con el marco)."""
    x0, x1, y0, y1 = MENSULA["x0"], MENSULA["x1"], MENSULA["y0"], MENSULA["y1"]
    k = 1.8
    zj = JAMBA_RESALTE
    zf = zj + MENSULA["vuelo"]
    yb0 = y1 - 0.26 * k
    caja(m, x0, x1, yb0, y1, zj, zf, "+z +x -y")
    rect_huecos(m, lambda a, b: (x0, a, b), yb0, y1, zj, zf,
                [(fy0, fy1, zj, fz) for fy0, fy1, fz in DINTEL_FAJAS], (-1, 0, 0))
    quad_rect(m, lambda a, b: (a, y1, b), x0, x1, CORNISA_NIVELES[0][2], zf, (0, 1, 0))
    revolucion(m, [(0.0, x0), (0.10 * k, x0), (0.10 * k, x1), (0.0, x1)], (yb0 - 0.10 * k, zj + 0.18 * k), "X", SEGS)
    xa, xb = x0 + 0.03 * k, x1 - 0.03 * k
    ya_, yb_ = y0 + 0.16 * k, yb0 - 0.20 * k
    za, zb = zj + 0.08 * k, zj + 0.17 * k
    m.quad((xa, ya_, za), (xb, ya_, za), (xb, yb_, zb), (xa, yb_, zb), (0, -0.15, 1))
    m.quad((xa, ya_, zj), (xa, ya_, za), (xa, yb_, zb), (xa, yb_, zj), (-1, 0, 0))
    m.quad((xb, ya_, zj), (xb, ya_, za), (xb, yb_, zb), (xb, yb_, zj), (1, 0, 0))
    quad_rect(m, lambda a, b: (a, ya_, b), xa, xb, zj, za, (0, -1, 0))
    revolucion(m, [(0.0, x0), (0.07 * k, x0), (0.07 * k, x1), (0.0, x1)], (y0 + 0.10 * k, zj + 0.07 * k), "X", SEGS)
    caja(m, x0 + 0.04 * k, x1 - 0.04 * k, y0, y0 + 0.035 * k, zj, zj + 0.07 * k, "+z +x -x -y")


def construir_cornisa(m):
    """Dintel de tres fajas + cornisa del portal + ménsulas. La ventana central del 2.º piso apoya encima."""
    m.marco(IDENT)
    me = MENSULA
    escalonado_x(m, -DINTEL_X, DINTEL_X, DINTEL_FAJAS, z_atras=JAMBA_RESALTE, tapa_superior=False)
    z1 = DINTEL_FAJAS[0][2]
    quad_rect(m, lambda a, b: (a, Y_V, b), -A_V, A_V, Z_P, z1, (0, -1, 0))                  # sofito sobre el vano
    for s in (-1, 1):
        xa, xb = sim(s, A_V, DINTEL_X)
        quad_rect(m, lambda a, b: (a, Y_V, b), xa, xb, JAMBA_RESALTE, z1, (0, -1, 0))
    xc = X_P0
    escalonado_x(m, -xc, xc, CORNISA_NIVELES, z_atras=0.0, tapa_superior=False)
    for (y0, y1, z) in CORNISA_NIVELES:                                                         # tapas delante de la pilastra
        if z > PILASTRA_RESALTE:
            quad_rect(m, lambda a, b: (-xc, a, b), y0, y1, PILASTRA_RESALTE, z, (-1, 0, 0))
            quad_rect(m, lambda a, b: (xc, a, b), y0, y1, PILASTRA_RESALTE, z, (1, 0, 0))
    yt, zt = CORNISA_NIVELES[-1][1], CORNISA_NIVELES[-1][2]                                     # cara superior (apoya el alféizar central)
    xa, xb = -CENTRAL_SEMIANCHO - 0.05, CENTRAL_SEMIANCHO + 0.05
    rect_huecos(m, lambda a, b: (a, yt, b), -xc, xc, 0.0, zt, [(xa, xb, 0.0, PISO2["alfeizar"][2])], (0, 1, 0))
    yc, zc = CORNISA_NIVELES[0][0], CORNISA_NIVELES[0][2]                                        # sofito con huecos
    hs = [(-DINTEL_X, DINTEL_X, -1.0, DINTEL_FAJAS[-1][2])]
    for s in (-1, 1):
        hs.append(rx(s, X_J0, X_J1, -1.0, JAMBA_RESALTE))
        hs.append(rx(s, me["x0"], me["x1"], -1.0, 1.0))
    rect_huecos(m, lambda a, b: (a, yc, b), -xc, xc, 0.0, zc, hs, (0, -1, 0))
    for s in (-1, 1):
        m.marco(MIRROR if s < 0 else IDENT)
        mensula(m)
    m.marco(IDENT)


# ---- inscripción: fuente de trazos ortogonales (celda 4 x 7) + diagonales como prismas ----
FUENTE = {
    "B": [(0, 1, 0, 7), (1, 3, 6, 7), (1, 3, 3, 4), (1, 3, 0, 1), (3, 4, 4, 6), (3, 4, 1, 3)],
    "A": [(0, 1, 0, 6), (3, 4, 0, 6), (1, 3, 6, 7), (1, 3, 3, 4)],
    "N": [(0, 1, 0, 7), (3, 4, 0, 7)],
    "C": [(0, 1, 0, 7), (1, 4, 6, 7), (1, 4, 0, 1), (3, 4, 5, 6), (3, 4, 1, 2)],
    "O": [(0, 1, 0, 7), (3, 4, 0, 7), (1, 3, 6, 7), (1, 3, 0, 1)],
    "E": [(0, 1, 0, 7), (1, 4, 6, 7), (1, 3, 3, 4), (1, 4, 0, 1)],
    "T": [(0, 4, 6, 7), (1.5, 2.5, 0, 6)],
    "R": [(0, 1, 0, 7), (1, 3, 6, 7), (1, 3, 3, 4), (3, 4, 4, 6)],
    "L": [(0, 1, 0, 7), (1, 4, 0, 1)],
    "D": [(0, 1, 0, 7), (1, 3, 6, 7), (1, 3, 0, 1), (3, 4, 1, 6)],
    "H": [(0, 1, 0, 7), (3, 4, 0, 7), (1, 3, 3, 4)],
    "I": [(0, 1, 0, 7)],
}
DIAGONALES = {"N": [((1, 6.5), (1.9, 6.5), (3, 0.5), (2.1, 0.5))], "R": [((1.2, 3), (2.2, 3), (3.9, 0.1), (2.9, 0.1))]}
ANCHO_LETRA = {"I": 1}


def layout_inscripcion():
    """Devuelve (rects, poligonos) en metros para el texto centrado en X = 0, o None si no cabe."""
    ins = INSCRIPCION
    u = ins["alto"] / 7.0
    esp, espacio = 1.2, 2.5
    avance = []
    for ch in ins["texto"]:
        if ch == " ":
            avance.append(espacio)
        else:
            avance.append(ANCHO_LETRA.get(ch, 4) + esp)
    total = (sum(avance) - esp) * u
    if total > 1.9 * SEMI:
        return None
    x = -total / 2
    rects, polys = [], []
    for ch, av in zip(ins["texto"], avance):
        if ch != " " and ch in FUENTE:
            for (a0, a1, b0, b1) in FUENTE[ch]:
                rects.append((x + a0 * u, x + a1 * u, ins["y0"] + b0 * u, ins["y0"] + b1 * u))
            for poly in DIAGONALES.get(ch, []):
                polys.append([(x + px * u, ins["y0"] + py * u) for px, py in poly])
        x += av * u
    return rects, polys


def construir_inscripcion(m):
    """Letras en relieve rasterizadas en una retícula fina (celda = u/2): frente por celda ocupada y costados
    sólo en los bordes libres -> cada letra es un único relieve cerrado, sin caras internas."""
    m.marco(IDENT)
    lay = layout_inscripcion()
    if lay is None:
        return
    z0 = FRISO_ENT[2]
    z1 = z0 + INSCRIPCION["relieve"]
    rects, polys = lay
    u = INSCRIPCION["alto"] / 7.0
    h = u / 2
    xmin = min(r[0] for r in rects) - h
    ymin = INSCRIPCION["y0"]
    nx = int(round((max(r[1] for r in rects) - xmin) / h)) + 1
    ny = int(round(7 * u / h))

    def dentro_poly(px, py, poly):
        # convexo: mismo signo del producto cruz en todos los lados
        sgn = 0
        for k in range(len(poly)):
            (ax, ay), (bx, by) = poly[k], poly[(k + 1) % len(poly)]
            c = (bx - ax) * (py - ay) - (by - ay) * (px - ax)
            if abs(c) < 1e-12:
                continue
            if sgn == 0:
                sgn = 1 if c > 0 else -1
            elif (c > 0) != (sgn > 0):
                return False
        return True

    ocupado = set()
    for i in range(nx):
        for j in range(ny):
            cx, cy = xmin + (i + 0.5) * h, ymin + (j + 0.5) * h
            if any(r[0] - 1e-6 <= cx <= r[1] + 1e-6 and r[2] - 1e-6 <= cy <= r[3] + 1e-6 for r in rects) or \
               any(dentro_poly(cx, cy, poly) for poly in polys):
                ocupado.add((i, j))
    # celdas que se tocan sólo por una esquina -> rellenar un vecino para que el relieve sea manifold
    cambio = True
    while cambio:
        cambio = False
        for (i, j) in list(ocupado):
            for di, dj in ((1, 1), (1, -1)):
                if (i + di, j + dj) in ocupado and (i + di, j) not in ocupado and (i, j + dj) not in ocupado:
                    ocupado.add((i + di, j))
                    cambio = True
    for (i, j) in ocupado:
        x0, x1, y0, y1 = xmin + i * h, xmin + (i + 1) * h, ymin + j * h, ymin + (j + 1) * h
        m.quad((x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1), (0, 0, 1), sub_=False)
        if (i - 1, j) not in ocupado:
            m.quad((x0, y0, z0), (x0, y0, z1), (x0, y1, z1), (x0, y1, z0), (-1, 0, 0), sub_=False)
        if (i + 1, j) not in ocupado:
            m.quad((x1, y0, z0), (x1, y0, z1), (x1, y1, z1), (x1, y1, z0), (1, 0, 0), sub_=False)
        if (i, j - 1) not in ocupado:
            m.quad((x0, y0, z0), (x1, y0, z0), (x1, y0, z1), (x0, y0, z1), (0, -1, 0), sub_=False)
        if (i, j + 1) not in ocupado:
            m.quad((x0, y1, z0), (x1, y1, z0), (x1, y1, z1), (x0, y1, z1), (0, 1, 0), sub_=False)


def huecos_inscripcion():
    """Huella de las letras en el friso (celdas ocupadas), para recortar el paño detrás."""
    lay = layout_inscripcion()
    if lay is None:
        return []
    rects, polys = lay
    return rects


def construir_entablamento(m):
    """Arquitrabe, friso (con huecos para las letras), cornisa con dentículos; sin tapa superior detrás del antepecho."""
    m.marco(IDENT)
    S = SEMI
    ab = CAPITEL["abaco"]
    y_arq, z_arq = ARQUITRABE[0][0], ARQUITRABE[0][2]
    huecos_ab = [rx(s, x0 - ab[2], x1 + ab[2], 0.0, z_arq) for s in (-1, 1) for x0, x1 in PILASTRAS]
    rect_huecos(m, lambda a, b: (a, y_arq, b), -S, S, 0.0, z_arq, huecos_ab, (0, -1, 0))
    niveles = ARQUITRABE + [FRISO_ENT] + CORNISA_ENT
    d = DENTICULOS_ENT
    zc = CORNISA_ENT[1][2]
    n = int((2 * S - d["ancho"]) // d["paso"]) + 1
    total = (n - 1) * d["paso"] + d["ancho"]
    xd0 = -total / 2
    dents = [(xd0 + k * d["paso"], xd0 + k * d["paso"] + d["ancho"]) for k in range(n)]
    huecos = [(a_, b_, d["y0"], d["y1"]) for a_, b_ in dents]
    escalonado_x(m, -S, S, niveles, z_atras=0.0, z_bajo=None, huecos=huecos, tapa_superior=False)
    for a_, b_ in dents:
        caja(m, a_, b_, d["y0"], d["y1"], zc, zc + d["resalte"], "+z +x -x +y -y")
    # cara superior de la cornisa, delante del antepecho (huecos: pedestales)
    yt, zt = CORNISA_ENT[-1][1], CORNISA_ENT[-1][2]
    pz, pe = PARAPETO["pedestal_z"], PARAPETO["pedestal_extra"]
    zp = PARAPETO["plinto"][2]
    hp = [rx(s, x0 - pe, x1 + pe, 0.0, pz) for s in (-1, 1) for x0, x1 in PILASTRAS]
    rect_huecos(m, lambda a, b: (a, yt, b), -S, S, zp, zt, hp, (0, 1, 0))


def construir_parapeto(m):
    """Antepecho: pedestales sobre las pilastras y tramos de balaustrada (plinto, balaustres, coronación). Cierra el modelo."""
    m.marco(IDENT)
    S = SEMI
    pp = PARAPETO
    y0, y1 = pp["y0"], pp["y1"]
    pz, pe = pp["pedestal_z"], pp["pedestal_extra"]
    py0, py1, pzz = pp["plinto"]
    by0, by1, bl, bp, bz0, bz1 = pp["balaustre"]
    cy0, cy1, cz = pp["coping"]
    peds = sorted(sim(s, x0 - pe, x1 + pe) for s in (-1, 1) for x0, x1 in PILASTRAS)
    peds = [(max(a, -S), min(b, S)) for a, b in peds]
    for xa, xb in peds:
        caja(m, xa, xb, y0, y1, 0.0, pz, "+z +y")
        # costados del pedestal: sólo lo que sobresale de los tramos vecinos (plinto, balaustres, coronación)
        for xs, nx, libre in ((xa, -1, xa > -S + 1e-6), (xb, 1, xb < S - 1e-6)):
            if not libre:
                continue
            huecos = [(py0, py1, 0.0, pzz), (cy0, cy1, 0.0, cz)]
            rect_huecos(m, lambda a, b, xs=xs: (xs, a, b), y0, y1, 0.0, pz, huecos, (nx, 0, 0))
    tramos = [(-S, peds[0][0])] + [(peds[i][1], peds[i + 1][0]) for i in range(len(peds) - 1)] + [(peds[-1][1], S)]
    for xa, xb in tramos:
        if xb - xa < 0.05:
            continue
        quad_rect(m, lambda a, b: (a, b, pzz), xa, xb, py0, py1, (0, 0, 1))
        n = int((xb - xa - bl) // bp) + 1
        total = (n - 1) * bp + bl
        x = (xa + xb) / 2 - total / 2
        bals = [(x + k * bp, x + k * bp + bl) for k in range(n)]
        rect_huecos(m, lambda a, b: (a, py1, b), xa, xb, 0.0, pzz, [(a_, b_, bz0, bz1) for a_, b_ in bals], (0, 1, 0))
        for a_, b_ in bals:
            caja(m, a_, b_, by0, by1, bz0, bz1, "+z -z +x -x")
        quad_rect(m, lambda a, b: (a, b, cz), xa, xb, cy0, cy1, (0, 0, 1))
        quad_rect(m, lambda a, b: (a, cy1, b), xa, xb, 0.0, cz, (0, 1, 0))
        rect_huecos(m, lambda a, b: (a, cy0, b), xa, xb, 0.0, cz, [(a_, b_, bz0, bz1) for a_, b_ in bals], (0, -1, 0))
        # muro del antepecho detrás de los balaustres (entre plinto y coronación)
        quad_rect(m, lambda a, b: (a, b, 0.0), xa, xb, py1, cy0, (0, 0, 1))


def panel_hoja(m, u0, u1, v0, v1, T, tipo):
    """Panel rehundido con filete realzado y ornamento, en coordenadas locales de la hoja (u, v, w)."""
    wf = T - 0.04
    wr = wf + 0.02
    i1, i2 = 0.06, 0.12
    quad_rect(m, lambda a, b: (u0, a, b), v0, v1, wf, T, (1, 0, 0))
    quad_rect(m, lambda a, b: (u1, a, b), v0, v1, wf, T, (-1, 0, 0))
    quad_rect(m, lambda a, b: (a, v0, b), u0, u1, wf, T, (0, 1, 0))
    quad_rect(m, lambda a, b: (a, v1, b), u0, u1, wf, T, (0, -1, 0))
    a0, a1, b0, b1 = u0 + i1, u1 - i1, v0 + i1, v1 - i1
    c0, c1, d0, d1 = u0 + i2, u1 - i2, v0 + i2, v1 - i2
    rect_huecos(m, lambda a, b: (a, b, wf), u0, u1, v0, v1, [(a0, a1, b0, b1)], (0, 0, 1))
    quad_rect(m, lambda a, b: (a0, a, b), b0, b1, wf, wr, (-1, 0, 0))
    quad_rect(m, lambda a, b: (a1, a, b), b0, b1, wf, wr, (1, 0, 0))
    quad_rect(m, lambda a, b: (a, b0, b), a0, a1, wf, wr, (0, -1, 0))
    quad_rect(m, lambda a, b: (a, b1, b), a0, a1, wf, wr, (0, 1, 0))
    rect_huecos(m, lambda a, b: (a, b, wr), a0, a1, b0, b1, [(c0, c1, d0, d1)], (0, 0, 1))
    quad_rect(m, lambda a, b: (c0, a, b), d0, d1, wf, wr, (1, 0, 0))
    quad_rect(m, lambda a, b: (c1, a, b), d0, d1, wf, wr, (-1, 0, 0))
    quad_rect(m, lambda a, b: (a, d0, b), c0, c1, wf, wr, (0, 1, 0))
    quad_rect(m, lambda a, b: (a, d1, b), c0, c1, wf, wr, (0, -1, 0))
    uc, vc = (u0 + u1) / 2, (v0 + v1) / 2
    huecos = []
    if tipo in ("roseton", "leon"):
        lado = 0.28 if tipo == "roseton" else 0.42
        huecos = [(uc - lado / 2, uc + lado / 2, vc - lado / 2, vc + lado / 2)]
    rect_huecos(m, lambda a, b: (a, b, wf), c0, c1, d0, d1, huecos, (0, 0, 1))
    if tipo in ("roseton", "leon"):
        h = 0.02
        caja(m, uc - lado / 2, uc + lado / 2, vc - lado / 2, vc + lado / 2, wf, wf + h, "+z +x -x +y -y")
        cupula(m, (uc, vc), wf + h, 0.10 if tipo == "roseton" else 0.16, "Z")
    elif tipo == "aldaba":
        vb = vc + 0.26
        revolucion(m, [(0.09, wf), (0.09, wf + 0.04), (0.06, wf + 0.05), (0.0, wf + 0.05)], (uc, vb), "Z", SEGS)
        toro(m, (uc, vc + 0.03, wf + 0.05), 0.17, 0.022, (1, 0, 0), (0, 1, 0), (0, 0, 1), 24, 8)
        caja(m, uc - 0.035, uc + 0.035, vb + 0.09, vb + 0.33, wf, wf + 0.035, "+z +x -x +y -y")


def construir_hoja(m, lado):
    """Hoja en coordenadas locales: u desde la bisagra hacia el centro, v desde el umbral, w hacia la calle.
    Origen (0,0,0) = eje de bisagras. Izquierda: u -> +X. Derecha: u -> -X (espejo de construcción)."""
    m.marco(IDENT if lado < 0 else MIRROR)
    W, H, T = HOJA_ANCHO, VANO_ALTO, HOJA_ESPESOR
    u0p, u1p = HOJA_MONTANTE, W - HOJA_MONTANTE
    rect_huecos(m, lambda a, b: (a, b, T), 0.0, W, 0.0, H, [(u0p, u1p, v0, v1) for v0, v1, _ in HOJA_PANELES], (0, 0, 1))
    quad_rect(m, lambda a, b: (a, b, 0.0), 0.0, W, 0.0, H, (0, 0, -1))
    quad_rect(m, lambda a, b: (0.0, a, b), 0.0, H, 0.0, T, (-1, 0, 0))
    quad_rect(m, lambda a, b: (W, a, b), 0.0, H, 0.0, T, (1, 0, 0))
    quad_rect(m, lambda a, b: (a, H, b), 0.0, W, 0.0, T, (0, 1, 0))
    for v0, v1, tipo in HOJA_PANELES:
        panel_hoja(m, u0p, u1p, v0, v1, T, tipo)


def construir_medallon(m, lado):
    m.marco(MIRROR if lado < 0 else IDENT)
    R = MEDALLON_R
    perfil = [(R, 0.0), (R, 0.04), (R - 0.04, 0.07), (R - 0.07, 0.07), (R - 0.07, 0.05),
              (R - 0.12, 0.05), (R - 0.12, 0.08), (0.0, 0.08)]
    revolucion(m, [(r, JAMBA_RESALTE + h) for r, h in perfil], (MEDALLON_X, MEDALLON_Y), "Z", 20)


def construir_escalinata(m):
    m.marco(IDENT)
    z_front = [DESCANSO_FONDO + k * HUELLA for k in range(N_PELDANOS)]
    huecos = []
    for s in (-1, 1):
        huecos.append(rx(s, A_V, X_J1, Z_P, JAMBA_RESALTE))
        huecos.append(rx(s, X_J1, E + 0.01, Z_P, ZOCALO_RESALTE))
    rect_huecos(m, lambda a, b: (a, Y_D, b), -E, E, Z_P, z_front[0], huecos, (0, 1, 0))
    for k in range(N_PELDANOS):
        y_top = (N_PELDANOS - k) * CONTRAHUELLA
        y_bot = y_top - CONTRAHUELLA
        zf = z_front[k]
        quad_rect(m, lambda a, b: (a, b, zf), -E, E, y_bot, y_top, (0, 0, 1))
        if k + 1 < N_PELDANOS:
            quad_rect(m, lambda a, b: (a, y_bot, b), -E, E, zf, z_front[k + 1], (0, 1, 0))
        z_back = ZOCALO_RESALTE if k == 0 else z_front[k - 1]
        quad_rect(m, lambda a, b: (-E, a, b), 0.0, y_top, z_back, zf, (-1, 0, 0))
        quad_rect(m, lambda a, b: (E, a, b), 0.0, y_top, z_back, zf, (1, 0, 0))


def construir_farol(m, lado):
    m.marco(MIRROR if lado < 0 else IDENT)
    cx, cz, k = FAROL_X, FAROL_Z, FAROL_ESCALA
    L = PEDESTAL_LADO / 2
    caja(m, cx - L, cx + L, 0.0, PEDESTAL_ALTO, cz - L, cz + L, "+z -z +x -x")
    L2, y0, y1 = L + 0.04, PEDESTAL_ALTO, PEDESTAL_ALTO + PEDESTAL_TAPA
    caja(m, cx - L2, cx + L2, y0, y1, cz - L2, cz + L2, "+z -z +x -x")
    q = 0.20 * k
    rect_huecos(m, lambda a, b: (a, y1, b), cx - L2, cx + L2, cz - L2, cz + L2, [(cx - q, cx + q, cz - q, cz + q)], (0, 1, 0))
    rect_huecos(m, lambda a, b: (a, y0, b), cx - L2, cx + L2, cz - L2, cz + L2, [(cx - L, cx + L, cz - L, cz + L)], (0, -1, 0))
    caja(m, cx - q, cx + q, y1, y1 + 0.08 * k, cz - q, cz + q, "+z -z +x -x")
    r0 = 0.19 * k
    rect_huecos(m, lambda a, b: (a, y1 + 0.08 * k, b), cx - q, cx + q, cz - q, cz + q, [(cx - r0, cx + r0, cz - r0, cz + r0)], (0, 1, 0))
    yb = y1 + 0.08 * k
    perfil = [(0.19, 0.0), (0.19, 0.04), (0.16, 0.08), (0.12, 0.12), (0.105, 0.20), (0.085, 0.24), (0.085, 0.28), (0.072, 0.30)]
    revolucion(m, [(r * k, yb + h * k) for r, h in perfil], (cx, cz), "Y", SEGS)
    yf0, yf1 = yb + 0.30 * k, yb + 0.30 * k + FUSTE_ALTO
    rf = 0.072 * k
    revolucion(m, [(rf, yf0), (rf, yf1)], (cx, cz), "Y", 24, mod=lambda i: 1.0 if i % 2 == 0 else 0.88)
    p2 = [(0.072, 0.0), (0.09, 0.02), (0.09, 0.07), (0.075, 0.09), (0.05, 0.11), (0.05, 0.20), (0.11, 0.22), (0.13, 0.26),
          (0.13, 0.29), (0.10, 0.31), (0.03, 0.32), (0.03, 0.42), (0.06, 0.44), (0.06, 0.46), (0.0, 0.46)]
    revolucion(m, [(r * k, yf1 + h * k) for r, h in p2], (cx, cz), "Y", SEGS)
    esfera(m, (cx, yf1 + 0.46 * k + 0.125 * k, cz), 0.125 * k)
    ya = yf1 + 0.24 * k
    for j in range(4):
        th = pi / 4 + j * pi / 2
        def pr(r, h, th=th):
            return (cx + r * cos(th), h, cz + r * sin(th))
        tubo(m, [pr(0.10 * k, ya), pr(0.18 * k, ya + 0.01 * k), pr(0.25 * k, ya + 0.05 * k), pr(0.30 * k, ya + 0.12 * k)], 0.016 * k, 8)
        ex, ez = cx + 0.30 * k * cos(th), cz + 0.30 * k * sin(th)
        revolucion(m, [(0.02 * k, ya + 0.12 * k), (0.05 * k, ya + 0.14 * k), (0.05 * k, ya + 0.17 * k), (0.06 * k, ya + 0.18 * k), (0.0, ya + 0.18 * k)], (ex, ez), "Y", 12)
        esfera(m, (ex, ya + 0.18 * k + 0.115 * k, ez), 0.115 * k, 14, 9)


def construir_vereda(m):
    m.marco(IDENT)
    S = SEMI
    z_ult = DESCANSO_FONDO + (N_PELDANOS - 1) * HUELLA
    L2 = PEDESTAL_LADO / 2 + 0.04
    huecos = [(-E, E, 0.0, z_ult)]
    for s in (-1, 1):
        huecos.append(rx(s, FAROL_X - L2, FAROL_X + L2, FAROL_Z - L2, FAROL_Z + L2))
    rect_huecos(m, lambda a, b: (a, 0.0, b), -S, S, ZOCALO_RESALTE, VEREDA_FONDO, huecos, (0, 1, 0))
    quad_rect(m, lambda a, b: (a, b, VEREDA_FONDO), -S, S, -CORDON_ALTO, 0.0, (0, 0, 1))
    quad_rect(m, lambda a, b: (a, -CORDON_ALTO, b), -S, S, VEREDA_FONDO, VEREDA_FONDO + CALLE_FONDO, (0, 1, 0))


# ═══════════════════════════════════════════════════════════════════════════════════════════
#  ENSAMBLE EN BLENDER
# ═══════════════════════════════════════════════════════════════════════════════════════════
def crear_objeto(nombre, malla, col, origen=(0.0, 0.0, 0.0), props=None):
    me = bpy.data.meshes.new(nombre)
    me.from_pydata([P(v) for v in malla.verts], [], malla.tris)
    me.validate(verbose=False)
    me.update()
    for p in me.polygons:
        p.use_smooth = False
    ob = bpy.data.objects.new(nombre, me)
    col.objects.link(ob)
    ob.location = P(origen)
    ob.rotation_euler = (0.0, 0.0, 0.0)
    ob.scale = (1.0, 1.0, 1.0)
    for k, v in (props or {}).items():
        ob[k] = v
    return ob


def limpiar_escena():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.unit_settings.system = "METRIC"
    sc.unit_settings.scale_length = 1.0


def construir_todo():
    t0 = time.time()
    preparar_layout()
    limpiar_escena()
    col = bpy.data.collections.new(NOMBRE_COLECCION)
    bpy.context.scene.collection.children.link(col)

    piezas = [("Muro", construir_muro), ("Cornisa", construir_cornisa),
              ("Jamba_L", lambda m: construir_jamba(m, -1)), ("Jamba_R", lambda m: construir_jamba(m, 1)),
              ("Medallon_L", lambda m: construir_medallon(m, -1)), ("Medallon_R", lambda m: construir_medallon(m, 1)),
              ("Escalinata", construir_escalinata),
              ("Farol_L", lambda m: construir_farol(m, -1)), ("Farol_R", lambda m: construir_farol(m, 1)),
              ("Ventana_Central", lambda m: construir_panel_alto(m, -X_P0, X_P0, -CENTRAL_SEMIANCHO, CENTRAL_SEMIANCHO,
                                                                 CORNISA_NIVELES[-1][1], base_visible=False)),
              ("Entablamento", construir_entablamento), ("Parapeto", construir_parapeto)]
    if INCLUIR_INSCRIPCION:
        piezas.append(("Inscripcion", construir_inscripcion))
    for k, (x0, x1) in enumerate(PILASTRAS):
        suf = "" if k == 0 else str(k + 1)
        piezas.append((f"Pilastra_R{suf}", lambda m, x0=x0, x1=x1: construir_pilastra(m, x0, x1)))
        piezas.append((f"Pilastra_L{suf}", lambda m, x0=x0, x1=x1: construir_pilastra(m, -x1, -x0)))
        piezas.append((f"Capitel_R{suf}", lambda m, x0=x0, x1=x1: construir_capitel(m, x0, x1)))
        piezas.append((f"Capitel_L{suf}", lambda m, x0=x0, x1=x1: construir_capitel(m, -x1, -x0)))
    for k, (b0, b1) in enumerate(BAHIAS):
        xa, xb = b0 + VENTANA_MARGEN, b1 - VENTANA_MARGEN
        yb = PISO2["alfeizar"][0]
        piezas.append((f"Ventana_R{k + 1}", lambda m, xa=xa, xb=xb, b0=b0, b1=b1: construir_ventana(m, xa, xb, b0, b1)))
        piezas.append((f"Ventana_L{k + 1}", lambda m, xa=xa, xb=xb, b0=b0, b1=b1: construir_ventana(m, -xb, -xa, -b1, -b0)))
        piezas.append((f"Ventana_Alta_R{k + 1}", lambda m, xa=xa, xb=xb, b0=b0, b1=b1: construir_panel_alto(m, b0, b1, xa, xb, yb)))
        piezas.append((f"Ventana_Alta_L{k + 1}", lambda m, xa=xa, xb=xb, b0=b0, b1=b1: construir_panel_alto(m, -b1, -b0, -xb, -xa, yb)))
        if INCLUIR_REJAS:
            for s, lado in ((1, "R"), (-1, "L")):
                ra, rb = rejas_de_bahia(b0, b1, s)
                piezas.append((f"Reja_{lado}{k + 1}", lambda m, ra=ra, rb=rb: construir_reja(m, ra, rb)))
    if INCLUIR_VEREDA:
        piezas.append(("Vereda", construir_vereda))

    objetos, total = [], 0
    for nombre, fn in piezas:
        m = Malla()
        fn(m)
        objetos.append(crear_objeto(nombre, m, col))
        total += len(m.tris)

    w = HOJA_ANCHO
    for nombre, lado in (("Hoja_Izquierda", -1), ("Hoja_Derecha", 1)):
        m = Malla()
        construir_hoja(m, lado)
        eje = (lado * w, Y_D, Z_P)
        props = {"eje_bisagra": list(P(eje)), "ancho": w, "alto": VANO_ALTO, "espesor": HOJA_ESPESOR,
                 "signo_apertura": 1 if lado < 0 else -1,
                 "nota": "Rotar alrededor del eje vertical local (arriba). signo_apertura*angulo > 0 abre hacia adentro."}
        objetos.append(crear_objeto(nombre, m, col, origen=eje, props=props))
        total += len(m.tris)

    # ---------- informe ----------
    print("\n" + "=" * 96)
    print(f" Fachada Banco Central v3 — EJE_ARRIBA={EJE_ARRIBA}  MAX_ARISTA={MAX_ARISTA} m  N_BAHIAS={N_BAHIAS}"
          f"  ({time.time() - t0:.1f} s)")
    print(f" Ancho total {2 * SEMI:.2f} m (X ±{SEMI:.2f}), alto {ALTO_TOTAL:.2f} m (umbral a {Y_D:.2f}, puerta {VANO_ANCHO:.2f} x {VANO_ALTO:.2f})."
          f"  16:9 con toda la altura => {ALTO_TOTAL * 16 / 9:.1f} m visibles de ancho; 21:9 => {ALTO_TOTAL * 21 / 9:.1f} m.")
    print("=" * 96)
    print(f" {'objeto':18s} {'verts':>7s} {'tris':>7s}   bbox (marco de diseño: X der, Y arriba, Z frente)")
    gmin, gmax = [1e9] * 3, [-1e9] * 3
    problemas = []
    for ob in objetos:
        me = ob.data
        if any(len(p.vertices) != 3 for p in me.polygons):
            problemas.append(f"{ob.name}: hay caras no trianguladas")
        if tuple(ob.scale) != (1.0, 1.0, 1.0) or any(abs(a) > 1e-9 for a in ob.rotation_euler):
            problemas.append(f"{ob.name}: transformación no aplicada")
        mn, mx = [1e9] * 3, [-1e9] * 3
        for v in me.vertices:
            co = ob.matrix_world @ v.co
            d = (co.x, co.y, co.z) if EJE_ARRIBA == "Y" else (co.x, co.z, -co.y)
            for i in range(3):
                mn[i] = min(mn[i], d[i]); mx[i] = max(mx[i], d[i])
                gmin[i] = min(gmin[i], d[i]); gmax[i] = max(gmax[i], d[i])
        print(f" {ob.name:18s} {len(me.vertices):7d} {len(me.polygons):7d}   "
              f"X[{mn[0]:+.2f},{mx[0]:+.2f}] Y[{mn[1]:+.2f},{mx[1]:+.2f}] Z[{mn[2]:+.2f},{mx[2]:+.2f}]")
    print("-" * 96)
    print(f" TOTAL: {len(objetos)} objetos, {total} triángulos   bbox X[{gmin[0]:+.2f},{gmax[0]:+.2f}] "
          f"Y[{gmin[1]:+.2f},{gmax[1]:+.2f}] Z[{gmin[2]:+.2f},{gmax[2]:+.2f}]")
    for ob in objetos:
        if ob.name.startswith("Hoja"):
            print(f" {ob.name}: origen (bisagra) en {tuple(round(c, 3) for c in ob.location)}  signo_apertura={ob['signo_apertura']}")
    if problemas:
        print(" PROBLEMAS:"); [print("   -", p) for p in problemas]
    else:
        print(" Chequeos: todo triangulado, sin rotación/escala en objetos, hojas con origen en bisagras. OK")
    print("=" * 96 + "\n")
    return objetos


def exportar(objetos, glb=None, obj=None):
    if glb:
        bpy.ops.export_scene.gltf(filepath=glb, export_format="GLB", export_yup=(EJE_ARRIBA == "Z"),
                                  export_apply=True, export_materials="NONE", export_normals=True,
                                  export_texcoords=False, export_extras=True, use_selection=False)
        print(" GLB ->", glb, "(export_yup =", EJE_ARRIBA == "Z", ")")
    if obj:
        if EJE_ARRIBA == "Y":
            bpy.ops.wm.obj_export(filepath=obj, forward_axis="Y", up_axis="Z", export_materials=False,
                                  export_uv=False, export_normals=True, export_triangulated_mesh=True)
        else:
            bpy.ops.wm.obj_export(filepath=obj, forward_axis="NEGATIVE_Z", up_axis="Y", export_materials=False,
                                  export_uv=False, export_normals=True, export_triangulated_mesh=True)
        print(" OBJ ->", obj)


def _directorio():
    try:
        return os.path.dirname(os.path.abspath(__file__))
    except NameError:
        return os.getcwd()


if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    glb = obj = None
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "--glb": glb = argv[i + 1]; i += 1
        elif a == "--obj": obj = argv[i + 1]; i += 1
        elif a == "--eje": EJE_ARRIBA = argv[i + 1].upper(); i += 1
        elif a == "--bahias": N_BAHIAS = int(argv[i + 1]); i += 1
        elif a == "--arista": MAX_ARISTA = float(argv[i + 1]); i += 1
        elif a == "--sin-vereda": INCLUIR_VEREDA = False
        elif a == "--sin-rejas": INCLUIR_REJAS = False
        elif a == "--sin-juntas": INCLUIR_JUNTAS = False
        elif a == "--sin-inscripcion": INCLUIR_INSCRIPCION = False
        elif a == "--blend": ARCHIVO_BLEND = argv[i + 1]; i += 1
        i += 1
    objetos = construir_todo()
    if ARCHIVO_BLEND:
        ruta = ARCHIVO_BLEND if os.path.isabs(ARCHIVO_BLEND) else os.path.join(_directorio(), ARCHIVO_BLEND)
        bpy.ops.wm.save_as_mainfile(filepath=ruta)
        print(" BLEND ->", ruta)
    exportar(objetos, glb, obj)
