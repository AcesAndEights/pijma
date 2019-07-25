// TODO: move this somewhere else or search for package
export default function uuid(): string {
  return Math.random().toString(16).slice(2)
}
