// Публикует версию сайта: кладёт содержимое ветки в main новым коммитом.
// ONREZA деплоит main, поэтому сайт пересобирается сам после пуша.
// Использование: node scripts/publish.mjs brand|product|<ветка> [--dry-run]
import { execFileSync } from "child_process";

const ALIASES = {
  brand: "brand-portfolio",
  product: "product-portfolio",
};

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const name = args.find((a) => !a.startsWith("--"));

if (!name) {
  console.error("Укажи версию: brand, product или имя ветки");
  process.exit(1);
}

const branch = ALIASES[name] ?? name;
const git = (...a) => execFileSync("git", a, { encoding: "utf8" }).trim();

git("fetch", "origin", "main");

const tree = git("rev-parse", `${branch}^{tree}`);
const source = git("rev-parse", "--short", branch);
const main = git("rev-parse", "origin/main");

if (git("rev-parse", "origin/main^{tree}") === tree) {
  console.log(`На сайте уже ${branch} (${source}), публиковать нечего.`);
  process.exit(0);
}

if (git("branch", "--show-current") === branch && git("status", "--porcelain")) {
  console.warn("Внимание: незакоммиченные правки не попадут на сайт.");
}

if (dryRun) {
  console.log(`[dry-run] опубликую ${branch} (${source}) поверх main (${main.slice(0, 7)})`);
  process.exit(0);
}

git("push", "origin", branch);
const commit = git("commit-tree", tree, "-p", main, "-m", `publish ${branch} (${source})`);
git("push", "origin", `${commit}:refs/heads/main`);

if (git("branch", "--show-current") !== "main") {
  git("branch", "-f", "main", commit);
}

console.log(`Опубликовано: ${branch} (${source}) → main ${commit.slice(0, 7)}. ONREZA пересоберёт сайт.`);
