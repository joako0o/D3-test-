"""
Puerta principal del Banco Central de Chile (Agustinas 1180, Santiago).
Arquitecto Alberto Cruz Montt, 1927-28. Puerta de bronce de dos hojas,
6,2 m de alto x 3,5 m de ancho, 6 toneladas; escalinata de 5 peldaños y
dos faroles de pedestal con cinco globos de opalina blanca.

Uso:
    blender -b -P build_door.py                # Cycles por defecto
    blender -b -P build_door.py -- --engine EEVEE --samples 64
    (o pegar en el Text Editor de Blender y ejecutar)
"""
import bpy
import math
import os
import sys
from mathutils import Vector

ROOT = "CentralBankDoor"

# ---------------------------------------------------------------------------
# Dimensiones reales (metros)
# ---------------------------------------------------------------------------
DOOR_W = 3.5          # ancho total del vano
DOOR_H = 6.2          # alto de la puerta
LEAF_W = DOOR_W / 2   # cada hoja
LEAF_T = 0.12         # espesor de la hoja
STILE = 0.20          # ancho de largueros / peinazos
STEP_RISE = 0.16
STEP_TREAD = 0.36
STEP_COUNT = 5
PILASTER_X = 3.35     # eje de las pilastras (deja ~0.5 m de muro junto a la jamba)
PLAQUE_X = DOOR_W / 2 + 0.06 + 0.26 + 0.14   # sobre la jamba, justo afuera de la moldura del marco
PLAQUE_Z = 2.35                              # altura sobre el descanso (~2,3 m, a nivel de la vista)
PLAQUE_SIDES = "both"                        # se sobreescribe con --plaque
LAMP_X, LAMP_Y = 3.75, -2.1              # faroles a nivel de vereda, junto a la escalinata
LANDING_Z = STEP_RISE * STEP_COUNT   # nivel de la puerta sobre la vereda
FRONT = -1            # la fachada mira hacia -Y (la cámara está en -Y)


# ---------------------------------------------------------------------------
# Utilidades
# ---------------------------------------------------------------------------
def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    opts = {"engine": "CYCLES", "samples": 128, "res": 1200, "render": True,
            "full": False,        # True = fachada completa con friso e inscripción
            "lamps": True,        # faroles de 5 globos (--no-lamps para omitirlos)
            "transparent": True,  # PNG con alfa para superponer al fondo del scrolly
            "open": 0.0,          # ángulo de apertura (grados) del render estático
            "max_open": 85.0,     # ángulo final de la animación
            "frames": 0,          # >0 = renderiza secuencia cerrada→abierta
            "glb": False,         # exportar GLB con animación para three.js
            "finish": "aged",     # acabado del bronce: polished | aged | matte | dark
            "light": 1.0,         # multiplicador global de las luces de fachada
            "lamp_glow": 1.0,     # multiplicador de la emisión/luz de los faroles
            "interior_glow": 1.0, # multiplicador de la luz que sale del interior
            "plaque": "both"}     # left = placa "1180", right = medallón cóndor, both, none
    it = iter(argv)
    for arg in it:
        if arg == "--engine":
            opts["engine"] = next(it).upper()
        elif arg == "--samples":
            opts["samples"] = int(next(it))
        elif arg == "--res":
            opts["res"] = int(next(it))
        elif arg == "--no-render":
            opts["render"] = False
        elif arg == "--full":
            opts["full"] = True
        elif arg == "--lamps":
            opts["lamps"] = True
        elif arg == "--no-lamps":
            opts["lamps"] = False
        elif arg == "--opaque":
            opts["transparent"] = False
        elif arg == "--open":
            opts["open"] = float(next(it))
        elif arg == "--max-open":
            opts["max_open"] = float(next(it))
        elif arg == "--frames":
            opts["frames"] = int(next(it))
        elif arg == "--glb":
            opts["glb"] = True
        elif arg == "--finish":
            opts["finish"] = next(it).lower()
        elif arg == "--light":
            opts["light"] = float(next(it))
        elif arg == "--lamp-glow":
            opts["lamp_glow"] = float(next(it))
        elif arg == "--interior-glow":
            opts["interior_glow"] = float(next(it))
        elif arg == "--plaque":
            opts["plaque"] = next(it).lower()
    return opts


def project_dir():
    if "__file__" in globals() and __file__:
        return os.path.dirname(os.path.abspath(__file__))
    if bpy.data.filepath:
        return os.path.dirname(bpy.data.filepath)
    return os.getcwd()


def clear_scene():
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for coll in list(bpy.data.collections):
        bpy.data.collections.remove(coll)
    for block_list in (bpy.data.meshes, bpy.data.curves, bpy.data.materials,
                       bpy.data.lights, bpy.data.cameras, bpy.data.node_groups):
        for block in list(block_list):
            if block.users == 0:
                block_list.remove(block)


def collection(name):
    coll = bpy.data.collections.get(name)
    if coll is None:
        coll = bpy.data.collections.new(name)
        bpy.context.scene.collection.children.link(coll)
    return coll


def move_to(obj, target):
    for owner in list(obj.users_collection):
        owner.objects.unlink(obj)
    target.objects.link(obj)


