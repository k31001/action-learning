# -*- coding: utf-8 -*-
"""Samsung-tone brand graphics fallback generator.

hero-cover.png  : diagonal navy gradient (#050B2E -> #0A1854 -> #1428A0),
                  dark left half for white text, wafer rings + circuit motif
                  bottom-right, glow, vignette, film grain. 2560x1440.
closing-bg.png  : darker minimal variant, bottom-edge blue glow, faint rings,
                  very dark center for centered text. 2560x1440.
"""
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

OUT = "/home/user/action-learning/outputs/presentation/assets/storyline-overview"
W, H = 2560, 1440
SS = 2                      # supersampling factor for crisp AA lines
w, h = W * SS, H * SS

C0 = np.array([5, 11, 46], float)     # #050B2E
C1 = np.array([10, 24, 84], float)    # #0A1854
C2 = np.array([20, 40, 160], float)   # #1428A0
LINE = (120, 160, 255)                # low-key light blue for motifs

yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
xn, yn = xx / w, yy / h


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def tri_gradient(t):
    """3-stop gradient over t in [0,1]: C0 @0, C1 @0.55, C2 @1."""
    xp = np.array([0.0, 0.55, 1.0])
    return np.stack(
        [np.interp(t, xp, [C0[i], C1[i], C2[i]]) for i in range(3)], axis=-1
    )


def trace(dr, pts_frac, alpha, width):
    pts = [(int(px * w), int(py * h)) for px, py in pts_frac]
    dr.line(pts, fill=LINE + (alpha,), width=width, joint="curve")
    for p in (pts[0], pts[-1]):
        rr = 3.4 * SS
        dr.ellipse([p[0] - rr, p[1] - rr, p[0] + rr, p[1] + rr],
                   outline=LINE + (alpha,), width=max(1, SS))


def add_grain(img_rgb, sigma, seed):
    arr = np.asarray(img_rgb).astype(np.float32)
    rng = np.random.default_rng(seed)
    grain = rng.normal(0.0, sigma, arr.shape[:2])[..., None]  # luma grain
    return Image.fromarray(np.clip(arr + grain, 0, 255).astype(np.uint8))


