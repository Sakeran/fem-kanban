export default function generateId() {
  // TODO - use a better generator function
  return Math.random().toString(36).slice(2);
}