def look_at(obj, point):
    direction = Vector(point) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def add_bevel(obj, width, segments=3):
    if width <= 0:
        return
    mod = obj.modifiers.new("Bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.harden_normals = True
    if hasattr(obj.data, "use_auto_smooth"):   # Blender <= 4.0
        obj.data.use_auto_smooth = True


# ---------------------------------------------------------------------------
# Materiales
# ---------------------------------------------------------------------------
def _new_material(name):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    out = nodes.new("ShaderNodeOutputMaterial")
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (-300, 0)
    links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat, bsdf, nodes, links


def stone_material(name, color, roughness=0.75, noise_scale=6.0, variation=0.12):
    """Piedra gris clara (revestimiento de la fachada) con leve variación."""
    mat, bsdf, nodes, links = _new_material(name)
    mat.diffuse_color = (*color, 1.0)
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = 0.0

    tex = nodes.new("ShaderNodeTexCoord")
    noise = nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = noise_scale
    noise.inputs["Detail"].default_value = 6.0
    ramp = nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (*[c * (1 - variation) for c in color], 1)
    ramp.color_ramp.elements[1].color = (*[min(1, c * (1 + variation)) for c in color], 1)
    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.08
    links.new(tex.outputs["Object"], noise.inputs["Vector"])
    links.new(noise.outputs["Fac"], ramp.inputs["Fac"])
    links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    links.new(noise.outputs["Fac"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def bronze_material(name, base=(0.72, 0.48, 0.20), patina=(0.30, 0.20, 0.09),
                    roughness_min=0.22, roughness_max=0.48, noise=1.0):
    """Bronce pulido con pátina en los recovecos (rugosidad variable)."""
    mat, bsdf, nodes, links = _new_material(name)
    mat.diffuse_color = (*base, 1.0)
    bsdf.inputs["Metallic"].default_value = 1.0
    bsdf.inputs["Base Color"].default_value = (*base, 1.0)

    tex = nodes.new("ShaderNodeTexCoord")
    noise_tex = nodes.new("ShaderNodeTexNoise")
    noise_tex.inputs["Scale"].default_value = 18.0
    noise_tex.inputs["Detail"].default_value = 8.0
    noise_tex.inputs["Roughness"].default_value = 0.7
    color_ramp = nodes.new("ShaderNodeValToRGB")
    color_ramp.color_ramp.elements[0].position = 0.35
    color_ramp.color_ramp.elements[0].color = (*patina, 1)
    color_ramp.color_ramp.elements[1].position = 0.65
    color_ramp.color_ramp.elements[1].color = (*base, 1)
    rough_map = nodes.new("ShaderNodeMapRange")
    rough_map.inputs["To Min"].default_value = roughness_max
    rough_map.inputs["To Max"].default_value = roughness_min
    mix = nodes.new("ShaderNodeMix")
    mix.data_type = "RGBA"
    mix.inputs["Factor"].default_value = max(0.0, min(1.0, noise))
    mix.inputs[6].default_value = (*base, 1)          # A: color plano
    links.new(tex.outputs["Object"], noise_tex.inputs["Vector"])
    links.new(noise_tex.outputs["Fac"], color_ramp.inputs["Fac"])
    links.new(color_ramp.outputs["Color"], mix.inputs[7])   # B: pátina moteada
    links.new(mix.outputs[2], bsdf.inputs["Base Color"])
    links.new(noise_tex.outputs["Fac"], rough_map.inputs["Value"])
    links.new(rough_map.outputs["Result"], bsdf.inputs["Roughness"])
    return mat


# Acabados del bronce. Rugosidad baja = brillante/espejo; alta = mate.
# "noise" controla cuánto se nota el moteado de la pátina (0 = liso uniforme).
BRONZE_FINISHES = {
    "polished": dict(base=(0.80, 0.56, 0.24), patina=(0.62, 0.42, 0.17), rough=(0.12, 0.28), noise=0.3),
    "aged":     dict(base=(0.72, 0.48, 0.20), patina=(0.30, 0.20, 0.09), rough=(0.22, 0.48), noise=1.0),
    "matte":    dict(base=(0.62, 0.43, 0.19), patina=(0.42, 0.28, 0.12), rough=(0.55, 0.75), noise=0.5),
    "dark":     dict(base=(0.40, 0.27, 0.12), patina=(0.16, 0.10, 0.05), rough=(0.40, 0.65), noise=0.8),
}


def bronze_set(finish):
    """Devuelve (bronce principal, bronce oscuro para fondos, bronce mate para campos)."""
    p = BRONZE_FINISHES.get(finish, BRONZE_FINISHES["aged"])
    lo, hi = p["rough"]
    main = bronze_material("MAT_Bronze", base=p["base"], patina=p["patina"], roughness_min=lo, roughness_max=hi, noise=p["noise"])
    dark = bronze_material("MAT_Bronze_Dark", base=tuple(c * 0.7 for c in p["base"]), patina=tuple(c * 0.6 for c in p["patina"]),
                           roughness_min=lo + 0.15, roughness_max=hi + 0.2, noise=p["noise"])
    matte = bronze_material("MAT_Bronze_Matte", base=tuple(c * 0.85 for c in p["base"]), patina=p["patina"],
                            roughness_min=max(lo, 0.45), roughness_max=max(hi, 0.7), noise=p["noise"])
    return main, dark, matte


def opaline_material(name, strength=3.0):
    """Globo de opalina blanca: vidrio lechoso + emisión cálida."""
    mat, bsdf, nodes, links = _new_material(name)
    mat.diffuse_color = (1.0, 0.95, 0.85, 1.0)
    bsdf.inputs["Base Color"].default_value = (1.0, 0.97, 0.9, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.35
    if "Subsurface Weight" in bsdf.inputs:      # Blender >= 4.0
        bsdf.inputs["Subsurface Weight"].default_value = 0.4
    emission = bsdf.inputs.get("Emission Color") or bsdf.inputs.get("Emission")
    emission.default_value = (1.0, 0.86, 0.66, 1.0)
    bsdf.inputs["Emission Strength"].default_value = strength
    return mat


def emissive_material(name, color, strength):
    mat, bsdf, nodes, links = _new_material(name)
    mat.diffuse_color = (*color, 1.0)
    emission = nodes.new("ShaderNodeEmission")
    emission.inputs["Color"].default_value = (*color, 1.0)
    emission.inputs["Strength"].default_value = strength
    out = next(n for n in nodes if n.type == "OUTPUT_MATERIAL")
    links.new(emission.outputs["Emission"], out.inputs["Surface"])
    return mat


def simple_material(name, color, metallic=0.0, roughness=0.5):
    mat, bsdf, _, _ = _new_material(name)
    mat.diffuse_color = (*color, 1.0)
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat


# ---------------------------------------------------------------------------
# Primitivas
# ---------------------------------------------------------------------------
def box(name, center, size, mat, target, bevel=0.0):
    """Caja definida por centro y tamaño TOTAL (no medio-tamaño)."""
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=center)
    obj = bpy.context.object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    move_to(obj, target)
    add_bevel(obj, min(bevel, min(size) * 0.45))
    return obj


def cyl(name, center, radius, depth, mat, target, axis="Z", vertices=48, bevel=None):
    rotation = {"Z": (0, 0, 0), "Y": (math.pi / 2, 0, 0), "X": (0, math.pi / 2, 0)}[axis]
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth,
                                        location=center, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    move_to(obj, target)
    add_bevel(obj, min(radius * 0.15, 0.02) if bevel is None else bevel, 2)
    return obj


def sphere(name, center, scale, mat, target, segments=24, rings=12):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings,
                                         location=center, scale=scale)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    bpy.ops.object.shade_smooth()
    move_to(obj, target)
    return obj


def torus(name, center, major, minor, mat, target, axis="Y"):
    rotation = {"Z": (0, 0, 0), "Y": (math.pi / 2, 0, 0), "X": (0, math.pi / 2, 0)}[axis]
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor,
                                     major_segments=48, minor_segments=16,
                                     location=center, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    bpy.ops.object.shade_smooth()
    move_to(obj, target)
    return obj


def text(name, center, body, size, mat, target, extrude=0.015):
    bpy.ops.object.text_add(location=center, rotation=(math.pi / 2, 0, 0))
    obj = bpy.context.object
    obj.name = name
    obj.data.body = body
    obj.data.size = size
    obj.data.extrude = extrude
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    obj.data.space_character = 1.15
    obj.data.materials.append(mat)
    move_to(obj, target)
    return obj


# ---------------------------------------------------------------------------
# Ornamentos de bronce
# ---------------------------------------------------------------------------
def rosette_cartouche(prefix, x, y, z, size, mats, target):
    """Placa cuadrada con roseta central (paneles superior e inferior)."""
    plate = box(f"{prefix}_Plate", (x, y - 0.02, z), (size, 0.04, size), mats["bronze"], target, 0.01)
    box(f"{prefix}_Field", (x, y - 0.045, z), (size * 0.78, 0.02, size * 0.78), mats["bronze_dark"], target, 0.006)
    # roseta central
    cyl(f"{prefix}_Boss", (x, y - 0.075, z), size * 0.16, 0.05, mats["bronze"], target, axis="Y", vertices=24)
    sphere(f"{prefix}_Core", (x, y - 0.10, z), (size * 0.07,) * 3, mats["bronze"], target)
    petals = 8
    for i in range(petals):
        a = i * 2 * math.pi / petals
        r = size * 0.24
        p = sphere(f"{prefix}_Petal_{i}", (x + math.cos(a) * r, y - 0.07, z + math.sin(a) * r),
                   (size * 0.09, 0.02, size * 0.16), mats["bronze"], target, 12, 8)
        p.rotation_euler = (0, -a + math.pi / 2, 0)
    # hojas de acanto en las esquinas
    for i, (sx, sz) in enumerate(((-1, -1), (1, -1), (-1, 1), (1, 1))):
        leaf = sphere(f"{prefix}_Corner_{i}", (x + sx * size * 0.33, y - 0.06, z + sz * size * 0.33),
                      (size * 0.10, 0.02, size * 0.06), mats["bronze"], target, 12, 8)
        leaf.rotation_euler = (0, math.atan2(sz, sx) + math.pi / 2, 0)
    return plate


def fleur_de_lis_knocker(prefix, x, y, z, mats, target):
    """Aldabón real: flor de lis en relieve de la que cuelga una argolla circular gruesa."""
    fy = y - 0.02
    # flor de lis: pétalo central alto, dos laterales curvados hacia afuera, y cinta horizontal
    center = sphere(f"{prefix}_Petal_C", (x, fy - 0.02, z + 0.12), (0.028, 0.02, 0.095), mats["bronze"], target, 16, 10)
    for sx in (-1, 1):
        side = sphere(f"{prefix}_Petal_{'L' if sx < 0 else 'R'}", (x + sx * 0.05, fy - 0.02, z + 0.10), (0.022, 0.018, 0.07), mats["bronze"], target, 16, 10)
        side.rotation_euler = (0, sx * math.radians(-30), 0)
        # punta del pétalo lateral que se curva hacia afuera y abajo (voluta)
        curl = sphere(f"{prefix}_Curl_{'L' if sx < 0 else 'R'}", (x + sx * 0.078, fy - 0.02, z + 0.06), (0.022, 0.016, 0.03), mats["bronze"], target, 12, 8)
        curl.rotation_euler = (0, sx * math.radians(-75), 0)
        curl2 = sphere(f"{prefix}_Curl2_{'L' if sx < 0 else 'R'}", (x + sx * 0.088, fy - 0.02, z + 0.035), (0.018, 0.016, 0.018), mats["bronze"], target, 12, 8)
        lower = sphere(f"{prefix}_Lower_{'L' if sx < 0 else 'R'}", (x + sx * 0.035, fy - 0.02, z - 0.02), (0.016, 0.015, 0.035), mats["bronze"], target, 12, 8)
        lower.rotation_euler = (0, sx * math.radians(30), 0)
    box(f"{prefix}_Band", (x, fy - 0.025, z + 0.02), (0.11, 0.03, 0.03), mats["bronze"], target, 0.008)
    sphere(f"{prefix}_Stem", (x, fy - 0.02, z - 0.03), (0.018, 0.015, 0.045), mats["bronze"], target, 12, 8)
    # pasador y argolla colgante (anillo grueso, ~26 cm de diámetro)
    cyl(f"{prefix}_Pin", (x, fy - 0.05, z - 0.06), 0.018, 0.06, mats["bronze_dark"], target, axis="X", vertices=16)
    ring = torus(f"{prefix}_Ring", (x, fy - 0.05, z - 0.19), 0.13, 0.024, mats["bronze"], target, axis="Y")
    # pequeño "nudo" en la parte baja de la argolla, como en el original
    box(f"{prefix}_Knot", (x, fy - 0.05, z - 0.32), (0.05, 0.05, 0.05), mats["bronze"], target, 0.012)
    return ring


def leaf_panel(prefix, x, y, z, w, h, mats, target, ornament=None):
    """Panel embutido con moldura perimetral en relieve."""
    face_y = y - LEAF_T / 2
    box(f"{prefix}_Field", (x, face_y - 0.01, z), (w, 0.02, h), mats["bronze_matte"], target, 0.004)
    m = 0.07  # ancho de la moldura
    d = 0.05  # saliente de la moldura
    box(f"{prefix}_Mold_T", (x, face_y - d / 2 + 0.01, z + h / 2 - m / 2), (w, d, m), mats["bronze"], target, 0.018)
    box(f"{prefix}_Mold_B", (x, face_y - d / 2 + 0.01, z - h / 2 + m / 2), (w, d, m), mats["bronze"], target, 0.018)
    box(f"{prefix}_Mold_L", (x - w / 2 + m / 2, face_y - d / 2 + 0.01, z), (m, d, h - 2 * m), mats["bronze"], target, 0.018)
    box(f"{prefix}_Mold_R", (x + w / 2 - m / 2, face_y - d / 2 + 0.01, z), (m, d, h - 2 * m), mats["bronze"], target, 0.018)
    # hilera de cuentas (perlado) en el borde interior de la moldura
    bead_r = 0.012
    bead_step = bead_r * 2.4
    bx0, bx1 = x - w / 2 + m + bead_r, x + w / 2 - m - bead_r
    bz0, bz1 = z - h / 2 + m + bead_r, z + h / 2 - m - bead_r
    beads = []
    n_x = max(2, int((bx1 - bx0) / bead_step))
    n_z = max(2, int((bz1 - bz0) / bead_step))
    for i in range(n_x + 1):
        bx = bx0 + (bx1 - bx0) * i / n_x
        beads += [(bx, bz0), (bx, bz1)]
    for j in range(1, n_z):
        bz = bz0 + (bz1 - bz0) * j / n_z
        beads += [(bx0, bz), (bx1, bz)]
    bead_mesh = None
    for k, (bx, bz) in enumerate(beads):
        b = sphere(f"{prefix}_Bead_{k}", (bx, face_y - 0.008, bz), (bead_r,) * 3, mats["bronze"], target, 8, 6)
        if bead_mesh is None:
            bead_mesh = b
        else:
            b.data = bead_mesh.data      # comparten malla (instancias ligeras)
    inner_y = face_y + 0.0
    if ornament == "rosette":
        rosette_cartouche(f"{prefix}_Rosette", x, inner_y, z, min(w, h) * 0.62, mats, target)
    elif ornament == "knocker":
        fleur_de_lis_knocker(f"{prefix}_Knocker", x, inner_y, z + 0.10, mats, target)


def door_leaf(prefix, x, mats, leaf_coll, hardware_coll):
    """Una hoja articulada: devuelve el Empty-pivote (en la bisagra) del que cuelga todo.

    Rotar `pivot.rotation_euler.z` abre la hoja hacia el interior (+Y).
    """
    before = set(bpy.data.objects)
    _door_leaf_geometry(prefix, x, mats, leaf_coll, hardware_coll)
    created = [o for o in bpy.data.objects if o not in before]

    hinge_x = math.copysign(DOOR_W / 2, x)
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=(hinge_x, 0.0, LANDING_Z))
    pivot = bpy.context.object
    pivot.name = f"{prefix}_Pivot"
    pivot.empty_display_size = 0.4
    move_to(pivot, leaf_coll)
    for obj in created:
        obj.parent = pivot
        obj.matrix_parent_inverse = pivot.matrix_world.inverted()
    # sentido de giro: la hoja izquierda (bisagra en -X) abre con +Z, la derecha con -Z
    pivot["open_sign"] = 1.0 if x < 0 else -1.0
    return pivot


def set_door_opening(pivots, degrees):
    for pivot in pivots:
        if pivot.animation_data:           # los keyframes sobrescribirían el valor manual
            pivot.animation_data_clear()
        pivot.rotation_euler = (0, 0, math.radians(degrees) * pivot["open_sign"])


def animate_door(pivots, scene, max_degrees, frame_start=1, frame_end=48):
    """Keyframes cerrada→abierta con easing suave (exportables a glTF)."""
    scene.frame_start, scene.frame_end = frame_start, frame_end
    for pivot in pivots:
        pivot.rotation_euler = (0, 0, 0)
        pivot.keyframe_insert("rotation_euler", frame=frame_start)
        pivot.rotation_euler = (0, 0, math.radians(max_degrees) * pivot["open_sign"])
        pivot.keyframe_insert("rotation_euler", frame=frame_end)
        action = pivot.animation_data.action
        if hasattr(action, "fcurves"):                       # Blender <= 4.3
            fcurves = list(action.fcurves)
        else:                                                # Blender >= 4.4 (layered actions)
            fcurves = [fc for layer in action.layers for strip in layer.strips
                       for bag in strip.channelbags for fc in bag.fcurves]
        for fc in fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = "BEZIER"
                kp.easing = "EASE_IN_OUT"
    scene.frame_set(frame_start)


def _door_leaf_geometry(prefix, x, mats, leaf_coll, hardware_coll):
    """Una hoja: zócalo, panel inferior con roseta, panel alto con león, panel superior."""
    z0 = LANDING_Z
    zc = z0 + DOOR_H / 2
    leaf = box(f"{prefix}_Leaf", (x, 0, zc), (LEAF_W, LEAF_T, DOOR_H), mats["bronze"], leaf_coll, 0.01)
    face_y = -LEAF_T / 2
    panel_w = LEAF_W - 2 * STILE
    # Zócalo liso
    box(f"{prefix}_Plinth", (x, face_y - 0.015, z0 + 0.32), (LEAF_W - 0.04, 0.03, 0.62), mats["bronze"], leaf_coll, 0.008)
    # Distribución vertical: [zócalo 0.65][panel bajo 1.45][peinazo][panel alto 2.05][peinazo][panel sup 1.05][peinazo]
    bottom_z = z0 + 0.65 + STILE + 1.45 / 2
    middle_z = bottom_z + 1.45 / 2 + STILE + 2.05 / 2
    top_z = middle_z + 2.05 / 2 + STILE + 1.05 / 2
    leaf_panel(f"{prefix}_Bottom", x, 0, bottom_z, panel_w, 1.45, mats, hardware_coll, "rosette")
    leaf_panel(f"{prefix}_Middle", x, 0, middle_z, panel_w, 2.05, mats, hardware_coll, "knocker")
    leaf_panel(f"{prefix}_Top", x, 0, top_z, panel_w, 1.05, mats, hardware_coll, "rosette")
    # Tirador / cerradura junto al batiente central
    inner = x - math.copysign(LEAF_W / 2 - 0.10, x)
    box(f"{prefix}_LockPlate", (inner, face_y - 0.01, z0 + 2.95), (0.06, 0.02, 0.30), mats["bronze_dark"], hardware_coll, 0.004)
    # Bisagras del lado del marco
    outer = x + math.copysign(LEAF_W / 2 + 0.02, x)
    for i, hz in enumerate((0.7, 2.4, 4.1, 5.7)):
        cyl(f"{prefix}_Hinge_{i}", (outer, face_y + 0.02, z0 + hz), 0.035, 0.28, mats["bronze_dark"], hardware_coll, axis="Z", vertices=16)
    return leaf


# ---------------------------------------------------------------------------
# Fachada de piedra
# ---------------------------------------------------------------------------
def pilaster(prefix, x, mats, coll, base_z, top_z, width=0.95, depth=0.28):
    """Pilastra de orden gigante con fuste acanalado y capitel corintio simplificado."""
    pedestal_h = 1.1
    box(f"{prefix}_Pedestal", (x, -depth / 2 - 0.05, base_z + pedestal_h / 2), (width + 0.16, depth + 0.1, pedestal_h), mats["stone"], coll, 0.02)
    box(f"{prefix}_PedestalCap", (x, -depth / 2 - 0.08, base_z + pedestal_h + 0.06), (width + 0.26, depth + 0.16, 0.12), mats["stone"], coll, 0.02)
    shaft_z0 = base_z + pedestal_h + 0.12
    cap_h = 1.0
    shaft_h = top_z - cap_h - shaft_z0
    shaft = box(f"{prefix}_Shaft", (x, -depth / 2, shaft_z0 + shaft_h / 2), (width, depth, shaft_h), mats["stone"], coll, 0.015)
    # Acanaladuras mediante boolean (una sola operación con los cilindros unidos)
    flutes = []
    n = 5
    for i in range(n):
        fx = x - width / 2 + width * (i + 0.5) / n
        bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=width / n * 0.36, depth=shaft_h - 0.5,
                                            location=(fx, -depth - 0.01, shaft_z0 + shaft_h / 2))
        flutes.append(bpy.context.object)
    for f in flutes:
        f.select_set(True)
    bpy.context.view_layer.objects.active = flutes[0]
    bpy.ops.object.join()
    cutter = bpy.context.object
    cutter.name = f"{prefix}_FluteCutter"
    cutter.display_type = "WIRE"
    cutter.hide_render = True
    cutter.hide_viewport = True
    move_to(cutter, coll)
    boolean = shaft.modifiers.new("Flutes", "BOOLEAN")
    boolean.operation = "DIFFERENCE"
    boolean.object = cutter
    boolean.solver = "EXACT"
    # Capitel: collarín, hojas de acanto en dos hileras, volutas y ábaco
    cz = shaft_z0 + shaft_h
    box(f"{prefix}_Astragal", (x, -depth / 2 - 0.02, cz + 0.04), (width + 0.06, depth + 0.04, 0.08), mats["stone"], coll, 0.02)
    for row, (rz, rscale, count) in enumerate(((0.28, 0.26, 4), (0.55, 0.30, 3))):
        for i in range(count):
            lx = x - width / 2 + width * (i + 0.5) / count
            leaf = sphere(f"{prefix}_Acanthus_{row}_{i}", (lx, -depth - 0.06, cz + rz), (rscale * 0.55, 0.12, rscale), mats["stone"], coll, 16, 10)
            leaf.rotation_euler = (math.radians(-18), 0, 0)
    for sx in (-1, 1):
        torus(f"{prefix}_Volute_{sx}", (x + sx * (width / 2 - 0.05), -depth - 0.12, cz + 0.80), 0.11, 0.045, mats["stone"], coll, axis="Y")
    box(f"{prefix}_Abacus", (x, -depth / 2 - 0.06, cz + cap_h - 0.07), (width + 0.36, depth + 0.16, 0.14), mats["stone"], coll, 0.02)


