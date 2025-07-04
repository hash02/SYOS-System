type ReflectionEntry = {
  timestamp: string;
  trigger: string;
  action: string;
  result: string;
  driftDetected?: string;
};
const journal: ReflectionEntry[] = [];
export function logReflection(entry: ReflectionEntry) {
  journal.push({ ...entry, timestamp: new Date().toISOString() });
  console.log("🪞 Reflection Logged:", entry);
}
export function getRecentReflections(count: number = 5) {
  return journal.slice(-count);
}
export function exportJournal() {
  return JSON.stringify(journal, null, 2);
}
