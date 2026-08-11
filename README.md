# Cybersecurity & Systems Portfolio

A clean, dark-themed portfolio site built with vanilla HTML, CSS, and JavaScript. Showcases cybersecurity projects, PowerShell scripting, and systems administration work.

## Features

- **Dark cybersecurity aesthetic** - Dark blue background with cyan and green accents
- **Responsive design** - Works on desktop, tablet, and mobile
- **Hero projects** - Featured sections for PowerShell scripts, home lab, and systems automation
- **Skills showcase** - Cloud, scripting, security, and tools categorized
- **Lab in progress** - Dedicated section for active cybersecurity lab development
- **Interactive demos** - Script examples with modal popups linking to full GitHub repos

## Project Structure

```
Nex-01.github.io/
├── index.html              # Main portfolio page
├── README.md               # This file
├── css/
│   └── style.css           # All styling (dark theme, responsive)
├── js/
│   └── script.js           # Interactive features and modals
└── demo-scripts/
    ├── ping_continuous.ps1 # Demo: Parallel ping testing
    └── Search-ADUsersByCompany.ps1  # Demo: AD user search utility
```

## Setup & Deployment

### Option 1: GitHub Pages (Recommended)

1. **Create a new repository** named `Nex-01.github.io` (replace `Nex-01` with your GitHub username)

2. **Clone the repo locally:**
   ```bash
   git clone https://github.com/Nex-01/Nex-01.github.io.git
   cd Nex-01.github.io
   ```

3. **Add all files from this portfolio:**
   - Copy `index.html` to the root
   - Create `css/` folder and add `style.css`
   - Create `js/` folder and add `script.js`
   - Create `demo-scripts/` folder and add PowerShell scripts

4. **Update GitHub links** in the HTML:
   - Replace `https://github.com/Nex-01/powershell-scripts` with your actual repo URL
   - Replace LinkedIn URL (search for `linkedin.com` in `index.html`)

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

6. **Enable GitHub Pages:**
   - Go to your repo settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/root` folder
   - Your site will be live at `https://Nex-01.github.io`

### Option 2: Local Testing

1. **Serve locally** using Python:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

2. Or use VS Code's Live Server extension

## Customization

### Update Contact Links
- **GitHub:** Search for `github.com/Nex-01` and update
- **LinkedIn:** Search for `linkedin.com` and add your profile URL

### Modify Hero Projects
Edit the `<section id="projects">` in `index.html`:
- Change project titles and descriptions
- Update GitHub repo links
- Modify demo script data in `js/script.js`

### Customize Colors
Edit CSS variables in `css/style.css` (`:root` section):
- `--accent-cyan`: Primary accent color (default: `#00d9ff`)
- `--accent-green`: Secondary accent color (default: `#00ff88`)
- `--bg-dark`: Main background (default: `#0a0e27`)

### Add More Demo Scripts
1. Create new `.ps1` file in `demo-scripts/`
2. Add to the `demos` object in `js/script.js`
3. Link from project cards with `data-script="name"`

## Phase 1 Complete Features

✅ Landing page with hero section  
✅ Featured projects (PowerShell, home lab, systems automation)  
✅ Skills section (categorized)  
✅ Home lab in-progress writeup  
✅ Interactive script demos  
✅ Responsive mobile design  
✅ Dark cybersecurity theme  

## Phase 2 Ideas (Future)

- Detailed blog posts for each project
- Home lab component writeups (as you complete pfSense, ELK, etc.)
- Resume/CV download
- Certifications timeline
- Contact form or contact information expansion
- Dark/light mode toggle
- Project filtering by category

## Notes

- All code is vanilla HTML, CSS, and JavaScript—no build tools or frameworks required
- Links to full script versions in your PowerShell repo keep the portfolio lean
- As you complete home lab phases, update the lab section with new writeups
- Keep demo scripts simple and clean to showcase your coding style

## License

Built by Nex-01 for personal portfolio use.

---

**Next steps:**
1. Create the `Nex-01.github.io` repo on GitHub
2. Push these files
3. Enable GitHub Pages
4. Update contact links
5. Share with hiring managers and colleagues!