def address_plaque(prefix, x, wall_y, z, mats, target):
    """Placa ovalada de bronce lisa (~16 x 11 cm) donde va el número de calle."""
    w, h, t = 0.16, 0.11, 0.02
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.5, depth=t,
                                        location=(x, wall_y - t / 2, z), rotation=(math.pi / 2, 0, 0))
    plate = bpy.context.object
    plate.name = f"{prefix}_Plate"
    plate.scale = (w, h, 1.0)
    bpy.ops.object.transform_apply(scale=True)
    plate.data.materials.append(mats["bronze"])
    add_bevel(plate, 0.004, 2)
    move_to(plate, target)
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.5, depth=0.004,
                                        location=(x, wall_y - t - 0.001, z), rotation=(math.pi / 2, 0, 0))
    field = bpy.context.object
    field.name = f"{prefix}_Field"
    field.scale = (w * 0.84, h * 0.80, 1.0)
    bpy.ops.object.transform_apply(scale=True)
    field.data.materials.append(mats["bronze_matte"])
    move_to(field, target)
    return plate


def plain_medallion(prefix, x, wall_y, z, mats, target, radius=0.11):
    """Medallón circular de bronce liso (~22 cm): disco con borde biselado y aro fino."""
    t = 0.02
    cyl(f"{prefix}_Plate", (x, wall_y - t / 2, z), radius, t, mats["bronze"], target, axis="Y", vertices=64, bevel=0.004)
    torus(f"{prefix}_Rim", (x, wall_y - t, z), radius * 0.86, 0.004, mats["bronze"], target, axis="Y")
    cyl(f"{prefix}_Field", (x, wall_y - t - 0.001, z), radius * 0.84, 0.003, mats["bronze_matte"], target, axis="Y", vertices=64, bevel=0.0)


