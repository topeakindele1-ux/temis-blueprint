# The Temi Blueprint — website

Live at **temisblueprint.com**. Strength and nutrition coaching, Vancouver and online.

Plain HTML and CSS. No build step, no framework, nothing to install — the files in this
repo are exactly what gets served.

## Changing something

**Words:** open the page's `.html` file, find the text, change it, save.

**Links, socials, email, booking:** `assets/js/site.js`. Everything you'd want to change is
at the top between quote marks. Leave the part below "BEHAVIOUR" alone.

**Colours and fonts:** `assets/css/site.css`, at the very top.

**Prices:** `coaching.html`, in lines that look like `<p class="price">$220...`

Then commit and push. The live site updates within a minute or two — GitHub Pages
rebuilds automatically on every push to `main`.

## Deploying

```
cd "path/to/Temi - Blueprint/site"
git add -A
git commit -m "what you changed"
git push
```

That's the whole deploy. There's no build step and nothing to upload — pushing *is*
deploying. Watch it happen under the repo's **Actions** tab if you want to see it run.

Authentication is by SSH key, already set up on Temi's Mac. Nothing to type.

## The pages

| File | |
|---|---|
| `index.html` | Home |
| `blueprint.html` | The six points |
| `coaching.html` | Options and prices |
| `free-workouts.html` | Free workouts + email signup |
| `recipes.html` + `recipe-*.html` | Six recipes |
| `transformations.html` | Client stories |
| `about.html` | Temi's story |
| `health-screening.html`, `waiver.html` | Blank client forms, not indexed |
| `disclaimer.html`, `privacy.html` | Legal |

## Two rules

**Nobody goes on the Results page without written consent** — separately for their name,
their words, and their photos.

**Client records never go in this repo.** They live outside it, on Temi's machine only.
This repo is public; anything in it, including HTML comments, can be read by anyone.

## Seeing it locally before you push

```
python3 ../.claude/serve.py
```

Then open **localhost:4321**.
