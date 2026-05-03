import re
with open("css/style.css", "r") as f:
    content = f.read()
replacements = {
    "#00d4ff": "var(--primary)",
    "#7c3aed": "var(--secondary)",
    "#88d5ff": "var(--accent)",
    "rgba(0, 212, 255": "rgba(56, 189, 248",
    "rgba(124, 58, 237": "rgba(129, 140, 248",
    "#0da9c9": "#0ea5e9",
    "#4c2296": "#6366f1",
    "#fce1e1": "#e0e7ff",
    "#b7e0f3": "#bae6fd",
    "#81c8ff": "#7dd3fc",
    "#d6b6ff": "#c4b5fd",
    "#020617": "var(--bg)"
}
for old, new in replacements.items():
    content = content.replace(old, new)
root_old = """:root {
    --bg: var(--bg);
    --text: #fff;
    --card: rgba(255, 255, 255, 0.05);
    --primary: var(--primary);
    --secondary: var(--secondary);
    --accent: var(--accent);
}"""
root_new = """:root {
    --bg: #0f172a;
    --text: #f8fafc;
    --card: rgba(255, 255, 255, 0.05);
    --primary: #38bdf8;
    --secondary: #818cf8;
    --accent: #c084fc;
}"""
content = content.replace(root_old, root_new)
# light mode update too
light_old = """body.light {
    --bg: #f5f5f5;
    --text: #111;
    --card: #ffffff;
}"""
light_new = """body.light {
    --bg: #f8fafc;
    --text: #0f172a;
    --card: #ffffff;
}"""
content = content.replace(light_old, light_new)
with open("css/style.css", "w") as f:
    f.write(content)
