# MyPortfolio

A responsive personal portfolio for showcasing software projects, data science interests, skills, and contact details. It is a static site built with HTML, CSS, and vanilla JavaScript and is ready for GitHub Pages.

## Features

- Responsive navigation with mobile menu, active section highlighting, and keyboard support
- Minimal light visual theme with responsive navigation
- Skills and project cards generated from centralized JavaScript configuration
- Client-side project filters for Machine Learning, Data Science, Web Development, and Tools
- Lightweight original SVG project illustrations
- Reveal-on-scroll effects, reduced-motion support, dynamic copyright year, and back-to-top navigation
- Configurable GitHub, LinkedIn, LeetCode, email, and resume links
- No framework, backend, build step, or package installation required

## Technology

HTML5, CSS3, vanilla JavaScript (ES6+), and SVG. Google Fonts are an optional visual enhancement; local system fonts are specified as fallbacks.

## Folder structure

```text
MyPortfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
├── favicon.svg
├── robots.txt
└── assets/
    ├── hero-illustration.svg
    └── projects/
        ├── churnguard.svg
        ├── whiteboard.svg
        └── koda.svg
```

No profile photo is included. The resume PDF is kept local and ignored by Git for privacy. The site only displays working resume actions when `assets/resume.pdf` is available.

## Run locally

**Option A — open the file:** Open `index.html` in a browser. Most features work directly from the file. Browser security rules may prevent the optional resume file existence check from running under `file://`; use Live Server to check resume availability.

**Option B — VS Code Live Server:** Install the Live Server extension, open `index.html`, then choose **Go Live** from the status bar. The site will refresh when you save changes.

No `npm install` or build command is needed.

## Customize personal information

Edit `SITE_CONFIG` near the top of `script.js`:

- **Name and biography:** Update `name` in the config and the editable introduction text in `index.html`.
- **Location, education, learning goals:** Replace the bracketed placeholders in the About cards in `index.html`.
- **Skills:** Edit the category and `items` arrays in `SITE_CONFIG.skills`. Remove items that don’t represent your skills.
- **GitHub:** The profile is configured as `https://github.com/jatinbisht003uk`.
- **LinkedIn and LeetCode:** Edit `profiles.linkedin` and `profiles.leetcode`. Empty or invalid placeholder links are not shown.
- **Email:** The email is configured in `SITE_CONFIG.email`; change it there if needed.
- **Journey:** Edit `SITE_CONFIG.journey`. Entries marked `placeholder: true` are hidden until you replace them with accurate details and remove the placeholder property. Do not add experience you have not had.

## Add or edit projects

Edit the `SITE_CONFIG.projects` array in `script.js`. Each entry has `title`, `category`, `description`, `technologies`, `repository`, `demo`, `image`, `featured`, and `status` properties. Use an empty string for unknown repository or demo URLs; these are omitted from the card and never made clickable. Categories should be one of `Machine Learning`, `Data Science`, `Web Development`, or `Tools` to work with the filter buttons. Add a lightweight image under `assets/projects/` or reuse one of the existing illustrations.

ChurnGuardAI, SketchSync, and AlgoVisualizer have their supplied repository and demo URLs configured. Add future project URLs to their entries in `SITE_CONFIG.projects`.

## Add your resume

Add the resume you intend to publish at `assets/resume.pdf`. The page checks that the file exists before it reveals the View and Download actions. There is no generated or placeholder resume. The PDF is ignored by default for privacy; if you intentionally want to publish it, add it explicitly with `git add -f assets/resume.pdf`.

## Contact details

Set `SITE_CONFIG.email` in `script.js` to a real address. The page uses a `mailto:` link and does not send data to a server. There is no pretend contact form or backend.

## Push future changes to GitHub

This project is connected to `https://github.com/jatinbisht003uk/MyPortfolio`. After editing files, run:

```sh
git add index.html style.css script.js README.md .gitignore favicon.svg robots.txt assets
git commit -m "Update portfolio"
git push
```

The resume is excluded by `.gitignore`. Only publish it if you intentionally want the PDF to be publicly accessible.

## Publish with GitHub Pages

1. Push the project to the `MyPortfolio` repository using the commands above.
2. On GitHub, open **MyPortfolio → Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose branch **main** and folder **/(root)**, then click **Save**.
5. Wait for the Pages deployment to finish. The repository site URL should be `https://jatinbisht003uk.github.io/MyPortfolio/`.

All asset paths are relative, so the site works from a project subpath on GitHub Pages. Revisit Settings → Pages to view deployment status if the site is not immediately available.
# MyPortfolio