def door_surround(mats, coll):
    """Marco de piedra (jambas + dintel) y arquitrabe moldurado alrededor del vano."""
    z0 = LANDING_Z
    jamb_w, jamb_d = 0.55, 0.30
    lintel_h = 0.75
    for sx in (-1, 1):
        x = sx * (DOOR_W / 2 + jamb_w / 2)
        box(f"Surround_Jamb_{'L' if sx < 0 else 'R'}", (x, -jamb_d / 2, z0 + DOOR_H / 2), (jamb_w, jamb_d, DOOR_H), mats["stone"], coll, 0.01)
        box(f"Surround_JambFillet_{'L' if sx < 0 else 'R'}", (sx * (DOOR_W / 2 + 0.06 + 0.10), -jamb_d - 0.015, z0 + DOOR_H / 2), (0.20, 0.03, DOOR_H), mats["stone"], coll, 0.008)
    box("Surround_Lintel", (0, -jamb_d / 2, z0 + DOOR_H + lintel_h / 2), (DOOR_W + 2 * jamb_w, jamb_d, lintel_h), mats["stone"], coll, 0.01)
    box("Surround_LintelFillet", (0, -jamb_d - 0.015, z0 + DOOR_H + 0.08), (DOOR_W + 0.48, 0.03, 0.16), mats["stone"], coll, 0.008)
    box("Surround_Cornice", (0, -jamb_d - 0.12, z0 + DOOR_H + lintel_h + 0.08), (DOOR_W + 2 * jamb_w + 0.4, 0.24 + jamb_d, 0.16), mats["stone"], coll, 0.02)
    # Marco de bronce del vano (batiente que recibe las hojas)
    fr = 0.06
    box("Surround_BronzeFrame_T", (0, -jamb_d / 2 - 0.02, z0 + DOOR_H + fr / 2), (DOOR_W + 2 * fr, jamb_d + 0.04, fr), mats["bronze"], coll, 0.006)
    for sx in (-1, 1):
        box(f"Surround_BronzeFrame_{sx}", (sx * (DOOR_W / 2 + fr / 2), -jamb_d / 2 - 0.02, z0 + DOOR_H / 2), (fr, jamb_d + 0.04, DOOR_H), mats["bronze"], coll, 0.006)
    # Paño de muro entre la jamba y la pilastra: al mismo plano que la jamba para que no
    # quede un canal en sombra (se veía como una línea negra en el render)
    jamb_outer = DOOR_W / 2 + jamb_w
    pil_inner = PILASTER_X - 0.95 / 2 - 0.08    # borde interior del pedestal/fuste
    panel_w = pil_inner - jamb_outer + 0.02
    panel_h = DOOR_H + lintel_h + 0.16
    for sx in (-1, 1):
        box(f"Surround_Spandrel_{'L' if sx < 0 else 'R'}",
            (sx * (jamb_outer + panel_w / 2 - 0.01), -jamb_d / 2 + 0.001 + 0.03, z0 + panel_h / 2),
            (panel_w, jamb_d - 0.06, panel_h), mats["stone"], coll, 0.0)
    # Sobre la cara de la jamba, junto al marco de bronce (según fotos de referencia):
    #   izquierda → placa oval lisa (número de calle)
    #   derecha   → medallón circular liso
    if PLAQUE_SIDES in ("left", "both"):
        address_plaque("Plaque", -PLAQUE_X, -jamb_d - 0.015, z0 + PLAQUE_Z, mats, coll)
    if PLAQUE_SIDES in ("right", "both"):
        plain_medallion("Medallion", PLAQUE_X, -jamb_d - 0.015, z0 + PLAQUE_Z + 0.35, mats, coll)


