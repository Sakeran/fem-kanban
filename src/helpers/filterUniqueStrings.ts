export default function filterUniqueStrings(strings: string[]) {
  const seen = new Set();

  const res = [];
  strings.forEach((s) => {
    if (seen.has(s.toLowerCase())) return;

    res.push(s);
    seen.add(s.toLowerCase());
  });

  return res;
}