# ----------------------------------------------------------------------------
# 1. HERO COVER
# ----------------------------------------------------------------------------
def build_hero():
    # --- base: diagonal gradient, dark top-left -> lit bottom-right ---------
    t = np.clip(0.62 * xn + 0.38 * yn, 0, 1) ** 1.5
    img = tri_gradient(t)

    # cool key-light glow bottom-right (cinematic blue lighting)
    gx, gy = 0.84, 0.70
    d2 = ((xn - gx) ** 2 * (w / h) ** 2 + (yn - gy) ** 2) / 0.95
    img += np.exp(-d2 * 3.0)[..., None] * np.array([14, 30, 105]) * 0.55

    # low horizon glow along bottom edge, right half only
    edge = np.exp(-(((1.0 - yn) / 0.10) ** 2)) * smoothstep(0.35, 0.80, xn)
    img += edge[..., None] * np.array([10, 22, 80]) * 0.5

    # keep left third extra dark for the title block
    leftmask = 0.62 + 0.38 * smoothstep(0.14, 0.56, xn)
    img *= leftmask[..., None]

    # vignette
    dx, dy = xn - 0.60, yn - 0.52
    vig = 1 - 0.38 * np.clip(dx ** 2 * 1.9 + dy ** 2 * 2.6, 0, 1)
    img *= vig[..., None]

    base = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), "RGB").convert("RGBA")

    # --- motif overlays -----------------------------------------------------
    glow_ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    crisp_ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd, cd = ImageDraw.Draw(glow_ov), ImageDraw.Draw(crisp_ov)

    cx, cy = int(0.80 * w), int(0.74 * h)

    # wafer concentric rings (thin, low alpha, brightest mid rings)
    n_r = 11
    for i in range(n_r):
        f = 0.10 + (0.62 - 0.10) * i / (n_r - 1)
        r = f * h
        a = int(16 + 30 * np.exp(-(((i - 6) / 3.5) ** 2)))
        bbox = [cx - r, cy - r, cx + r, cy + r]
        cd.ellipse(bbox, outline=LINE + (a,), width=max(2, int(1.2 * SS)))
        gd.ellipse(bbox, outline=LINE + (max(6, a // 3),), width=int(7 * SS))

    # die grid clipped to inner wafer circle
    grid = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gdr = ImageDraw.Draw(grid)
    Rw = int(0.40 * h)
    step = int(0.052 * h)
    for x0 in range(cx - Rw, cx + Rw + 1, step):
        gdr.line([(x0, cy - Rw), (x0, cy + Rw)], fill=LINE + (13,), width=max(1, SS))
    for y0 in range(cy - Rw, cy + Rw + 1, step):
        gdr.line([(cx - Rw, y0), (cx + Rw, y0)], fill=LINE + (13,), width=max(1, SS))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse([cx - Rw, cy - Rw, cx + Rw, cy + Rw], fill=255)
    grid.putalpha(ImageChops.multiply(grid.getchannel("A"), mask))

    # circuit traces entering from right / bottom edges (45-deg bends, vias)
    traces = [
        ([(1.00, 0.26), (0.915, 0.26), (0.885, 0.313), (0.885, 0.44)], 44),
        ([(1.00, 0.86), (0.930, 0.86), (0.900, 0.807), (0.845, 0.807)], 38),
        ([(0.72, 1.00), (0.720, 0.93), (0.750, 0.877), (0.750, 0.790)], 34),
        ([(1.00, 0.55), (0.955, 0.55), (0.925, 0.603), (0.925, 0.680)], 46),
        ([(0.58, 1.00), (0.580, 0.947), (0.610, 0.894), (0.665, 0.894)], 30),
        ([(1.00, 0.13), (0.930, 0.13), (0.900, 0.183), (0.900, 0.260)], 28),
    ]
    for pts, a in traces:
        trace(cd, pts, a, max(2, int(1.2 * SS)))
        trace(gd, pts, max(8, a // 3), int(6 * SS))

    glow_ov = glow_ov.filter(ImageFilter.GaussianBlur(6 * SS))

    comp = Image.alpha_composite(base, glow_ov)
    comp = Image.alpha_composite(comp, grid)
    comp = Image.alpha_composite(comp, crisp_ov)

    final = comp.convert("RGB").resize((W, H), Image.LANCZOS)
    final = add_grain(final, 2.2, seed=7)
    final.save(f"{OUT}/hero-cover.png")
    return final


# ----------------------------------------------------------------------------
# 2. CLOSING BACKGROUND
# ----------------------------------------------------------------------------
def build_closing():
    img = np.zeros((h, w, 3), float) + np.array([3, 7, 24])  # near-black navy

    # wide soft glow rising from bottom edge (Samsung blue, restrained)
    d2 = ((xn - 0.5) ** 2) / (0.55 ** 2) + ((yn - 1.12) ** 2) / (0.38 ** 2)
    img += np.exp(-d2)[..., None] * np.array([16, 32, 120]) * 0.50

    # tighter core of the glow, right at the very bottom
    d2b = ((xn - 0.5) ** 2) / (0.30 ** 2) + ((yn - 1.16) ** 2) / (0.22 ** 2)
    img += np.exp(-d2b)[..., None] * np.array([18, 36, 130]) * 0.35

    # gentle vignette so corners fall to near-black
    dx, dy = xn - 0.5, yn - 0.45
    vig = 1 - 0.30 * np.clip(dx ** 2 * 2.2 + dy ** 2 * 2.8, 0, 1)
    img *= vig[..., None]

    base = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), "RGB").convert("RGBA")

    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)

    # extremely subtle wafer rings, center pushed off the bottom-right corner
    ccx, ccy = int(0.93 * w), int(1.08 * h)
    n_r = 9
    for i in range(n_r):
        f = 0.16 + (0.88 - 0.16) * i / (n_r - 1)
        r = f * h
        a = int(6 + 9 * np.exp(-(((i - 4) / 2.8) ** 2)))
        od.ellipse([ccx - r, ccy - r, ccx + r, ccy + r],
                   outline=LINE + (a,), width=max(1, SS))

    # two whisper-faint circuit traces hugging the bottom corners
    trace(od, [(0.00, 0.93), (0.060, 0.93), (0.085, 0.955), (0.160, 0.955)], 15,
          max(1, SS))
    trace(od, [(1.00, 0.90), (0.945, 0.90), (0.920, 0.935), (0.850, 0.935)], 15,
          max(1, SS))

    comp = Image.alpha_composite(base, ov)
    final = comp.convert("RGB").resize((W, H), Image.LANCZOS)
    final = add_grain(final, 2.0, seed=11)
    final.save(f"{OUT}/closing-bg.png")
    return final


def report(name, im):
    a = np.asarray(im).astype(float)
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    Hh, Ww = lum.shape
    left = lum[:, : Ww // 3].mean()
    center = lum[Hh // 4: 3 * Hh // 4, Ww // 4: 3 * Ww // 4].mean()
    right = lum[:, 2 * Ww // 3:].mean()
    print(f"{name}: size={im.size}  mean-lum left1/3={left:.1f} "
          f"center={center:.1f} right1/3={right:.1f} (0-255)")


if __name__ == "__main__":
    hero = build_hero()
    closing = build_closing()
    report("hero-cover.png", hero)
    report("closing-bg.png", closing)
