
export class Shade {

  /**
   * Dato un input un colore in esadecimale, ritorna un colore più scuro o più chiaro in esadecimale
   * @param hex colore di partenza
   * @param strenght forza di shading (si accettano anche valori negativi) 
   * @param isDarkTheme shading più chiaro in dark e più scuro in light
   * @returns colore più chiaro o più scuro
   * @example ShadeColor.parse("#ffaffe", -20)
   */
  public static color(hex: string, strenght: number, isDarkTheme?: boolean) {

    const s = isDarkTheme ? strenght * 4 : strenght * -1

    var R = parseInt(hex.substring(1, 3), 16);
    var G = parseInt(hex.substring(3, 5), 16);
    var B = parseInt(hex.substring(5, 7), 16);

    R = (R * (100 + s) / 100);
    G = (G * (100 + s) / 100);
    B = (B * (100 + s) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
  }

  /**
   * 
   * @param isDarkTheme tema
   * @param strenght si consigliano valori che vanno da 0 a 1
   * @returns 
   */
  public static transparent(isDarkTheme: boolean, strenght?: number): string {
    if (isDarkTheme) return `rgba(255,255,255,${strenght ?? "0.15"})`
    else return `rgba(0,0,0,${strenght ?? "0.15"})`
  }

  /**
   * @param hex esadecimale
   * @param strenght si consigliano valori che vanno tra 0 e 1 
   */
  public static hexToRgba(hex: string, strenght?: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (strenght) {
      return `rgba(${r}, ${g}, ${b}, ${strenght})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }

  }

}