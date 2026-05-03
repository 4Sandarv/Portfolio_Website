import re

with open("css/style.css", "r") as f:
    content = f.read()

# Add --section-bg to :root
root_old = """:root {
    --bg: #0f172a;
    --text: #f8fafc;
    --card: rgba(255, 255, 255, 0.05);
    --primary: #38bdf8;
    --secondary: #818cf8;
    --accent: #c084fc;
}"""
root_new = """:root {
    --bg: #0f172a;
    --text: #f8fafc;
    --card: rgba(255, 255, 255, 0.05);
    --primary: #38bdf8;
    --secondary: #818cf8;
    --accent: #c084fc;
    --section-bg: #070b14;
}"""
content = content.replace(root_old, root_new)

# Add --section-bg to body.light
light_old = """body.light {
    --bg: #f8fafc;
    --text: #0f172a;
    --card: #ffffff;
}"""
light_new = """body.light {
    --bg: #f8fafc;
    --text: #0f172a;
    --card: #ffffff;
    --section-bg: #e2e8f0;
}"""
content = content.replace(light_old, light_new)

# Update backgrounds in sections
content = re.sub(r'#about-section {\s*background:[^;]+;', '#about-section {\n    background: var(--section-bg);', content)
content = re.sub(r'#contact-section {\s*background:[^;]+;', '#contact-section {\n    background: var(--section-bg);', content)

# Update hardcoded text colors in sections to var(--text)
# but leave #fff alone for buttons, since buttons have colored backgrounds and need white text.
content = content.replace('color: #e9d3d3;', 'color: var(--text);')

# Let's fix heading and p colors
content = re.sub(r'#about-section ul.about-info li span:last-child {\s*color: #fff;', '#about-section ul.about-info li span:last-child {\n    color: var(--text);', content)
content = re.sub(r'#about-section \.skill-mf span {\s*color: #fff;', '#about-section .skill-mf span {\n    color: var(--text);', content)
content = re.sub(r'#contact-section h2 {\s*color: #fff;', '#contact-section h2 {\n    color: var(--text);', content)

# Some p text might have fixed colors like #cbd5f5
content = content.replace('color: #cbd5f5;', 'color: var(--text);')

# the main h2 and titles should use var(--text)
content = content.replace('color: #e0e0e0;', 'color: var(--text);')

# footer text
content = re.sub(r'footer {\s*background: #000;\s*color: #fff;', 'footer {\n    background: var(--section-bg);\n    color: var(--text);', content)

# remove static colors from colorful-hover-text
content = re.sub(r'\.colorful-hover-text {\s*color: #fff;', '.colorful-hover-text {\n    color: var(--text);', content)

with open("css/style.css", "w") as f:
    f.write(content)
