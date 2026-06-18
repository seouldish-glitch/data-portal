import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('user_session')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all submissions for the user across all models
    // Since we don't know which form they filled, we can query all and aggregate
    const [
      sports, clubs, prefects, academics, houses,
      obu, associations, sportsWings, alumniBatches,
      teachersGuild, welfareSociety, choir, band,
      cadets, scouts, orchestra
    ] = await Promise.all([
      prisma.sportForm.findMany({ where: { userId } }),
      prisma.clubSocietyForm.findMany({ where: { userId } }),
      prisma.prefectsGuildForm.findMany({ where: { userId } }),
      prisma.academicAchievementForm.findMany({ where: { userId } }),
      prisma.houseForm.findMany({ where: { userId } }),
      prisma.obuDataForm.findMany({ where: { userId } }),
      prisma.associationForm.findMany({ where: { userId } }),
      prisma.sportsWingForm.findMany({ where: { userId } }),
      prisma.alumniBatchForm.findMany({ where: { userId } }),
      prisma.teachersGuildForm.findMany({ where: { userId } }),
      prisma.welfareSocietyForm.findMany({ where: { userId } }),
      prisma.choirForm.findMany({ where: { userId } }),
      prisma.bandForm.findMany({ where: { userId } }),
      prisma.cadetsForm.findMany({ where: { userId } }),
      prisma.scoutsForm.findMany({ where: { userId } }),
      prisma.orchestraForm.findMany({ where: { userId } }),
    ]);

    const submissions = [
      ...sports.map(s => ({ ...s, _category: 'sports' })),
      ...clubs.map(s => ({ ...s, _category: 'clubs' })),
      ...prefects.map(s => ({ ...s, _category: 'prefects' })),
      ...academics.map(s => ({ ...s, _category: 'academics' })),
      ...houses.map(s => ({ ...s, _category: 'houses' })),
      ...obu.map(s => ({ ...s, _category: 'obu' })),
      ...associations.map(s => ({ ...s, _category: 'associations' })),
      ...sportsWings.map(s => ({ ...s, _category: 'sports-wings' })),
      ...alumniBatches.map(s => ({ ...s, _category: 'alumni-batches' })),
      ...teachersGuild.map(s => ({ ...s, _category: 'teachers-guild' })),
      ...welfareSociety.map(s => ({ ...s, _category: 'welfare-society' })),
      ...choir.map(s => ({ ...s, _category: 'choir' })),
      ...band.map(s => ({ ...s, _category: 'band' })),
      ...cadets.map(s => ({ ...s, _category: 'cadets' })),
      ...scouts.map(s => ({ ...s, _category: 'scouts' })),
      ...orchestra.map(s => ({ ...s, _category: 'orchestra' })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error: any) {
    console.error('Submissions fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
