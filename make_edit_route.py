import os

submit_path = 'app/api/submit/route.ts'
edit_path = 'app/api/edit/route.ts'

with open(submit_path, 'r') as f:
    content = f.read()

# Add id to search params
content = content.replace(
    "const category = req.nextUrl.searchParams.get('category');",
    "const category = req.nextUrl.searchParams.get('category');\n    const id = req.nextUrl.searchParams.get('id');\n    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });"
)

# Replace .create({ data: { with .update({ where: { id }, data: {
content = content.replace(".create({", ".update({\n          where: { id },")

# Remove userId from data: { because we don't need to change userId
# Actually, it's fine to leave it, or better to remove it.
# Let's just create the file.
os.makedirs(os.path.dirname(edit_path), exist_ok=True)
with open(edit_path, 'w') as f:
    f.write(content)

print("Created app/api/edit/route.ts")