def interior(mats, coll, glow=1.0):
    """Vestíbulo detrás de la puerta: cuando las hojas se abren, sale luz cálida."""
    z0 = LANDING_Z
    depth, width, height = 5.0, 5.0, DOOR_H + 1.0
    box("Interior_Floor", (0, depth / 2 + 0.1, z0 - 0.05), (width, depth, 0.10), mats["marble"], coll, 0.0)
    box("Interior_Ceiling", (0, depth / 2, z0 + height + 0.05), (width, depth, 0.10), mats["stone_dark"], coll, 0.0)
    for sx in (-1, 1):
        box(f"Interior_Wall_{sx}", (sx * (width / 2 + 0.05), depth / 2, z0 + height / 2), (0.10, depth, height), mats["stone_dark"], coll, 0.0)
    box("Interior_BackWall", (0, depth + 0.05, z0 + height / 2), (width, 0.10, height), mats["stone_dark"], coll, 0.0)
    # Muro frontal interior alrededor del vano (evita ver el exterior a través del interior)
    box("Interior_FrontWall_T", (0, 0.30, z0 + DOOR_H + 0.5), (width, 0.40, 1.0), mats["stone_dark"], coll, 0.0)
    for sx in (-1, 1):
        box(f"Interior_FrontWall_{sx}", (sx * (DOOR_W / 2 + (width - DOOR_W) / 4), 0.30, z0 + DOOR_H / 2), ((width - DOOR_W) / 2, 0.40, DOOR_H), mats["stone_dark"], coll, 0.0)
    # Panel emisivo cálido al fondo + área light que empuja la luz hacia la puerta
    box("Interior_GlowPanel", (0, depth - 0.15, z0 + 3.2), (3.2, 0.05, 4.8), mats["glow"], coll, 0.0)
    bpy.ops.object.light_add(type="AREA", location=(0, 2.5, z0 + 5.5))
    light = bpy.context.object
    light.name = "Light_Interior"
    light.data.energy = 1500 * glow
    light.data.size = 3.5
    light.data.color = (1.0, 0.78, 0.50)
    look_at(light, (0, -1.0, z0 + 1.5))
    move_to(light, coll)


