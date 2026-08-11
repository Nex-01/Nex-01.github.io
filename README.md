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

Built by Nex-01 for personal portfolio
