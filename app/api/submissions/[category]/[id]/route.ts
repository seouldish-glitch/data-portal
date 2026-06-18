import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest, { params }: { params: { category: string, id: string } }) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('user_session')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { category, id } = params;
    let submission;

    switch (category) {
      case 'sports': submission = await prisma.sportForm.findFirst({ where: { id, userId } }); break;
      case 'clubs': submission = await prisma.clubSocietyForm.findFirst({ where: { id, userId } }); break;
      case 'prefects': submission = await prisma.prefectsGuildForm.findFirst({ where: { id, userId } }); break;
      case 'academic': 
      case 'academics': submission = await prisma.academicAchievementForm.findFirst({ where: { id, userId } }); break;
      case 'houses': submission = await prisma.houseForm.findFirst({ where: { id, userId } }); break;
      case 'associations': submission = await prisma.associationForm.findFirst({ where: { id, userId } }); break;
      case 'obu': submission = await prisma.obuDataForm.findFirst({ where: { id, userId } }); break;
      case 'sports-wings': submission = await prisma.sportsWingForm.findFirst({ where: { id, userId } }); break;
      case 'alumni-batches': submission = await prisma.alumniBatchForm.findFirst({ where: { id, userId } }); break;
      case 'teachers-guild': submission = await prisma.teachersGuildForm.findFirst({ where: { id, userId } }); break;
      case 'welfare-society': submission = await prisma.welfareSocietyForm.findFirst({ where: { id, userId } }); break;
      case 'choir': submission = await prisma.choirForm.findFirst({ where: { id, userId } }); break;
      case 'band': submission = await prisma.bandForm.findFirst({ where: { id, userId } }); break;
      case 'cadets': submission = await prisma.cadetsForm.findFirst({ where: { id, userId } }); break;
      case 'scouts': submission = await prisma.scoutsForm.findFirst({ where: { id, userId } }); break;
      case 'orchestra': submission = await prisma.orchestraForm.findFirst({ where: { id, userId } }); break;
      default: return NextResponse.json({ error: `Category '${category}' is not supported` }, { status: 400 });
    }

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ submission }, { status: 200 });
  } catch (error: any) {
    console.error('Submission fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