def wall_with_opening(prefix, mats, coll, wall_w, wall_h, wall_d=1.0, y_front=0.0):
    """Muro de fachada en tres piezas dejando libre el vano de la puerta."""
    z_top = LANDING_Z + DOOR_H + 0.75   # hasta el dintel de piedra
    side_w = (wall_w - DOOR_W) / 2
    yc = y_front + wall_d / 2
    for sx in (-1, 1):
        box(f"{prefix}_Wall_{'L' if sx < 0 else 'R'}", (sx * (DOOR_W / 2 + side_w / 2), yc, wall_h / 2), (side_w, wall_d, wall_h), mats["stone"], coll, 0.0)
    box(f"{prefix}_Wall_Top", (0, yc, (z_top + wall_h) / 2), (DOOR_W + 0.02, wall_d, wall_h - z_top), mats["stone"], coll, 0.0)


def facade(mats, coll):
    wall_w, wall_h, wall_d = 13.0, 11.5, 1.0
    wall_with_opening("Facade", mats, coll, wall_w, wall_h, wall_d)
    # Zócalo de granito oscuro a nivel de vereda
    box("Facade_Base", (0, -0.10, LANDING_Z / 2), (wall_w, 0.20, LANDING_Z), mats["granite"], coll, 0.0)
    # Pilastras de orden gigante que flanquean el acceso
    pil_top = 9.2
    for sx in (-1, 1):
        pilaster(f"Pilaster_{'L' if sx < 0 else 'R'}", sx * PILASTER_X, mats, coll, LANDING_Z, pil_top)
    # Entablamento: arquitrabe, friso con la inscripción y cornisa
    box("Entablature_Architrave", (0, -0.20, pil_top + 0.22), (wall_w, 0.40, 0.44), mats["stone"], coll, 0.01)
    box("Entablature_Frieze", (0, -0.16, pil_top + 0.44 + 0.55), (wall_w, 0.32, 1.10), mats["stone"], coll, 0.0)
    box("Entablature_Cornice", (0, -0.35, pil_top + 1.54 + 0.22), (wall_w, 0.70, 0.44), mats["stone"], coll, 0.02)
    text("Facade_Inscription", (0, -0.33, pil_top + 0.44 + 0.55), "BANCO CENTRAL DE CHILE", 0.62, mats["stone_dark"], coll, 0.02)
    # Ventanas laterales con marco de bronce (una a cada lado, como en la foto)
    for sx in (-1, 1):
        wx = sx * 5.4
        box(f"Window_Recess_{sx}", (wx, 0.08, 4.6), (2.2, 0.2, 4.4), mats["glass_dark"], coll, 0.0)
        for i in range(4):
            box(f"Window_Mullion_{sx}_{i}", (wx - 1.1 + i * 2.2 / 3, -0.03, 4.6), (0.06, 0.06, 4.4), mats["bronze_dark"], coll, 0.004)
        for i in range(5):
            box(f"Window_Transom_{sx}_{i}", (wx, -0.03, 2.4 + i * 1.1), (2.2, 0.06, 0.06), mats["bronze_dark"], coll, 0.004)
        box(f"Window_Sill_{sx}", (wx, -0.15, 2.32), (2.5, 0.30, 0.14), mats["stone"], coll, 0.02)


def compact_facade(mats, coll):
    """Solo lo que rodea al vano: tramo de muro, dos pilastras y una cornisa que remata."""
    wall_w = 8.6
    top = LANDING_Z + DOOR_H + 1.15   # cornisa del marco
    pil_top = top + 1.1               # las pilastras siguen un poco más arriba
    wall_h = pil_top + 0.5
    wall_with_opening("Facade", mats, coll, wall_w, wall_h, 1.0)
    box("Facade_Base", (0, -0.10, LANDING_Z / 2), (wall_w, 0.20, LANDING_Z), mats["granite"], coll, 0.0)
    for sx in (-1, 1):
        pilaster(f"Pilaster_{'L' if sx < 0 else 'R'}", sx * PILASTER_X, mats, coll, LANDING_Z, pil_top)
    box("Facade_Cornice", (0, -0.30, pil_top + 0.25), (wall_w, 0.60, 0.5), mats["stone"], coll, 0.02)


