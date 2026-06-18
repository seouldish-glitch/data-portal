import re

with open('app/lib/formConfig.ts', 'r') as f:
    content = f.read()

# We need to add a comma to the end of the line BEFORE the injected item.
# The injected item is `      { name: 'achievementPhotos', label: 'Achievement Photos (Please upload old and new pictures)', type: 'file', accept: 'image/*, .zip, .rar', required: false }`

content = re.sub(
    r'(required: false \}|\w+\s*\}\s*)\n\s*\{\s*name: \'achievementPhotos\'',
    r'\1,\n      { name: \'achievementPhotos\'',
    content
)

with open('app/lib/formConfig.ts', 'w') as f:
    f.write(content)
