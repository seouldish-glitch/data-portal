import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { uploadToCloudinary } from '../../lib/cloudinary';

// Helper to safely split text fields into arrays of strings
function parseTextToArray(text: string | null): string[] {
  if (!text) return [];
  return text
    .split(/[\n,]+/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
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
    const category = req.nextUrl.searchParams.get('category');

    if (!category) {
      return NextResponse.json({ error: 'Category query parameter is required' }, { status: 400 });
    }

    // Helper to upload dynamic files
    const uploadFiles = async (fieldName: string): Promise<string[]> => {
      const files = formData.getAll(fieldName);
      const urls: string[] = [];
      for (const entry of files) {
        if (entry instanceof File && entry.size > 0) {
          const url = await uploadToCloudinary(entry, category);
          urls.push(url);
        }
      }
      return urls;
    };

    const uploadSingleFile = async (fieldName: string): Promise<string | null> => {
      const file = formData.get(fieldName);
      if (file instanceof File && file.size > 0) {
        return await uploadToCloudinary(file, category);
      }
      return null;
    };

    let result;

    switch (category) {
      case 'sports': {
        const logoAndPhotos = await uploadFiles('mediaUploads');
        const assistantCoaches = parseTextToArray(formData.get('assistantCoaches') as string);
        const ageGroupCaptains = parseTextToArray(formData.get('ageGroupCaptains') as string);
        const nationalCaps = parseTextToArray(formData.get('nationalCaps') as string);

        result = await prisma.sportForm.create({
          data: {
            name: (formData.get('sportName') as string) || '',
            micName: (formData.get('micName') as string) || '',
            micContact: (formData.get('micContact') as string) || '',
            headCoachName: (formData.get('headCoachName') as string) || '',
            assistantCoaches,
            captainName: (formData.get('captainName') as string) || '',
            captainContact: (formData.get('captainContact') as string) || '',
            viceCaptainName: (formData.get('viceCaptainName') as string) || '',
            ageGroupCaptains,
            seniorSquadRoster: (formData.get('seniorSquadRoster') as string) || '',
            yearOfInception: (formData.get('inceptionYear') as string) || '',
            firstMic: (formData.get('firstMic') as string) || '',
            firstCoach: (formData.get('firstCoach') as string) || '',
            firstCaptain: (formData.get('firstCaptain') as string) || '',
            internationalAchievements: (formData.get('internationalAchievements') as string) || '',
            nationalAchievements: (formData.get('nationalAchievements') as string) || '',
            provincialAchievements: (formData.get('provincialAchievements') as string) || '',
            annualEncounters: (formData.get('traditionalEncounters') as string) || '',
            nationalCaps,
            mediaLinks: logoAndPhotos,
          },
        });
        break;
      }

      case 'clubs': {
        const mediaUploads = await uploadFiles('mediaUploads');
        const otherBoardMembers = parseTextToArray(formData.get('otherExco') as string);
        const majorProjects = parseTextToArray(formData.get('majorProjects') as string);
        const notableAlumni = parseTextToArray(formData.get('notableAlumni') as string);
        const socialMediaLinks = parseTextToArray(formData.get('socialLinks') as string);

        result = await prisma.clubSocietyForm.create({
          data: {
            name: (formData.get('clubName') as string) || '',
            micName: (formData.get('micName') as string) || '',
            micContact: (formData.get('micContact') as string) || '',
            presidentName: (formData.get('presidentName') as string) || '',
            presidentContact: (formData.get('presidentContact') as string) || '',
            secretaryName: (formData.get('secretaryName') as string) || '',
            treasurerName: (formData.get('treasurerName') as string) || '',
            otherBoardMembers,
            activeMembersCount: parseIntSafe(formData.get('activeMembersCount') as string),
            yearOfInception: (formData.get('inceptionYear') as string) || '',
            firstMic: (formData.get('firstMic') as string) || '',
            firstPresident: (formData.get('firstPresident') as string) || '',
            objectiveMotto: (formData.get('objectiveMotto') as string) || '',
            majorProjects,
            internationalAchievements: (formData.get('internationalAchievements') as string) || '',
            nationalAchievements: (formData.get('nationalAchievements') as string) || '',
            provincialAchievements: (formData.get('provincialAchievements') as string) || '',
            notableAlumni,
            socialMediaLinks,
            mediaUploads,
          },
        });
        break;
      }

      case 'prefects': {
        const guildLogo = await uploadSingleFile('guildLogo');
        const officialPhotos = await uploadFiles('officialPhotos');
        const deputyHeadPrefects = parseTextToArray(formData.get('deputyHeadPrefects') as string);
        const seniorPrefectsList = parseTextToArray(formData.get('seniorPrefects') as string);
        const pastHeadPrefects = parseTextToArray(formData.get('pastHeadPrefects') as string);
        const majorAnnualEvents = parseTextToArray(formData.get('majorEvents') as string);
        const socialMediaLinks = parseTextToArray(formData.get('socialLinks') as string);

        // Parse head prefect info
        const headPrefectDetails = (formData.get('headPrefectDetails') as string) || '';

        result = await prisma.prefectsGuildForm.create({
          data: {
            micName: (formData.get('micName') as string) || '',
            micContact: (formData.get('micContact') as string) || '',
            headPrefectName: headPrefectDetails,
            headPrefectContact: '',
            deputyHeadPrefects,
            seniorPrefectsCount: seniorPrefectsList.length,
            seniorPrefectsList,
            secondYearPrefectsCount: parseIntSafe(formData.get('secondYearCount') as string),
            juniorPrefectsCount: parseIntSafe(formData.get('juniorPrefectsCount') as string),
            firstHeadPrefect: (formData.get('firstHeadPrefect') as string) || '',
            yearOfEstablishment: (formData.get('establishmentYear') as string) || '',
            notablePastHeadPrefects: pastHeadPrefects,
            majorAnnualEvents,
            coreDutiesMission: (formData.get('coreDuties') as string) || '',
            badgeLogoUrl: guildLogo,
            officialPhotos,
            socialMediaLinks,
          },
        });
        break;
      }

      case 'academic':
      case 'academics': {
        const officialPhotos = await uploadFiles('officialPhotos');
        const notableAlumni = parseTextToArray(formData.get('notableAlumni') as string);

        result = await prisma.academicAchievementForm.create({
          data: {
            stream: (formData.get('academicStream') as string) || '',
            sectionalHeadName: (formData.get('sectionalHeadName') as string) || '',
            totalStudents: parseIntSafe(formData.get('totalStudents') as string),
            topPerformingClass: (formData.get('topPerformingClass') as string) || '',
            passRates3Year: (formData.get('passRatesComparison') as string) || '',
            topAchievers: (formData.get('topAchievers') as string) || '',
            notableMilestones: (formData.get('academicMilestones') as string) || '',
            subjectHighlights: (formData.get('subjectHighlights') as string) || '',
            notableAlumni,
            officialPhotos,
          },
        });
        break;
      }

      case 'houses': {
        const houseFlagUrl = await uploadSingleFile('houseFlag');
        const actionPhotos = await uploadFiles('actionPhotos');
        const housePrefects = parseTextToArray(formData.get('housePrefects') as string);
        const notableAlumni = parseTextToArray(formData.get('notableAlumni') as string);
        const socialMediaLinks = parseTextToArray(formData.get('socialLinks') as string);

        result = await prisma.houseForm.create({
          data: {
            houseName: (formData.get('houseName') as string) || '',
            level: ((formData.get('schoolSection') as string) || 'UPPER').includes('Primary') ? 'PRIMARY' : 'UPPER',
            chiefHouseMaster: (formData.get('chiefHouseMaster') as string) || '',
            houseCaptain: (formData.get('houseCaptain') as string) || '',
            viceCaptain: (formData.get('houseViceCaptain') as string) || '',
            housePrefects,
            motto: formData.get('houseMotto') as string,
            historyOrigin: formData.get('houseHistory') as string,
            athleticMeetAchievements: (formData.get('athleticAchievements') as string) || '',
            totalActiveMembers: parseIntSafe(formData.get('totalActiveMembers') as string),
            houseFlagUrl,
            actionPhotos,
            notableAlumni,
            socialMediaLinks,
          },
        });
        break;
      }

      case 'associations': {
        const logoUrl = await uploadSingleFile('logo');
        const socialMediaLinks = parseTextToArray(formData.get('socialLinks') as string);

        result = await prisma.associationForm.create({
          data: {
            associationName: (formData.get('associationName') as string) || '',
            presidentName: (formData.get('presidentName') as string) || '',
            micName: (formData.get('micName') as string) || '',
            officialContact: (formData.get('officialContact') as string) || '',
            registeredMembers: parseIntSafe(formData.get('registeredMembers') as string),
            keyContributions: (formData.get('keyContributions') as string) || '',
            upcomingEvents: formData.get('upcomingEvents') as string,
            logoUrl,
            socialMediaLinks,
          },
        });
        break;
      }

      case 'obu': {
        const logoUrl = await uploadSingleFile('obuLogo');
        const distinguishedAlumni = parseTextToArray(formData.get('distinguishedAlumni') as string);
        const socialMediaLinks = parseTextToArray(formData.get('socialLinks') as string);

        result = await prisma.obuDataForm.create({
          data: {
            branchName: (formData.get('branchName') as string) || '',
            presidentName: (formData.get('presidentName') as string) || '',
            secretaryName: (formData.get('secretaryName') as string) || '',
            officialContact: (formData.get('officialContact') as string) || '',
            registeredMembersCount: parseIntSafe(formData.get('registeredMembers') as string),
            keyContributions: (formData.get('keyContributions') as string) || '',
            upcomingEvents: (formData.get('upcomingEvents') as string) || '',
            distinguishedAlumni,
            logoUrl,
            socialMediaLinks,
          },
        });
        break;
      }

      case 'sports-wings': {
        const mediaUploads = await uploadFiles('mediaUploads');
        const socialMediaLinks = parseTextToArray(formData.get('socialLinks') as string);

        result = await prisma.sportsWingForm.create({
          data: {
            wingName: (formData.get('wingName') as string) || '',
            affiliatedSport: (formData.get('affiliatedSport') as string) || '',
            presidentName: (formData.get('presidentName') as string) || '',
            presidentContact: (formData.get('presidentContact') as string) || '',
            secretaryName: (formData.get('secretaryName') as string) || '',
            treasurerName: (formData.get('treasurerName') as string) || '',
            activeMembersCount: parseIntSafe(formData.get('activeMembersCount') as string),
            inceptionYear: (formData.get('inceptionYear') as string) || '',
            keyContributions: (formData.get('keyContributions') as string) || '',
            majorEvents: formData.get('majorEvents') as string,
            socialMediaLinks,
            mediaUploads,
          },
        });
        break;
      }

      case 'alumni-batches': {
        const mediaUploads = await uploadFiles('mediaUploads');
        const distinguishedAlumni = parseTextToArray(formData.get('distinguishedAlumni') as string);
        const socialMediaLinks = parseTextToArray(formData.get('socialLinks') as string);

        result = await prisma.alumniBatchForm.create({
          data: {
            batchYear: (formData.get('batchYear') as string) || '',
            presidentName: (formData.get('presidentName') as string) || '',
            presidentContact: (formData.get('presidentContact') as string) || '',
            secretaryName: (formData.get('secretaryName') as string) || '',
            activeMembers: parseIntSafe(formData.get('activeMembers') as string),
            contributions: (formData.get('contributions') as string) || '',
            majorEvents: formData.get('majorEvents') as string,
            distinguishedAlumni,
            socialMediaLinks,
            mediaUploads,
          },
        });
        break;
      }

      case 'teachers-guild': {
        const mediaUploads = await uploadFiles('mediaUploads');

        result = await prisma.teachersGuildForm.create({
          data: {
            guildName: (formData.get('guildName') as string) || '',
            presidentName: (formData.get('presidentName') as string) || '',
            presidentContact: (formData.get('presidentContact') as string) || '',
            secretaryName: (formData.get('secretaryName') as string) || '',
            treasurerName: (formData.get('treasurerName') as string) || '',
            totalMembers: parseIntSafe(formData.get('totalMembers') as string),
            mission: (formData.get('mission') as string) || '',
            majorEvents: formData.get('majorEvents') as string,
            contributions: formData.get('contributions') as string,
            mediaUploads,
          },
        });
        break;
      }

      case 'welfare-society': {
        const mediaUploads = await uploadFiles('mediaUploads');

        result = await prisma.welfareSocietyForm.create({
          data: {
            societyName: (formData.get('societyName') as string) || '',
            presidentName: (formData.get('presidentName') as string) || '',
            presidentContact: (formData.get('presidentContact') as string) || '',
            secretaryName: (formData.get('secretaryName') as string) || '',
            treasurerName: (formData.get('treasurerName') as string) || '',
            registeredMembers: parseIntSafe(formData.get('registeredMembers') as string),
            inceptionYear: (formData.get('inceptionYear') as string) || '',
            mission: (formData.get('mission') as string) || '',
            annualEvents: formData.get('annualEvents') as string,
            contributions: formData.get('contributions') as string,
            mediaUploads,
          },
        });
        break;
      }

      default:
        return NextResponse.json({ error: `Category '${category}' is not supported` }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during submission' }, { status: 500 });
  }
}
