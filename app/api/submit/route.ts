import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";
import { uploadToCloudinary } from "../../lib/cloudinary";

// Helper to safely split text fields into arrays of strings
function parseTextToArray(text: string | null): string[] {
  if (!text) return [];
  return text
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

// Helper to safely parse numbers
function parseIntSafe(val: string | null): number {
  if (!val) return 0;
  const num = parseInt(val, 10);
  return isNaN(num) ? 0 : num;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const category = req.nextUrl.searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Category query parameter is required" },
        { status: 400 },
      );
    }

    // Helper to upload dynamic files
    const uploadFiles = async (fieldName: string): Promise<string[]> => {
      const files = formData.getAll(fieldName);
      const urls: string[] = [];
      for (const entry of files) {
        if (entry instanceof File && entry.size > 0) {
          const url = await uploadToCloudinary(entry, category);
          urls.push(url);
        } else if (
          typeof entry === "string" &&
          entry.trim().startsWith("http")
        ) {
          urls.push(entry.trim());
        }
      }
      return urls;
    };

    const uploadSingleFile = async (
      fieldName: string,
    ): Promise<string | null> => {
      const file = formData.get(fieldName);
      if (file instanceof File && file.size > 0) {
        return await uploadToCloudinary(file, category);
      } else if (typeof file === "string" && file.trim().startsWith("http")) {
        return file.trim();
      }
      return null;
    };

    const cookieStore = cookies();
    const userId = cookieStore.get("user_session")?.value || null;
    const achievementPhotos = await uploadFiles("achievementPhotos");

    let result;

    switch (category) {
      case "sports": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoAndPhotos = await uploadFiles("mediaUploads");
        const assistantCoaches = parseTextToArray(
          formData.get("assistantCoaches") as string,
        );
        const ageGroupCaptains = parseTextToArray(
          formData.get("ageGroupCaptains") as string,
        );
        const nationalCaps = parseTextToArray(
          formData.get("nationalCaps") as string,
        );

        result = await prisma.sportForm.create({
          data: {
            userId,
            achievementPhotos,
            name: (formData.get("sportName") as string) || "",
            micName: (formData.get("micName") as string) || "",
            micContact: (formData.get("micContact") as string) || "",
            headCoachName: (formData.get("headCoachName") as string) || "",
            assistantCoaches,
            captainName: (formData.get("captainName") as string) || "",
            captainContact: (formData.get("captainContact") as string) || "",
            viceCaptainName: (formData.get("viceCaptainName") as string) || "",
            ageGroupCaptains,
            seniorSquadRoster:
              (formData.get("seniorSquadRoster") as string) || "",
            yearOfInception: (formData.get("inceptionYear") as string) || "",
            firstMic: (formData.get("firstMic") as string) || "",
            firstCoach: (formData.get("firstCoach") as string) || "",
            firstCaptain: (formData.get("firstCaptain") as string) || "",
            internationalAchievements:
              (formData.get("internationalAchievements") as string) || "",
            nationalAchievements:
              (formData.get("nationalAchievements") as string) || "",
            provincialAchievements:
              (formData.get("provincialAchievements") as string) || "",
            annualEncounters:
              (formData.get("traditionalEncounters") as string) || "",
            nationalCaps,
            mediaLinks: logoAndPhotos,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "clubs": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const mediaUploads = await uploadFiles("mediaUploads");
        const otherBoardMembers = parseTextToArray(
          formData.get("otherExco") as string,
        );
        const majorProjects = parseTextToArray(
          formData.get("majorProjects") as string,
        );
        const notableAlumni = parseTextToArray(
          formData.get("notableAlumni") as string,
        );
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.clubSocietyForm.create({
          data: {
            userId,
            achievementPhotos,
            name: (formData.get("clubName") as string) || "",
            micName: (formData.get("micName") as string) || "",
            micContact: (formData.get("micContact") as string) || "",
            presidentName: (formData.get("presidentName") as string) || "",
            presidentContact:
              (formData.get("presidentContact") as string) || "",
            secretaryName: (formData.get("secretaryName") as string) || "",
            treasurerName: (formData.get("treasurerName") as string) || "",
            otherBoardMembers,
            activeMembersCount: parseIntSafe(
              formData.get("activeMembersCount") as string,
            ),
            yearOfInception: (formData.get("inceptionYear") as string) || "",
            firstMic: (formData.get("firstMic") as string) || "",
            firstPresident: (formData.get("firstPresident") as string) || "",
            objectiveMotto: (formData.get("objectiveMotto") as string) || "",
            majorProjects,
            internationalAchievements:
              (formData.get("internationalAchievements") as string) || "",
            nationalAchievements:
              (formData.get("nationalAchievements") as string) || "",
            provincialAchievements:
              (formData.get("provincialAchievements") as string) || "",
            notableAlumni,
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "prefects": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const guildLogo = await uploadSingleFile("guildLogo");
        const officialPhotos = await uploadFiles("officialPhotos");
        const deputyHeadPrefects = parseTextToArray(
          formData.get("deputyHeadPrefects") as string,
        );
        const seniorPrefectsList = parseTextToArray(
          formData.get("seniorPrefects") as string,
        );
        const pastHeadPrefects = parseTextToArray(
          formData.get("pastHeadPrefects") as string,
        );
        const majorAnnualEvents = parseTextToArray(
          formData.get("majorEvents") as string,
        );
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        // Parse head prefect info
        const headPrefectDetails =
          (formData.get("headPrefectDetails") as string) || "";

        result = await prisma.prefectsGuildForm.create({
          data: {
            userId,
            achievementPhotos,
            micName: (formData.get("micName") as string) || "",
            micContact: (formData.get("micContact") as string) || "",
            headPrefectName: headPrefectDetails,
            headPrefectContact: "",
            deputyHeadPrefects,
            seniorPrefectsCount: seniorPrefectsList.length,
            seniorPrefectsList,
            secondYearPrefectsCount: parseIntSafe(
              formData.get("secondYearCount") as string,
            ),
            juniorPrefectsCount: parseIntSafe(
              formData.get("juniorPrefectsCount") as string,
            ),
            firstHeadPrefect:
              (formData.get("firstHeadPrefect") as string) || "",
            yearOfEstablishment:
              (formData.get("establishmentYear") as string) || "",
            notablePastHeadPrefects: pastHeadPrefects,
            majorAnnualEvents,
            coreDutiesMission: (formData.get("coreDuties") as string) || "",
            badgeLogoUrl: guildLogo,
            officialPhotos,
            socialMediaLinks,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "academic":
      case "academics": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const officialPhotos = await uploadFiles("officialPhotos");
        const notableAlumni = parseTextToArray(
          formData.get("notableAlumni") as string,
        );

        result = await prisma.academicAchievementForm.create({
          data: {
            userId,
            achievementPhotos,
            stream: (formData.get("academicStream") as string) || "",
            sectionalHeadName:
              (formData.get("sectionalHeadName") as string) || "",
            totalStudents: parseIntSafe(
              formData.get("totalStudents") as string,
            ),
            topPerformingClass:
              (formData.get("topPerformingClass") as string) || "",
            passRates3Year:
              (formData.get("passRatesComparison") as string) || "",
            topAchievers: (formData.get("topAchievers") as string) || "",
            notableMilestones:
              (formData.get("academicMilestones") as string) || "",
            subjectHighlights:
              (formData.get("subjectHighlights") as string) || "",
            notableAlumni,
            officialPhotos,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "houses": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const houseFlagUrl = await uploadSingleFile("houseFlag");
        const actionPhotos = await uploadFiles("actionPhotos");
        const housePrefects = parseTextToArray(
          formData.get("housePrefects") as string,
        );
        const notableAlumni = parseTextToArray(
          formData.get("notableAlumni") as string,
        );
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.houseForm.create({
          data: {
            userId,
            achievementPhotos,
            houseName: (formData.get("houseName") as string) || "",
            level: (
              (formData.get("schoolSection") as string) || "UPPER"
            ).includes("Primary")
              ? "PRIMARY"
              : "UPPER",
            chiefHouseMaster:
              (formData.get("chiefHouseMaster") as string) || "",
            houseCaptain: (formData.get("houseCaptain") as string) || "",
            viceCaptain: (formData.get("houseViceCaptain") as string) || "",
            housePrefects,
            motto: formData.get("houseMotto") as string,
            historyOrigin: formData.get("houseHistory") as string,
            athleticMeetAchievements:
              (formData.get("athleticAchievements") as string) || "",
            totalActiveMembers: parseIntSafe(
              formData.get("totalActiveMembers") as string,
            ),
            houseFlagUrl,
            actionPhotos,
            notableAlumni,
            socialMediaLinks,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "associations": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoUrl = await uploadSingleFile("logo");
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.associationForm.create({
          data: {
            userId,
            achievementPhotos,
            associationName: (formData.get("associationName") as string) || "",
            presidentName: (formData.get("presidentName") as string) || "",
            micName: (formData.get("micName") as string) || "",
            officialContact: (formData.get("officialContact") as string) || "",
            registeredMembers: parseIntSafe(
              formData.get("registeredMembers") as string,
            ),
            keyContributions:
              (formData.get("keyContributions") as string) || "",
            upcomingEvents: formData.get("upcomingEvents") as string,
            logoUrl,
            socialMediaLinks,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "obu": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        let logoUrl = await uploadSingleFile("logo");
        if (!logoUrl) logoUrl = await uploadSingleFile("obuLogo");
        const distinguishedAlumni = parseTextToArray(
          formData.get("distinguishedAlumni") as string,
        );
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.obuDataForm.create({
          data: {
            userId,
            achievementPhotos,
            branchName: (formData.get("branchName") as string) || "",
            presidentName: (formData.get("presidentName") as string) || "",
            secretaryName: (formData.get("secretaryName") as string) || "",
            officialContact: (formData.get("officialContact") as string) || "",
            registeredMembersCount: parseIntSafe(
              formData.get("registeredMembers") as string,
            ),
            keyContributions:
              (formData.get("keyContributions") as string) || "",
            upcomingEvents: (formData.get("upcomingEvents") as string) || "",
            distinguishedAlumni,
            logoUrl,
            socialMediaLinks,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "sports-wings": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const mediaUploads = await uploadFiles("mediaUploads");
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.sportsWingForm.create({
          data: {
            userId,
            achievementPhotos,
            wingName: (formData.get("wingName") as string) || "",
            affiliatedSport: (formData.get("affiliatedSport") as string) || "",
            presidentName: (formData.get("presidentName") as string) || "",
            presidentContact:
              (formData.get("presidentContact") as string) || "",
            secretaryName: (formData.get("secretaryName") as string) || "",
            treasurerName: (formData.get("treasurerName") as string) || "",
            activeMembersCount: parseIntSafe(
              formData.get("activeMembersCount") as string,
            ),
            inceptionYear: (formData.get("inceptionYear") as string) || "",
            keyContributions:
              (formData.get("keyContributions") as string) || "",
            majorEvents: formData.get("majorEvents") as string,
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "alumni-batches": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const mediaUploads = await uploadFiles("mediaUploads");
        const distinguishedAlumni = parseTextToArray(
          formData.get("distinguishedAlumni") as string,
        );
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.alumniBatchForm.create({
          data: {
            userId,
            achievementPhotos,
            batchYear: (formData.get("batchYear") as string) || "",
            presidentName: (formData.get("presidentName") as string) || "",
            presidentContact:
              (formData.get("presidentContact") as string) || "",
            secretaryName: (formData.get("secretaryName") as string) || "",
            activeMembers: parseIntSafe(
              formData.get("activeMembers") as string,
            ),
            contributions: (formData.get("contributions") as string) || "",
            majorEvents: formData.get("majorEvents") as string,
            distinguishedAlumni,
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "teachers-guild": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const mediaUploads = await uploadFiles("mediaUploads");

        result = await prisma.teachersGuildForm.create({
          data: {
            userId,
            achievementPhotos,
            guildName: (formData.get("guildName") as string) || "",
            presidentName: (formData.get("presidentName") as string) || "",
            presidentContact:
              (formData.get("presidentContact") as string) || "",
            secretaryName: (formData.get("secretaryName") as string) || "",
            treasurerName: (formData.get("treasurerName") as string) || "",
            totalMembers: parseIntSafe(formData.get("totalMembers") as string),
            mission: (formData.get("mission") as string) || "",
            majorEvents: formData.get("majorEvents") as string,
            contributions: formData.get("contributions") as string,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "welfare-society": {
        const logoUrl = await uploadSingleFile("logo");
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const mediaUploads = await uploadFiles("mediaUploads");

        result = await prisma.welfareSocietyForm.create({
          data: {
            userId,
            achievementPhotos,
            societyName: (formData.get("societyName") as string) || "",
            presidentName: (formData.get("presidentName") as string) || "",
            presidentContact:
              (formData.get("presidentContact") as string) || "",
            secretaryName: (formData.get("secretaryName") as string) || "",
            treasurerName: (formData.get("treasurerName") as string) || "",
            registeredMembers: parseIntSafe(
              formData.get("registeredMembers") as string,
            ),
            inceptionYear: (formData.get("inceptionYear") as string) || "",
            mission: (formData.get("mission") as string) || "",
            annualEvents: formData.get("annualEvents") as string,
            contributions: formData.get("contributions") as string,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "choir": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoUrl = await uploadSingleFile("logo");
        const mediaUploads = await uploadFiles("mediaUploads");
        const leaders = parseTextToArray(formData.get("leaders") as string);
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.choirForm.create({
          data: {
            userId,
            achievementPhotos,
            subCategory: (formData.get("subCategory") as string) || "",
            micName: (formData.get("micName") as string) || "",
            choirMaster: (formData.get("choirMaster") as string) || "",
            leaders,
            membersCount: parseIntSafe(formData.get("membersCount") as string),
            achievements: (formData.get("achievements") as string) || "",
            events: (formData.get("events") as string) || "",
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "band": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoUrl = await uploadSingleFile("logo");
        const mediaUploads = await uploadFiles("mediaUploads");
        const committee = parseTextToArray(formData.get("committee") as string);
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.bandForm.create({
          data: {
            userId,
            achievementPhotos,
            bandCategory: (formData.get("bandCategory") as string) || "",
            micName: (formData.get("micName") as string) || "",
            bandMaster: (formData.get("bandMaster") as string) || "",
            bandLeader: (formData.get("bandLeader") as string) || "",
            committee,
            membersCount: parseIntSafe(formData.get("membersCount") as string),
            achievements: (formData.get("achievements") as string) || "",
            events: (formData.get("events") as string) || "",
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "cadets": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoUrl = await uploadSingleFile("logo");
        const mediaUploads = await uploadFiles("mediaUploads");
        const corporals = parseTextToArray(formData.get("corporals") as string);
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.cadetsForm.create({
          data: {
            userId,
            achievementPhotos,
            platoonName: (formData.get("platoonName") as string) || "",
            oicName: (formData.get("oicName") as string) || "",
            sergeantName: (formData.get("sergeantName") as string) || "",
            corporals,
            membersCount: parseIntSafe(formData.get("membersCount") as string),
            camps: (formData.get("camps") as string) || "",
            achievements: (formData.get("achievements") as string) || "",
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "scouts": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoUrl = await uploadSingleFile("logo");
        const mediaUploads = await uploadFiles("mediaUploads");
        const patrolLeaders = parseTextToArray(
          formData.get("patrolLeaders") as string,
        );
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.scoutsForm.create({
          data: {
            userId,
            achievementPhotos,
            troopName: (formData.get("troopName") as string) || "",
            micName: (formData.get("micName") as string) || "",
            gslName: (formData.get("gslName") as string) || "",
            troopLeader: (formData.get("troopLeader") as string) || "",
            patrolLeaders,
            membersCount: parseIntSafe(formData.get("membersCount") as string),
            camps: (formData.get("camps") as string) || "",
            achievements: (formData.get("achievements") as string) || "",
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "orchestra": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoUrl = await uploadSingleFile("logo");
        const mediaUploads = await uploadFiles("mediaUploads");
        const committee = parseTextToArray(formData.get("committee") as string);
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        result = await prisma.orchestraForm.create({
          data: {
            userId,
            achievementPhotos,
            micName: (formData.get("micName") as string) || "",
            conductorName: (formData.get("conductorName") as string) || "",
            leaderName: (formData.get("leaderName") as string) || "",
            committee,
            membersCount: parseIntSafe(formData.get("membersCount") as string),
            achievements: (formData.get("achievements") as string) || "",
            events: (formData.get("events") as string) || "",
            socialMediaLinks,
            mediaUploads,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      case "bens-wesley-committee": {
        const groupPhotoUrl = await uploadSingleFile("groupPhoto");
        const logoUrl = await uploadSingleFile("logo");
        const socialMediaLinks = parseTextToArray(
          formData.get("socialLinks") as string,
        );

        const pastChairmen = parseTextToArray(
          formData.get("pastChairmen") as string,
        );

        result = await prisma.bensWesleyCommitteeForm.create({
          data: {
            userId,
            currentChairman: (formData.get("currentChairman") as string) || "",
            pastChairmen,
            membersCount: parseIntSafe(formData.get("membersCount") as string),
            matchHistory: (formData.get("matchHistory") as string) || "",
            notableMoments: (formData.get("notableMoments") as string) || "",
            socialMediaLinks,
            logoUrl,
            groupPhotoUrl,
          },
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: `Category '${category}' is not supported` },
          { status: 400 },
        );
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during submission" },
      { status: 500 },
    );
  }
}
