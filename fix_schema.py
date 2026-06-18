import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

# First, let's clean up any partial `userId` / `achievementPhotos` to avoid duplicates.
# Actually, since some were added correctly, we can just find models that DO NOT have `userId` and add them.

models = ['SportForm', 'ClubSocietyForm', 'PrefectsGuildForm', 'AcademicAchievementForm', 'HouseForm', 'ObuDataForm', 'AssociationForm', 'SportsWingForm', 'AlumniBatchForm', 'TeachersGuildForm', 'WelfareSocietyForm', 'ChoirForm', 'BandForm', 'CadetsForm', 'ScoutsForm', 'OrchestraForm']

for model in models:
    # regex to extract the block of the model
    pattern = r'(model ' + model + r' \{.*?\})'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        block = match.group(1)
        if 'userId' not in block:
            # find `createdAt` and insert before it
            new_block = re.sub(r'(\s+createdAt\s+DateTime)', r'\n  userId String?\n  achievementPhotos String[]\1', block)
            content = content.replace(block, new_block)

with open('prisma/schema.prisma', 'w') as f:
    f.write(content)
