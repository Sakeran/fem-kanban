/**
 * Return one value or another depending on whether the User-Agent would prefer reduced motion.
 * @param valueWithMotion
 * @param valueWithoutMotion
 * @returns
 */
export default function checkReducedMotion<T>(
  valueWithMotion: T,
  valueWithoutMotion: T
) {
  return window &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ? valueWithMotion
    : valueWithoutMotion;
}