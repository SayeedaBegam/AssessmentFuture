# GitHub Pages deployment

Target repository: https://github.com/SayeedaBegam/AssessmentFuture

Expected public URL after successful deployment: https://sayeedabegam.github.io/AssessmentFuture/

This URL is a target, not confirmation of a live deployment.

## One time setup

1. Grant the connected GitHub app access to this repository. A GitHub profile connection alone does not establish repository access.
2. Upload the application source and `.github/workflows/deploy-pages.yml` to the `main` branch.
3. In the repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Open **Actions → Deploy Assessment Futures to GitHub Pages**. Run the workflow manually if the initial push happened before Pages was enabled.
5. Wait for both build and deployment jobs to succeed. Use the URL reported by the deployment job.

GitHub's setup guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Future pushes to main rebuild and deploy automatically. No paid hosting account, application API key or database is required by this application. GitHub account and Pages availability remain subject to GitHub's account policies.

The build job needs `pages: read` to let `configure-pages` fetch site metadata, in addition to `contents: read`. The deployment job separately has `pages: write` and `id-token: write`. The workflow uses Node 24 based action versions and Ubuntu 24.04 runners; the application build continues to use Node 22. Pages must first be enabled through repository settings. The workflow does not request a personal access token to enable it automatically.

## How this works

The standard local commands remain available. Only a build with `GITHUB_PAGES=true` enables static export and trailing directory slashes. The workflow reads the repository prefix from `actions/configure-pages` and supplies `PAGES_BASE_PATH`. The local fallback prefix is `/AssessmentFuture`, including its case. Next.js Link components apply this prefix automatically. Exported output is `out/`.

Seven query driven pages now read URL parameters with `useSearchParams` inside a client component and Suspense boundary. Comparison accepts repeated and comma separated IDs. Explorer, playground, AI choices, timeline, workload and map still accept their existing URL parameters. No server, AI service or persistence layer is introduced. Initial tool rendering requires browser JavaScript. Page titles and the site shell remain in the generated HTML.

`build:pages` also runs `scripts/finalize-pages.mjs`. This adds flat navigation segment filenames when a Windows Next.js export has emitted nested segment directories, and writes `.nojekyll`. Existing Linux filenames are preserved. The static browser tests caught the Windows issue because navigation data requests returned 404 despite the visible pages loading.

## Local checks

In PowerShell with Node.js available:

```powershell
$env:GITHUB_PAGES = 'true'
$env:PAGES_BASE_PATH = '/AssessmentFuture'
npm run build:pages
npm run typecheck
npm run lint
npm test
npm run test:pages
```

If using an installed Chrome instead of Playwright's browser, set `PLAYWRIGHT_CHROME_PATH` to its executable path. `test:pages` starts a local static file server at port 4173 and tests the actual export under the repository prefix, including direct detail page refresh, navigation, assets and query based tool presets. It does not contact GitHub.

Remove these environment values before returning to standard development in the same terminal:

```powershell
Remove-Item Env:GITHUB_PAGES -ErrorAction SilentlyContinue
Remove-Item Env:PAGES_BASE_PATH -ErrorAction SilentlyContinue
```

## Local verification on 9 November 2026

Type checking, lint, all 80 unit tests, and the 58 page static production build passed. All three exported site browser checks passed. The existing browser suite initially passed 35 of 37 checks; one navigation assertion and the multi-page accessibility check timed out during development compilation. Both passed on a focused rerun, with a 120 second per-test limit for the latter. No GitHub upload or live deployment has been verified: the connector reported no access to the target repository.

## Publication boundaries

Publish application files, lockfile, configs, tests, deployment workflow and relevant content documentation. Do not upload `.tools`, `node_modules`, `.next`, `.next-pages`, `out`, local environment files, browser reports, local logs or preparation documents. Build output is sent to Pages by the workflow, rather than committed as application source. Font assets and their licence files are application source.

The site remains a public research prototype. Existing draft, illustrative and research verification labels must remain visible. A successful deployment does not verify educational effectiveness or institutional approval. Downloads stay in the visitor's browser; this deployment adds no student data collection.