def stairs(mats, coll, with_sidewalk=True):
    """Escalinata de cinco peldaños de granito con huella real, nariz y zócalos laterales."""
    width = DOOR_W + 2 * 0.55 + 0.9
    total_depth = STEP_TREAD * STEP_COUNT + 0.6
    for i in range(STEP_COUNT):
        depth = STEP_TREAD * (STEP_COUNT - i) + 0.6
        z = STEP_RISE * (i + 0.5)
        step = box(f"Step_{i + 1}", (0, -depth / 2, z), (width, depth, STEP_RISE), mats["granite"], coll, 0.018)
        # nariz del peldaño: pequeño listón saliente que marca la sombra de cada huella
        box(f"Step_{i + 1}_Nosing", (0, -depth - 0.015, z + STEP_RISE / 2 - 0.02), (width, 0.03, 0.04), mats["granite"], coll, 0.008)
    # Zócalos (cheek walls) laterales que contienen la escalinata y dan volumen
    cheek_w = 0.45
    for sx in (-1, 1):
        cx = sx * (width / 2 + cheek_w / 2)
        box(f"Stair_Cheek_{'L' if sx < 0 else 'R'}", (cx, -total_depth / 2, LANDING_Z / 2 + 0.06), (cheek_w, total_depth, LANDING_Z + 0.12), mats["stone"], coll, 0.02)
        box(f"Stair_CheekCap_{'L' if sx < 0 else 'R'}", (cx, -total_depth / 2, LANDING_Z + 0.16), (cheek_w + 0.08, total_depth + 0.08, 0.08), mats["stone"], coll, 0.015)
    # Umbral de bronce bajo las hojas
    box("Threshold", (0, -0.05, LANDING_Z + 0.01), (DOOR_W + 0.1, 0.30, 0.02), mats["bronze_dark"], coll, 0.004)
    if with_sidewalk:
        box("Sidewalk", (0, -6.0, -0.05), (20, 12, 0.1), mats["pavement"], coll, 0.0)


def lamp_standard(prefix, x, y, mats, coll, glow=1.0):
    """Farol de pedestal: plinto de hormigón, fuste de bronce acanalado y 5 globos de opalina."""
    plinth_h = 1.0
    box(f"{prefix}_Pad", (x, y, -0.04), (1.1, 1.1, 0.08), mats["pavement"], coll, 0.01)
    box(f"{prefix}_Plinth", (x, y, plinth_h / 2), (0.72, 0.72, plinth_h), mats["stone"], coll, 0.02)
    box(f"{prefix}_PlinthCap", (x, y, plinth_h + 0.04), (0.80, 0.80, 0.08), mats["stone"], coll, 0.015)
    z = plinth_h + 0.08
    cyl(f"{prefix}_Base", (x, y, z + 0.08), 0.30, 0.16, mats["bronze"], coll)
    torus(f"{prefix}_BaseTorus", (x, y, z + 0.20), 0.24, 0.05, mats["bronze"], coll, axis="Z")
    shaft_h = 2.3
    shaft_z = z + 0.26 + shaft_h / 2
    shaft = cyl(f"{prefix}_Shaft", (x, y, shaft_z), 0.15, shaft_h, mats["bronze"], coll, vertices=64)
    # acanaladuras del fuste
    n = 16
    flutes = []
    for i in range(n):
        a = i * 2 * math.pi / n
        bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.028, depth=shaft_h - 0.3,
                                            location=(x + math.cos(a) * 0.155, y + math.sin(a) * 0.155, shaft_z))
        flutes.append(bpy.context.object)
    for f in flutes:
        f.select_set(True)
    bpy.context.view_layer.objects.active = flutes[0]
    bpy.ops.object.join()
    cutter = bpy.context.object
    cutter.name = f"{prefix}_FluteCutter"
    cutter.display_type = "WIRE"
    cutter.hide_render = True
    cutter.hide_viewport = True
    move_to(cutter, coll)
    b = shaft.modifiers.new("Flutes", "BOOLEAN")
    b.operation = "DIFFERENCE"
    b.object = cutter
    b.solver = "EXACT"
    # capitel
    top = z + 0.26 + shaft_h
    torus(f"{prefix}_Neck", (x, y, top + 0.02), 0.15, 0.03, mats["bronze"], coll, axis="Z")
    for i in range(8):
        a = i * math.pi / 4
        leaf = sphere(f"{prefix}_Acanthus_{i}", (x + math.cos(a) * 0.17, y + math.sin(a) * 0.17, top + 0.16),
                      (0.07, 0.035, 0.16), mats["bronze"], coll, 12, 8)
        leaf.rotation_euler = (0, 0, a)
    cyl(f"{prefix}_Capital", (x, y, top + 0.34), 0.26, 0.10, mats["bronze"], coll)
    # cruz de brazos + globo central
    hub_z = top + 0.42
    cyl(f"{prefix}_Hub", (x, y, hub_z), 0.10, 0.10, mats["bronze"], coll)
    globe_r = 0.21
    positions = [(x, y, hub_z + 0.36 + globe_r)]
    for i in range(4):
        a = i * math.pi / 2
        arm_len = 0.42
        ax, ay = math.cos(a) * arm_len / 2, math.sin(a) * arm_len / 2
        arm = cyl(f"{prefix}_Arm_{i}", (x + ax, y + ay, hub_z + 0.05), 0.03, arm_len, mats["bronze"], coll, axis="X", vertices=12)
        arm.rotation_euler = (0, math.pi / 2, a)
        gx, gy = x + math.cos(a) * arm_len, y + math.sin(a) * arm_len
        cyl(f"{prefix}_Cup_{i}", (gx, gy, hub_z + 0.10), 0.09, 0.10, mats["bronze"], coll)
        positions.append((gx, gy, hub_z + 0.15 + globe_r))
    cyl(f"{prefix}_Stem", (x, y, hub_z + 0.20), 0.05, 0.30, mats["bronze"], coll)
    cyl(f"{prefix}_TopCup", (x, y, hub_z + 0.36), 0.09, 0.10, mats["bronze"], coll)
    for i, (gx, gy, gz) in enumerate(positions):
        sphere(f"{prefix}_Globe_{i}", (gx, gy, gz), (globe_r,) * 3, mats["opaline"], coll, 32, 16)
        bpy.ops.object.light_add(type="POINT", location=(gx, gy, gz))
        light = bpy.context.object
        light.name = f"{prefix}_Light_{i}"
        light.data.energy = 60 * glow
        light.data.color = (1.0, 0.82, 0.60)
        light.data.shadow_soft_size = globe_r
        move_to(light, coll)


# ---------------------------------------------------------------------------
# Escena, cámara e iluminación
# ---------------------------------------------------------------------------
def setup_render(scene, opts, out_dir):
    scene.render.film_transparent = opts["transparent"]
    engine = opts["engine"]
    candidates = {"CYCLES": ["CYCLES"], "EEVEE": ["BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"],
                  "WORKBENCH": ["BLENDER_WORKBENCH"]}.get(engine, [engine])
    for candidate in candidates:
        try:
            scene.render.engine = candidate
            break
        except TypeError:
            continue
    if scene.render.engine == "CYCLES":
        scene.cycles.samples = opts["samples"]
        scene.cycles.use_denoising = True
        scene.cycles.device = "CPU"
    elif "EEVEE" in scene.render.engine:
        scene.eevee.taa_render_samples = opts["samples"]
        if hasattr(scene.eevee, "use_raytracing"):
            scene.eevee.use_raytracing = True
    scene.render.resolution_x = opts["res"]
    scene.render.resolution_y = int(opts["res"] * 1.25)
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA" if opts["transparent"] else "RGB"
    scene.render.filepath = os.path.join(out_dir, "central_bank_door_preview.png")
    try:
        scene.view_settings.view_transform = "AgX"
        scene.view_settings.look = "AgX - Medium High Contrast"
    except TypeError:
        scene.view_settings.view_transform = "Filmic"


