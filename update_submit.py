import re

with open('app/api/submit/route.ts', 'r') as f:
    content = f.read()

# Add cookies import if not there
if "from 'next/headers'" not in content:
    content = content.replace("from 'next/server';", "from 'next/server';\nimport { cookies } from 'next/headers';")

# Add userId extraction
if "const cookieStore = cookies();" not in content:
    content = content.replace(
        "    let result;",
        "    const cookieStore = cookies();\n    const userId = cookieStore.get('user_session')?.value || null;\n    const achievementPhotos = await uploadFiles('achievementPhotos');\n\n    let result;"
    )

# Now we need to add `achievementPhotos,` and `userId,` to all `prisma.*.create({ data: {` blocks.
# We can regex match `data: {` and inject our two fields.
content = re.sub(
    r'data: {',
    r'data: {\n            userId,\n            achievementPhotos,',
    content
)

with open('app/api/submit/route.ts', 'w') as f:
    f.write(content)
