/**
 * Formatea un valor numérico como moneda en pesos argentinos.
 *
 * Usa el separador de miles propio de es-AR (punto) y el símbolo "$".
 * Ej: 7000 -> "$7.000" | 11500 -> "$11.500"
 *
 * @param {number|string|null|undefined} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    const value = Number(amount) || 0;
    return `$${Math.round(value).toLocaleString('es-AR')}`;
}
