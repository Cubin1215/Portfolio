# Portfolio Website

A modern, dark-themed portfolio website to showcase your data analytics and business intelligence projects.

## Features

- **Dark Theme**: Professional dark color scheme with cyan accents
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Project Filtering**: Filter projects by category (Excel, Tableau, SQL, Python)
- **Smooth Animations**: Subtle animations and hover effects
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Featured Project**: Highlight your best work on the home page

## File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### 1. Personal Information

Edit the following sections in `index.html`:

- **Hero Section**: Update the title, subtitle, and description
- **Featured Project**: Change the highlighted project details
- **About Section**: Modify your bio and skills
- **Contact Section**: Update your contact information

### 2. Projects

#### Adding New Projects

1. Find the `projects-grid` section in `index.html`
2. Copy and paste this template:

```html
<div class="project-card" data-category="excel">
    <div class="project-image"><i class="fas fa-table"></i></div>
    <div class="project-content">
        <h3>Your Project Title</h3>
        <p class="project-category">Excel</p>
        <p class="project-description">Brief description of your project.</p>
        <div class="project-tags">
            <span class="tag">Tag 1</span>
            <span class="tag">Tag 2</span>
        </div>
    </div>
</div>
```

#### Project Categories

Available categories:
- `excel` - Excel projects
- `tableau` - Tableau projects  
- `sql` - SQL projects
- `python` - Python projects

#### Icons

Replace the icon in `project-image` with any Font Awesome icon:
- Excel: `fas fa-table`
- Tableau: `fas fa-chart-line`
- SQL: `fas fa-database`
- Python: `fab fa-python`
- Charts: `fas fa-chart-bar`, `fas fa-chart-pie`
- Maps: `fas fa-map-marked-alt`
- Analytics: `fas fa-brain`

### 3. Styling

#### Colors

The main color scheme uses:
- Background: `#0a0a0a` (very dark)
- Cards: `#1a1a1a` (dark gray)
- Accent: `#00d4ff` (cyan)
- Text: `#ffffff` (white), `#cccccc` (light gray)

#### Fonts

The website uses Inter font from Google Fonts. You can change this in the `<head>` section of `index.html`.

### 4. Contact Information

Update the contact section with your actual information:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your.email@example.com</span>
</div>
<div class="contact-item">
    <i class="fab fa-linkedin"></i>
    <span>linkedin.com/in/yourprofile</span>
</div>
<div class="contact-item">
    <i class="fab fa-github"></i>
    <span>github.com/yourusername</span>
</div>
```

## How to Use

1. **Local Development**: Simply open `index.html` in your web browser
2. **Web Hosting**: Upload all files to your web hosting service
3. **GitHub Pages**: Push to a GitHub repository and enable GitHub Pages

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

The website is optimized for:
- Fast loading times
- Smooth animations
- Mobile performance
- SEO-friendly structure

## Future Enhancements

You can easily add:
- Project detail modals
- Contact forms
- Blog section
- Downloadable resume
- Social media integration
- Analytics tracking

## Tips

1. **Images**: Consider adding actual project screenshots or images
2. **Links**: Add links to live demos or GitHub repositories
3. **SEO**: Update meta tags for better search engine visibility
4. **Analytics**: Add Google Analytics or similar tracking
5. **Domain**: Consider purchasing a custom domain name

## Support

If you need help customizing your portfolio:
1. Check the HTML comments for guidance
2. Use browser developer tools to experiment
3. Refer to Font Awesome for more icons
4. Test on different devices and browsers

---

**Note**: This is a static website. For dynamic features like contact forms, you'll need to integrate with a backend service or use services like Netlify Forms or Formspree. 