def setup_world(scene, transparent):
    world = scene.world or bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    # Azul noche igual al fondo del scrolly (#0b1230 aprox.) para que los reflejos casen
    bg.inputs["Color"].default_value = (0.04, 0.06, 0.16, 1.0)
    bg.inputs["Strength"].default_value = 0.35 if transparent else 0.25


def setup_camera_and_lights(scene, coll, full, light=1.0):
    if full:
        bpy.ops.object.camera_add(location=(-2.4, -9.5, 2.2))
        cam = bpy.context.object
        cam.data.lens = 28
        cam.data.shift_y = 0.12
        look_at(cam, (0.0, 0.0, 4.2))
    else:
        # Tres cuartos, cámara a altura de ojo elevada para leer las huellas de la escalinata
        bpy.ops.object.camera_add(location=(-4.2, -15.5, 3.3))
        cam = bpy.context.object
        cam.data.lens = 38
        cam.data.shift_y = 0.05
        look_at(cam, (0.0, 0.2, 4.3))
    cam.name = "Camera_Main"
    cam.data.sensor_width = 36
    scene.camera = cam
    move_to(cam, coll)

    # Luz de acento tipo foco de fachada (cálida) desde abajo, como la iluminación real
    for sx in (-1, 1):
        bpy.ops.object.light_add(type="SPOT", location=(sx * 4.0, -3.2, 0.3))
        spot = bpy.context.object
        spot.name = f"Light_Uplight_{'L' if sx < 0 else 'R'}"
        spot.data.energy = 3500 * light
        spot.data.color = (1.0, 0.80, 0.55)
        spot.data.spot_size = math.radians(70)
        spot.data.spot_blend = 0.6
        spot.data.shadow_soft_size = 0.4
        look_at(spot, (sx * 1.2, 0, 6.0))
        move_to(spot, coll)
    # Relleno frío suave (luz urbana)
    bpy.ops.object.light_add(type="AREA", location=(0, -12, 9))
    fill = bpy.context.object
    fill.name = "Light_Fill"
    fill.data.energy = 900 * light
    fill.data.size = 12
    fill.data.color = (0.75, 0.82, 1.0)
    look_at(fill, (0, 0, 4))
    move_to(fill, coll)


# ---------------------------------------------------------------------------
def main():
    opts = parse_args()
    out_dir = project_dir()
    clear_scene()
    scene = bpy.context.scene

    colls = {
        "facade": collection(f"{ROOT}_Facade"),
        "surround": collection(f"{ROOT}_DoorSurround"),
        "leaves": collection(f"{ROOT}_DoorLeaves"),
        "hardware": collection(f"{ROOT}_Hardware"),
        "stairs": collection(f"{ROOT}_Stairs"),
        "lamps": collection(f"{ROOT}_Lamps"),
        "camera": collection(f"{ROOT}_CameraLights"),
    }
    mats = {
        "stone": stone_material("MAT_Stone", (0.40, 0.39, 0.37)),
        "stone_dark": stone_material("MAT_Stone_Dark", (0.30, 0.29, 0.27), variation=0.05),
        "granite": stone_material("MAT_Granite", (0.16, 0.15, 0.14), roughness=0.55, noise_scale=40, variation=0.25),
        "pavement": stone_material("MAT_Pavement", (0.22, 0.21, 0.20), roughness=0.9, noise_scale=3),
        # bronce según --finish (ver BRONZE_FINISHES)
        "glass_dark": simple_material("MAT_GlassDark", (0.05, 0.06, 0.08), metallic=0.3, roughness=0.15),
        "marble": stone_material("MAT_Marble", (0.55, 0.50, 0.42), roughness=0.25, noise_scale=2.5, variation=0.2),
    }

    colls["interior"] = collection(f"{ROOT}_Interior")
    global PLAQUE_SIDES
    PLAQUE_SIDES = opts["plaque"]
    mats["bronze"], mats["bronze_dark"], mats["bronze_matte"] = bronze_set(opts["finish"])
    mats["opaline"] = opaline_material("MAT_Opaline", strength=3.0 * opts["lamp_glow"])
    mats["glow"] = emissive_material("MAT_InteriorGlow", (1.0, 0.80, 0.52), 8.0 * opts["interior_glow"])

    if opts["full"]:
        facade(mats, colls["facade"])
    else:
        compact_facade(mats, colls["facade"])
    door_surround(mats, colls["surround"])
    interior(mats, colls["interior"], opts["interior_glow"])
    pivots = [
        door_leaf("Door_L", -LEAF_W / 2, mats, colls["leaves"], colls["hardware"]),
        door_leaf("Door_R", LEAF_W / 2, mats, colls["leaves"], colls["hardware"]),
    ]
    stairs(mats, colls["stairs"], with_sidewalk=not opts["transparent"])
    if opts["lamps"] or opts["full"]:
        lamp_standard("Lamp_L", -LAMP_X, LAMP_Y, mats, colls["lamps"], opts["lamp_glow"])
        lamp_standard("Lamp_R", LAMP_X, LAMP_Y, mats, colls["lamps"], opts["lamp_glow"])

    setup_world(scene, opts["transparent"])
    setup_camera_and_lights(scene, colls["camera"], opts["full"], opts["light"])
    setup_render(scene, opts, out_dir)
    animate_door(pivots, scene, opts["max_open"])
    bpy.ops.object.select_all(action="DESELECT")

    blend_path = os.path.join(out_dir, "central_bank_door.blend")
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)

    if opts["glb"]:
        glb_path = os.path.join(out_dir, "central_bank_door.glb")
        bpy.ops.export_scene.gltf(filepath=glb_path, export_format="GLB", export_apply=True,
                                  export_animations=True, export_lights=True, export_cameras=False)
        print("GLB exportado en", glb_path)

    if not opts["render"]:
        return
    if opts["frames"] > 0:
        # Secuencia cerrada → abierta para controlar con el scroll
        frames_dir = os.path.join(out_dir, "frames")
        os.makedirs(frames_dir, exist_ok=True)
        for i in range(opts["frames"]):
            t = i / max(1, opts["frames"] - 1)
            eased = t * t * (3 - 2 * t)  # smoothstep
            set_door_opening(pivots, opts["max_open"] * eased)
            scene.render.filepath = os.path.join(frames_dir, f"door_{i:03d}.png")
            bpy.ops.render.render(write_still=True)
        print("Secuencia guardada en", frames_dir)
    else:
        set_door_opening(pivots, opts["open"])
        bpy.ops.render.render(write_still=True)
        print("Render guardado en", scene.render.filepath)


if __name__ == "__main__":
    main()
