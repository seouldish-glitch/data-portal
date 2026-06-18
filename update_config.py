import re

with open('app/lib/formConfig.ts', 'r') as f:
    content = f.read()

# We want to add the field to the end of every fields array
# But wait, each form has a `fields: [` block, ending with `]`
# A reliable way is to find `fields: [` and its matching `]`
# Alternatively, since we know all fields end with a `}` followed by `\n    ]` or similar, we can replace `    ]\n  },` with `      { name: 'achievementPhotos', label: 'Achievement Photos (Please upload old and new pictures)', type: 'file', accept: 'image/*, .zip, .rar', required: false }\n    ]\n  },`

new_content = content.replace(
    '    ]\n  },',
    "      { name: 'achievementPhotos', label: 'Achievement Photos (Please upload old and new pictures)', type: 'file', accept: 'image/*, .zip, .rar', required: false }\n    ]\n  },"
)
# And the last one is `    ]\n  }\n};\n`
new_content = new_content.replace(
    '    ]\n  }\n};\n',
    "      { name: 'achievementPhotos', label: 'Achievement Photos (Please upload old and new pictures)', type: 'file', accept: 'image/*, .zip, .rar', required: false }\n    ]\n  }\n};\n"
)

with open('app/lib/formConfig.ts', 'w') as f:
    f.write(new_content)
