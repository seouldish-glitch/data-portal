import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('sbc_session');

    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
    }

    const category = req.nextUrl.searchParams.get('category');

    if (!category) {
      return NextResponse.json({ error: 'Category query parameter is required' }, { status: 400 });
    }

    let submissions: any[] = [];

    if (category === 'all') {
      const allPromises = [
        prisma.sportForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.clubSocietyForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.prefectsGuildForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.academicAchievementForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.houseForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.associationForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.obuDataForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.sportsWingForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.alumniBatchForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.teachersGuildForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.welfareSocietyForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.choirForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.bandForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.cadetsForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.scoutsForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.orchestraForm.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.bensWesleyCommitteeForm.findMany({ orderBy: { createdAt: 'desc' } })
      ];
      
      const results = await Promise.all(allPromises);
      submissions = results.flat().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      return NextResponse.json({ success: true, data: submissions }, { status: 200 });
    }

    switch (category) {
      case 'sports':
        submissions = await prisma.sportForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'clubs':
        submissions = await prisma.clubSocietyForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'prefects':
        submissions = await prisma.prefectsGuildForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'academics':
      case 'academic':
        submissions = await prisma.academicAchievementForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'houses':
        submissions = await prisma.houseForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'associations':
        submissions = await prisma.associationForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'obu':
        submissions = await prisma.obuDataForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'sports-wings':
        submissions = await prisma.sportsWingForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'alumni-batches':
        submissions = await prisma.alumniBatchForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'teachers-guild':
        submissions = await prisma.teachersGuildForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'welfare-society':
        submissions = await prisma.welfareSocietyForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'choir':
        submissions = await prisma.choirForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'band':
        submissions = await prisma.bandForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'cadets':
        submissions = await prisma.cadetsForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'scouts':
        submissions = await prisma.scoutsForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'orchestra':
        submissions = await prisma.orchestraForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      case 'bens-wesley-committee':
        submissions = await prisma.bensWesleyCommitteeForm.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
      default:
        return NextResponse.json({ error: `Category '${category}' is not supported` }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: submissions }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: error.message || 'An error occurred while fetching submissions' }, { status: 500 });
  }
}
