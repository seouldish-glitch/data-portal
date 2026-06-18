import re

path = 'app/api/edit/route.ts'
with open(path, 'r') as f:
    content = f.read()

# For single files: const logoUrl = await uploadSingleFile('logo');
# We want: const logoUrl = await uploadSingleFile('logo') || formData.get('existing_logo') as string || null;

# Find all uploadSingleFile calls and replace them
def single_replacer(match):
    var_name = match.group(1)
    field_name = match.group(2)
    return f"let {var_name} = await uploadSingleFile('{field_name}');\n        if (!{var_name}) {var_name} = formData.get('existing_{field_name}') as string | null;"

content = re.sub(r'const\s+(\w+)\s*=\s*await\s+uploadSingleFile\(\'(\w+)\'\);', single_replacer, content)

# Special case for obu logo
content = content.replace("let logoUrl = await uploadSingleFile('logo');\n        if (!logoUrl) logoUrl = await uploadSingleFile('obuLogo');", "let logoUrl = await uploadSingleFile('logo');\n        if (!logoUrl) logoUrl = formData.get('existing_logo') as string | null;\n        if (!logoUrl) logoUrl = await uploadSingleFile('obuLogo');\n        if (!logoUrl) logoUrl = formData.get('existing_obuLogo') as string | null;")

# For multiple files: const mediaUploads = await uploadFiles('mediaUploads');
# We want:
# const mediaUploads = [...(formData.getAll('existing_mediaUploads') as string[]), ...(await uploadFiles('mediaUploads'))];

def multi_replacer(match):
    var_name = match.group(1)
    field_name = match.group(2)
    return f"const {var_name} = [...(formData.getAll('existing_{field_name}') as string[]), ...(await uploadFiles('{field_name}'))];"

content = re.sub(r'const\s+(\w+)\s*=\s*await\s+uploadFiles\(\'(\w+)\'\);', multi_replacer, content)

with open(path, 'w') as f:
    f.write(content)

print("Updated app/api/edit/route.ts")
