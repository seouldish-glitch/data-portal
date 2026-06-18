export type FieldConfig = {
  name: string;
  label: string;
  type: 'text' | 'tel' | 'number' | 'textarea' | 'select' | 'file';
  options?: string[]; // For 'select' type
  accept?: string;    // For 'file' type (e.g. '.png, .jpg')
  required?: boolean;
};

export type FormConfig = {
  title: string;
  subtitle: string;
  fields: FieldConfig[];
};

export const FORMS_CONFIG: Record<string, FormConfig> = {
  sports: {
    title: 'Sports Data Collection Form',
    subtitle: '(To be filled by the respective Master-in-Charge / Head Coach)',
    fields: [
      { name: 'sportName', label: '1. Name of the Sport', type: 'text', required: true },
      { name: 'micName', label: "2. Current Master-in-Charge (MIC's) Name", type: 'text', required: true },
      { name: 'micContact', label: "3. MIC's Contact Number", type: 'tel', required: true },
      { name: 'headCoachName', label: "4. Current Head Coach's Name", type: 'text', required: true },
      { name: 'assistantCoaches', label: '5. Names of Assistant Coaches', type: 'textarea', required: false },
      { name: 'captainName', label: '6. Name of the Current Captain', type: 'text', required: true },
      { name: 'captainContact', label: "7. Captain's Contact Number", type: 'tel', required: true },
      { name: 'viceCaptainName', label: '8. Name of the Current Vice-Captain', type: 'text', required: false },
      { name: 'ageGroupCaptains', label: '9. Names of Age Group Captains', type: 'textarea', required: false },
      { name: 'seniorSquadRoster', label: '10. Senior Squad Roster (1st XV, 1st XI) (Player names and playing positions)', type: 'textarea', required: true },
      { name: 'inceptionYear', label: '11. Year of Inception and Founder', type: 'text', required: true },
      { name: 'firstMic', label: '12. First Master-in-Charge (MIC) of the Sport', type: 'text', required: true },
      { name: 'firstCoach', label: '13. First Coach of the Sport', type: 'text', required: true },
      { name: 'firstCaptain', label: '14. First Captain of the Sport', type: 'text', required: true },
      { name: 'internationalAchievements', label: '15. International / World Stage Achievements', type: 'textarea', required: false },
      { name: 'nationalAchievements', label: '16. All-Island / National Level Achievements', type: 'textarea', required: false },
      { name: 'provincialAchievements', label: '17. Provincial / Zonal / Divisional Level Achievements', type: 'textarea', required: false },
      { name: 'traditionalEncounters', label: '18. Annual Traditional Encounters / Big Matches (Details & Current Title Status)', type: 'textarea', required: false },
      { name: 'nationalCaps', label: '19. National Caps / Wall of Fame (Names of players who have represented the Sri Lanka National Team)', type: 'textarea', required: false },
      { name: 'logo', label: '20. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '21. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '22. Official Media Uploads & Links (3 Action Photos, Official Social Media Links)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  clubs: {
    title: 'Clubs & Societies Data Collection Form',
    subtitle: '(To be filled by the respective Master/Lady-in-Charge or President)',
    fields: [
      { name: 'clubName', label: '1. Name of the Club/Society', type: 'text', required: true },
      { name: 'micName', label: "2. Current Master-in-Charge (MIC's) Name", type: 'text', required: true },
      { name: 'micContact', label: "3. MIC's Contact Number", type: 'tel', required: true },
      { name: 'presidentName', label: "4. Current President's Name", type: 'text', required: true },
      { name: 'presidentContact', label: "5. President's Contact Number", type: 'tel', required: true },
      { name: 'secretaryName', label: "6. Current Secretary's Name", type: 'text', required: true },
      { name: 'treasurerName', label: "7. Current Treasurer's Name", type: 'text', required: true },
      { name: 'otherExco', label: '8. Other Executive Board Members (e.g., Vice President, Coordinator)', type: 'textarea', required: false },
      { name: 'activeMembersCount', label: '9. Total Active Members Count', type: 'number', required: true },
      { name: 'inceptionYear', label: '10. Year of Inception and Founder', type: 'text', required: true },
      { name: 'firstMic', label: '11. First Master-in-Charge (MIC) of the Club/Society', type: 'text', required: true },
      { name: 'firstPresident', label: '12. First President of the Club/Society', type: 'text', required: true },
      { name: 'objectiveMotto', label: '13. Main Objective / Motto', type: 'textarea', required: true },
      { name: 'majorProjects', label: '14. Major Annual Projects / Events (e.g., Sinhala Day, Exhibitions, Camps)', type: 'textarea', required: false },
      { name: 'internationalAchievements', label: '15. International / World Stage Achievements or Representations', type: 'textarea', required: false },
      { name: 'nationalAchievements', label: '16. National / All-Island Achievements', type: 'textarea', required: false },
      { name: 'provincialAchievements', label: '17. Zonal / Provincial Level Achievements', type: 'textarea', required: false },
      { name: 'notableAlumni', label: '18. Notable Alumni / Wall of Fame (Past members currently in prominent societal positions)', type: 'textarea', required: false },
      { name: 'socialLinks', label: '19. Official Social Media / Website Links', type: 'textarea', required: false },
      { name: 'logo', label: '20. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '21. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '22. Official Media Uploads (Top 3 Project Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  prefects: {
    title: 'Board of Prefects Data Collection Form',
    subtitle: '(To be filled by the Guild MIC or Head Prefect)',
    fields: [
      { name: 'schoolSection', label: '1. School Section', type: 'select', options: ['Primary School', 'Upper School'], required: true },
      { name: 'micName', label: '2. Name of the Master-in-Charge (MIC)', type: 'text', required: true },
      { name: 'micContact', label: "3. MIC's Contact Number", type: 'tel', required: true },
      { name: 'headPrefectDetails', label: '4. Name and Contact Number of the Head Prefect', type: 'text', required: true },
      { name: 'deputyHeadPrefects', label: '5. Names of the Deputy Head Prefects', type: 'textarea', required: true },
      { name: 'seniorPrefects', label: '6. Senior Prefects (Count and Full Name List)', type: 'textarea', required: true },
      { name: 'secondYearCount', label: '7. 2nd Year Prefects (Total Count)', type: 'number', required: true },
      { name: 'juniorPrefectsCount', label: '8. Junior Prefects (Total Count)', type: 'number', required: true },
      { name: 'firstHeadPrefect', label: '9. Name of the First Head Prefect of the College', type: 'text', required: true },
      { name: 'establishmentYear', label: '10. Year of Establishment', type: 'text', required: true },
      { name: 'pastHeadPrefects', label: '11. Notable Past Head Prefects', type: 'textarea', required: false },
      { name: 'majorEvents', label: '12. Major Annual Events', type: 'textarea', required: false },
      { name: 'coreDuties', label: '13. Core Duties & Mission', type: 'textarea', required: true },
      { name: 'guildLogo', label: '14. Board Badge/Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'logo', label: '15. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '16. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'officialPhotos', label: '17. Official Photos (Top Board Photo)', type: 'file', accept: 'image/*, .zip, .rar', required: false },
      { name: 'socialLinks', label: '18. Official Social Media Links', type: 'textarea', required: false }
    ]
  },
  academics: {
    title: 'Academic Achievements Form',
    subtitle: '(To be filled by Sectional Heads - Primary, O/L, A/L Science, Commerce, Arts, Tech)',
    fields: [
      { name: 'academicStream', label: '1. Academic Section / Stream', type: 'select', options: ['Primary', 'Science', 'Mathematics', 'Commerce', 'Arts', 'Tech', 'Edexcel - International Advanced Level', 'IGCSE'], required: true },
      { name: 'sectionalHeadName', label: '2. Name of the Sectional Head', type: 'text', required: true },
      { name: 'totalStudents', label: '3. Total Number of Students in the Section', type: 'number', required: true },
      { name: 'topPerformingClass', label: '4. Top Performing Stream/Class', type: 'text', required: false },
      { name: 'passRatesComparison', label: '5. 3-Year Comparison of Pass Rates', type: 'textarea', required: false },
      { name: 'topAchievers', label: '6. List of Top Achievers', type: 'textarea', required: true },
      { name: 'academicMilestones', label: '7. Notable Academic Milestones/Awards', type: 'textarea', required: false },
      { name: 'subjectHighlights', label: '8. Subject-wise Highlights', type: 'textarea', required: false },
      { name: 'notableAlumni', label: '9. Notable Alumni', type: 'textarea', required: false },
      { name: 'logo', label: '10. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '11. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'officialPhotos', label: '12. Official Photos', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  houses: {
    title: 'House System Data Form',
    subtitle: '(To be filled by House Masters)',
    fields: [
      { name: 'schoolSection', label: '1. School Section', type: 'select', options: ['Primary School', 'Upper School'], required: true },
      { name: 'houseName', label: '2. House Name', type: 'select', options: ['Camillus', 'Cassian', 'Luke', 'Claude'], required: true },
      { name: 'chiefHouseMaster', label: '3. Name of the Chief House Master', type: 'text', required: true },
      { name: 'houseCaptain', label: '4. Name of the House Captain', type: 'text', required: true },
      { name: 'houseViceCaptain', label: '5. Name of the Assistant / Vice-Captain', type: 'text', required: false },
      { name: 'housePrefects', label: '6. Names of House Prefects', type: 'textarea', required: false },
      { name: 'houseMotto', label: '7. House Motto / Slogan (Optional)', type: 'text', required: false },
      { name: 'houseHistory', label: '8. Brief History of the House Name / Origin', type: 'textarea', required: true },
      { name: 'athleticAchievements', label: '9. Athletic / Sports Meet Achievements (Record of the last 5 years)', type: 'textarea', required: true },
      { name: 'totalActiveMembers', label: '10. Total Number of Active House Members', type: 'number', required: true },
      { name: 'houseFlag', label: '11. House Flag/Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'actionPhotos', label: '12. Action Photos (Best shots from Sports Meets)', type: 'file', accept: 'image/*, .zip, .rar', required: false },
      { name: 'notableAlumni', label: '13. Notable House Alumni (Wall of Fame)', type: 'textarea', required: false },
      { name: 'challengeShields', label: '14. Special Challenge Shields / Awards Won', type: 'textarea', required: false },
      { name: 'houseCheer', label: '15. House Cheer / Anthem', type: 'textarea', required: false },
      { name: 'socialLinks', label: '16. Official Social Media / Group Links', type: 'textarea', required: false },
      { name: 'logo', label: '17. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '18. Official Group Photo', type: 'file', accept: 'image/*', required: false }
    ]
  },
  associations: {
    title: 'Associations / Welfare Societies Form',
    subtitle: '(To be filled by the General Secretary or Association President)',
    fields: [
      { name: 'associationName', label: '1. Name of the Association/Society', type: 'text', required: true },
      { name: 'presidentName', label: '2. Name of the Current President', type: 'text', required: true },
      { name: 'micName', label: '3. Name of the Master/Lady-in-Charge', type: 'text', required: true },
      { name: 'officialContact', label: '4. Official Contact Email/Phone Number', type: 'text', required: true },
      { name: 'registeredMembers', label: '5. Current Number of Registered Members', type: 'number', required: true },
      { name: 'keyContributions', label: '6. Key Contributions to the College', type: 'textarea', required: true },
      { name: 'upcomingEvents', label: '7. Upcoming Events / Projects', type: 'textarea', required: false },
      { name: 'logo', label: '8. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '9. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'socialLinks', label: '10. Official Social Media / Website Links', type: 'textarea', required: false }
    ]
  },
  obu: {
    title: "Old Boys' Union (OBU) Data Form",
    subtitle: '(To be filled by the General Secretary or Branch Presidents)',
    fields: [
      { name: 'branchName', label: '1. Name of the Branch/Chapter (e.g., Parent Body, UK Branch, Australia Branch)', type: 'text', required: true },
      { name: 'presidentName', label: '2. Name of the Current President', type: 'text', required: true },
      { name: 'secretaryName', label: '3. Name of the Current Secretary', type: 'text', required: true },
      { name: 'officialContact', label: '4. Official Contact Email/Phone Number', type: 'text', required: true },
      { name: 'registeredMembers', label: '5. Current Number of Registered Members', type: 'number', required: true },
      { name: 'keyContributions', label: '6. Key Contributions to the College (Major infrastructure/academic projects funded)', type: 'textarea', required: true },
      { name: 'upcomingEvents', label: '7. Upcoming Anniversary Events (Global 161st celebration events)', type: 'textarea', required: false },
      { name: 'distinguishedAlumni', label: '8. Distinguished Alumni Highlights', type: 'textarea', required: false },
      { name: 'obuLogo', label: '9. Official OBU Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'logo', label: '10. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '11. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'socialLinks', label: '12. Official Social Media / Website Links', type: 'textarea', required: false }
    ]
  },
  'sports-wings': {
    title: 'Sports Wings Data Collection Form',
    subtitle: '(To be filled by the President or Secretary of the respective Sports Wing)',
    fields: [
      { name: 'wingName', label: '1. Name of the Sports Wing (e.g., Cricket Wing, Basketball Wing)', type: 'text', required: true },
      { name: 'affiliatedSport', label: '2. Affiliated Sport', type: 'text', required: true },
      { name: 'presidentName', label: "3. Current President / Chairman's Name", type: 'text', required: true },
      { name: 'presidentContact', label: "4. President's Contact Number", type: 'tel', required: true },
      { name: 'secretaryName', label: "5. Current Secretary's Name", type: 'text', required: true },
      { name: 'treasurerName', label: "6. Current Treasurer's Name", type: 'text', required: true },
      { name: 'activeMembersCount', label: '7. Total Active Members Count', type: 'number', required: true },
      { name: 'inceptionYear', label: '8. Year of Inception of the Wing', type: 'text', required: true },
      { name: 'keyContributions', label: '9. Key Contributions / Support Provided (e.g., Sponsoring coaches, funding sports gear, building pavilions/nets)', type: 'textarea', required: true },
      { name: 'majorEvents', label: '10. Major Annual Events / Fundraisers (e.g., Wing AGM, Fellowship Dinners, Tournaments)', type: 'textarea', required: false },
      { name: 'socialLinks', label: '11. Official Social Media / Group Links (Facebook page, WhatsApp group links)', type: 'textarea', required: false },
      { name: 'logo', label: '12. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '13. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '14. Official Media Uploads (Top 3 Project/Event Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  'alumni-batches': {
    title: 'Alumni Batches / Group Data Collection Form',
    subtitle: '(To be filled by the Batch President or Chief Coordinator)',
    fields: [
      { name: 'batchYear', label: '1. Batch Year / Group Name (e.g., Batch of 98)', type: 'text', required: true },
      { name: 'presidentName', label: '2. Name of the Current President / Chief Coordinator', type: 'text', required: true },
      { name: 'presidentContact', label: "3. President/Coordinator's Contact Number", type: 'tel', required: true },
      { name: 'secretaryName', label: '4. Name of the Current Secretary', type: 'text', required: true },
      { name: 'activeMembers', label: '5. Total Number of Active Members in the Batch', type: 'number', required: true },
      { name: 'contributions', label: '6. Key Contributions to the College (Infrastructure, Scholarships)', type: 'textarea', required: true },
      { name: 'majorEvents', label: '7. Major Annual Batch Events (Get-togethers, AGMs)', type: 'textarea', required: false },
      { name: 'distinguishedAlumni', label: '8. Notable / Distinguished Alumni from the Batch', type: 'textarea', required: false },
      { name: 'socialLinks', label: '9. Official Social Media Links (Facebook Group, WhatsApp)', type: 'textarea', required: false },
      { name: 'logo', label: '10. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '11. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '12. Official Media Uploads (Other Event Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  'teachers-guild': {
    title: "Teachers' Guild Data Collection Form",
    subtitle: "(To be filled by the President or Secretary of the Teachers' Guild)",
    fields: [
      { name: 'guildName', label: "1. Name of the Guild (e.g., Teachers' Guild of St. Benedict's College)", type: 'text', required: true },
      { name: 'presidentName', label: "2. Current President's Name", type: 'text', required: true },
      { name: 'presidentContact', label: "3. President's Contact Number", type: 'tel', required: true },
      { name: 'secretaryName', label: "4. Current Secretary's Name", type: 'text', required: true },
      { name: 'treasurerName', label: "5. Current Treasurer's Name", type: 'text', required: true },
      { name: 'totalMembers', label: '6. Total Number of Members (Total teaching staff involved)', type: 'number', required: true },
      { name: 'mission', label: '7. Main Objectives / Mission of the Guild', type: 'textarea', required: true },
      { name: 'majorEvents', label: '8. Major Annual Events / Programs (Teachers\' Day, Staff Retreats)', type: 'textarea', required: false },
      { name: 'contributions', label: '9. Notable Contributions to the College / Staff Welfare', type: 'textarea', required: false },
      { name: 'logo', label: '10. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '11. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '12. Official Media Uploads (Top Event Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  'welfare-society': {
    title: 'Welfare Society Data Collection Form',
    subtitle: '(To be filled by the Welfare Society President or Secretary)',
    fields: [
      { name: 'societyName', label: '1. Name of the Welfare Society', type: 'text', required: true },
      { name: 'presidentName', label: "2. Current President's Name", type: 'text', required: true },
      { name: 'presidentContact', label: "3. President's Contact Number", type: 'tel', required: true },
      { name: 'secretaryName', label: "4. Current Secretary's Name", type: 'text', required: true },
      { name: 'treasurerName', label: "5. Current Treasurer's Name", type: 'text', required: true },
      { name: 'registeredMembers', label: '6. Total Number of Registered Members', type: 'number', required: true },
      { name: 'inceptionYear', label: '7. Year of Inception', type: 'text', required: true },
      { name: 'mission', label: '8. Primary Objective / Mission of the Society', type: 'textarea', required: true },
      { name: 'annualEvents', label: '9. Annual Events / Programs (Annual Trip, Medical Camps)', type: 'textarea', required: false },
      { name: 'contributions', label: '10. Major Contributions / Support provided to the Staff or College', type: 'textarea', required: false },
      { name: 'logo', label: '11. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '12. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '13. Official Media Uploads (Top Event Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  choir: {
    title: 'Choir Data Collection Form',
    subtitle: '(To be filled by the Master-in-Charge or Choir Master)',
    fields: [
      { name: 'subCategory', label: '1. Choir Category', type: 'select', options: ['Primary Choir', 'Senior Choir'], required: true },
      { name: 'micName', label: '2. Name of the Master-in-Charge (MIC)', type: 'text', required: true },
      { name: 'choirMaster', label: '3. Name of the Choir Master / Director', type: 'text', required: true },
      { name: 'leaders', label: '4. Names of Choir Leaders / Committee', type: 'textarea', required: false },
      { name: 'membersCount', label: '5. Total Number of Members', type: 'number', required: true },
      { name: 'achievements', label: '6. Recent Achievements and Awards', type: 'textarea', required: false },
      { name: 'events', label: '7. Major Annual Events / Performances', type: 'textarea', required: false },
      { name: 'socialLinks', label: '8. Official Social Media / Group Links', type: 'textarea', required: false },
      { name: 'logo', label: '9. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '10. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '11. Official Media Uploads (Event Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  band: {
    title: 'Band Data Collection Form',
    subtitle: '(To be filled by the Master-in-Charge or Band Master)',
    fields: [
      { name: 'bandCategory', label: '1. Band Category', type: 'select', options: ['Western Band', 'Eastern Band', 'Primary Western Band', 'Primary Eastern Band'], required: true },
      { name: 'micName', label: '2. Name of the Master-in-Charge (MIC)', type: 'text', required: true },
      { name: 'bandMaster', label: '3. Name of the Band Master / Instructor', type: 'text', required: true },
      { name: 'bandLeader', label: '4. Name of the Band Leader / Sergeant', type: 'text', required: true },
      { name: 'committee', label: '5. Names of other Committee Members', type: 'textarea', required: false },
      { name: 'membersCount', label: '6. Total Number of Members', type: 'number', required: true },
      { name: 'achievements', label: '7. Recent Achievements and Awards', type: 'textarea', required: false },
      { name: 'events', label: '8. Major Annual Events / Performances', type: 'textarea', required: false },
      { name: 'socialLinks', label: '9. Official Social Media / Group Links', type: 'textarea', required: false },
      { name: 'logo', label: '10. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '11. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '12. Official Media Uploads (Event Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  cadets: {
    title: 'Cadets Platoon Data Collection Form',
    subtitle: '(To be filled by the Officer-in-Charge)',
    fields: [
      { name: 'platoonName', label: '1. Name of the Platoon', type: 'text', required: true },
      { name: 'oicName', label: '2. Name of the Officer-in-Charge (OIC)', type: 'text', required: true },
      { name: 'sergeantName', label: '3. Name of the Sergeant', type: 'text', required: true },
      { name: 'corporals', label: '4. Names of Corporals / Other NCOs', type: 'textarea', required: false },
      { name: 'membersCount', label: '5. Total Number of Cadets', type: 'number', required: true },
      { name: 'camps', label: '6. Annual Camps Attended', type: 'textarea', required: false },
      { name: 'achievements', label: '7. Recent Achievements and Awards', type: 'textarea', required: false },
      { name: 'socialLinks', label: '8. Official Social Media / Group Links', type: 'textarea', required: false },
      { name: 'logo', label: '9. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '10. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '11. Official Media Uploads (Camp Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  scouts: {
    title: 'Scouts Troop Data Collection Form',
    subtitle: '(To be filled by the Group Scout Leader or Master-in-Charge)',
    fields: [
      { name: 'troopName', label: '1. Name of the Scout Troop', type: 'text', required: true },
      { name: 'micName', label: '2. Name of the Master-in-Charge (MIC)', type: 'text', required: true },
      { name: 'gslName', label: '3. Name of the Group Scout Leader (GSL)', type: 'text', required: true },
      { name: 'troopLeader', label: '4. Name of the Troop Leader', type: 'text', required: true },
      { name: 'patrolLeaders', label: '5. Names of Patrol Leaders', type: 'textarea', required: false },
      { name: 'membersCount', label: '6. Total Number of Scouts', type: 'number', required: true },
      { name: 'camps', label: '7. Annual Jamborees / Camps Attended', type: 'textarea', required: false },
      { name: 'achievements', label: '8. Recent Achievements and Awards', type: 'textarea', required: false },
      { name: 'socialLinks', label: '9. Official Social Media / Group Links', type: 'textarea', required: false },
      { name: 'logo', label: '10. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '11. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '12. Official Media Uploads (Camp Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  },
  orchestra: {
    title: 'Orchestra Data Collection Form',
    subtitle: '(To be filled by the Master-in-Charge or Conductor)',
    fields: [
      { name: 'micName', label: '1. Name of the Master-in-Charge (MIC)', type: 'text', required: true },
      { name: 'conductorName', label: '2. Name of the Conductor', type: 'text', required: true },
      { name: 'leaderName', label: '3. Name of the Orchestra Leader', type: 'text', required: true },
      { name: 'committee', label: '4. Names of other Committee Members', type: 'textarea', required: false },
      { name: 'membersCount', label: '5. Total Number of Members', type: 'number', required: true },
      { name: 'achievements', label: '6. Recent Achievements and Awards', type: 'textarea', required: false },
      { name: 'events', label: '7. Major Annual Events / Performances', type: 'textarea', required: false },
      { name: 'socialLinks', label: '8. Official Social Media / Group Links', type: 'textarea', required: false },
      { name: 'logo', label: '9. Official Logo (PNG format)', type: 'file', accept: '.png', required: false },
      { name: 'groupPhoto', label: '10. Official Group Photo', type: 'file', accept: 'image/*', required: false },
      { name: 'mediaUploads', label: '11. Official Media Uploads (Event Photos)', type: 'file', accept: 'image/*, .zip, .rar', required: false }
    ]
  }
};
