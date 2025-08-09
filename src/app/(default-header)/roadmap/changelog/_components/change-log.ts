type ChangeLogItem = {
  date: string;
  bugs?: string[];
  improvements?: string[];
};

export const changeLog: ChangeLogItem[] = [
  {
    date: '07/08/2025',
    improvements: [
      'Tilføjet oversigt over henvisninger',
      'Tilføjet oversigt over transaktioner',
      'Tilføjet dashboard med indsigt i tal',
      'Tilføjet unikt henvisningslink'
    ],
  },
];
