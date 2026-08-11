#!/usr/bin/env bash
# Copia o repositorio pure-design-language inteiro para apps/pure.
# Fonte, na ordem: env PURE_SRC, ./pure-src (checkout do CI), volume local.
# Copia so o que esta versionado la, entao .git e lixo do macOS ficam de fora.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dest="$root/apps/pure"

for candidate in "${PURE_SRC:-}" "$root/pure-src" "/Volumes/promethion/pure-design-language"; do
  if [ -n "$candidate" ] && [ -f "$candidate/README.md" ]; then
    src="$candidate"
    break
  fi
done

if [ -z "${src:-}" ]; then
  echo "pure design source not found" >&2
  exit 1
fi

export COPYFILE_DISABLE=1
rm -rf "$dest"
mkdir -p "$dest"
git -C "$src" archive HEAD | tar -x -C "$dest"

version="$(sed -n 's/^Pure Design \(.*\)\.$/\1/p' "$dest/README.md" | head -1)"
commit="$(git -C "$src" rev-parse --short HEAD)"
echo "pure design ${version:-unknown} ($commit) -> $dest"
