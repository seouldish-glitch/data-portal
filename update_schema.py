import sys

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

new_content = content.replace('  createdAt                 DateTime @default(now())', '  userId                    String?\n  achievementPhotos         String[]\n  createdAt                 DateTime @default(now())')
new_content = new_content.replace('  createdAt               DateTime @default(now())', '  userId                  String?\n  achievementPhotos       String[]\n  createdAt               DateTime @default(now())')
new_content = new_content.replace('  createdAt          DateTime @default(now())', '  userId             String?\n  achievementPhotos  String[]\n  createdAt          DateTime @default(now())')

user_model = """

model User {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
"""
new_content += user_model

with open('prisma/schema.prisma', 'w') as f:
    f.write(new_content)
