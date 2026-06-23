import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.sportForm.create({
      data: {
        userId: "authenticated",
        achievementPhotos: [],
        name: "Test Sport",
        micName: "Test MIC",
        micContact: "123",
        headCoachName: "Coach",
        assistantCoaches: [],
        captainName: "Cap",
        captainContact: "123",
        viceCaptainName: "Vice",
        ageGroupCaptains: [],
        seniorSquadRoster: "Roster",
        yearOfInception: "2020",
        firstMic: "MIC",
        firstCoach: "Coach",
        firstCaptain: "Cap",
        internationalAchievements: "None",
        nationalAchievements: "None",
        provincialAchievements: "None",
        annualEncounters: "None",
        nationalCaps: [],
        mediaLinks: [],
        logoUrl: null,
        groupPhotoUrl: null,
      }
    });
    console.log("Success", res);
  } catch (e) {
    console.error("Error creating sport:", e.message);
  }
}

main().finally(() => prisma.$disconnect());
