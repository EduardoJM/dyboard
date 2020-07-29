/**
 * A interface for RGB (Red, Green, Blue) color format.
 */
export interface RGB {
    /**
     * Red (0-255).
     */
    r: number;
    /**
     * Green (0-255).
     */
    g: number;
    /**
     * Blue (0-255).
     */
    b: number;
}

/**
 * A interface for HSB (Hue, Saturation, Brightness) color format.
 */
export interface HSB {
    /**
     * Hue (0-360).
     */
    h: number;
    /**
     * Saturation (0-100).
     */
    s: number;
    /**
     * Brightness (0-100).
     */
    b: number;
}

export function RGBtoHEX(rgb: RGB): string {
    const hex = [
        rgb.r.toString(16),
        rgb.g.toString(16),
        rgb.b.toString(16)
    ];
    return hex.map((value) => value.length === 1 ? `0${value}` : value)
        .join('');
}

export function HSBtoRGB(hsb: HSB): RGB {
    let h = Math.round(hsb.h);
    const s = Math.round((hsb.s * 255) / 100);
    const v = Math.round((hsb.b * 255) / 100);
    let r = 0;
    let g = 0;
    let b = 0;
    if (s === 0) {
        r = v;
        g = v;
        b = v;
    } else {
        const t1 = v;
        const t2 = ((255 - s) * v) / 255;
        const t3 = ((t1 - t2) * (h % 60)) / 60;
        if (h === 360) {
            h = 0;
        }
        if (h < 60) {
            r = t1;
            b = t2;
            g = t2 + t3;
        } else if (h < 120) {
            g = t1;
            b = t2;
            r = t1 - t3;
        } else if (h < 180) {
            g = t1;
            r = t2;
            b = t2 + t3;
        } else if (h < 240) {
            b = t1;
            r = t2;
            g = t1 - t3;
        } else if (h < 300) {
            b = t1;
            g = t2;
            r = t2 + t3;
        } else if (h < 360) {
            r = t1;
            g = t2;
            b = t1 - t3;
        } else {
            r = 0;
            g = 0;
            b = 0;
        }
    }
    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
    };
}

export function HSBtoHEX(hsb: HSB): string {
    return RGBtoHEX(HSBtoRGB(hsb));
}

export function RGBtoHSB(rgb: RGB): HSB {
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const delta = max - min;
    let b = max;
    let s = 0;
    if (max !== 0) {
        s = ((255 * delta) / max);
    }
    let h = 0;
    if (s !== 0) {
        if (rgb.r === max) {
            h = (rgb.g - rgb.b) / delta;
        } else if (rgb.g === max) {
            h = 2 + (rgb.b - rgb.r) / delta;
        } else {
            h = 4 + (rgb.r - rgb.g) / delta;
        }
    } else {
        h = -1;
    }
    h *= 60;
    if (h < 0) {
        h += 360;
    }
    s *= 100 / 255;
    b *= 100 / 255;
    return {
        h,
        s,
        b
    };
}

export function HEXtoRGB(hex: string): RGB {
    const hexNumber = parseInt(
        ((hex.indexOf('#') > -1) ? hex.substring(1) : hex),
        16
    );
    return {
        r: hexNumber >> 16,
        g: (hexNumber & 0x00FF00) >> 8,
        b: (hexNumber & 0x0000FF)
    };
}

export function HEXtoHSB(hex: string): HSB {
    return RGBtoHSB(HEXtoRGB(hex));
}

export function getColorFromString(str: string): HSB {
    const trimed = str.trim();
    if (trimed.startsWith('rgb(') && trimed.endsWith(')')) {
        const canSplit = trimed.substring(4, trimed.length - 1);
        const split = canSplit.split(',');
        if (split.length === 3) {
            const rStr = split[0];
            const gStr = split[1];
            const bStr = split[2];
            let r = parseInt(rStr);
            let g = parseInt(gStr);
            let b = parseInt(bStr);
            if (Number.isNaN(r)) {
                r = 0;
            }
            if (Number.isNaN(g)) {
                g = 0;
            }
            if (Number.isNaN(b)) {
                b = 0;
            }
            return RGBtoHSB({ r, g, b });
        }
    }
    return HEXtoHSB(str);
}

export function fixHSB(hsb: HSB): HSB {
    return {
        h: Math.min(360, Math.max(0, Math.round(hsb.h))),
        s: Math.min(100, Math.max(0, Math.round(hsb.s))),
        b: Math.min(100, Math.max(0, Math.round(hsb.b)))
    };
}

export function fixRGB(rgb: RGB): RGB {
    return {
        r: Math.min(255, Math.max(0, Math.round(rgb.r))),
        g: Math.min(255, Math.max(0, Math.round(rgb.g))),
        b: Math.min(255, Math.max(0, Math.round(rgb.b)))
    };
}

export function fixHex(hex: string): string {
    const len = 6 - hex.length;
    if (len > 0) {
        const o = [];
        for (let i = 0; i < len; i += 1) {
            o.push('0');
        }
        o.push(hex);
        hex = o.join('');
    }
    return hex;
}
