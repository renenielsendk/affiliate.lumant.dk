type ChangeLogItem = {
  date: string;
  bugs?: string[];
  improvements?: string[];
};

export const changeLog: ChangeLogItem[] = [
  {
    date: '21/09/2025',
    improvements: ['Tilføjet version 2 af henvisningslink'],
  },
  {
    date: '28/08/2025',
    improvements: ['Tilføjet "Møde booket" status til henvisninger'],
  },
  {
    date: '20/08/2025',
    improvements: ['Tilføjet link til at henvise til "book demo"'],
  },
  {
    date: '07/08/2025',
    improvements: [
      'Tilføjet oversigt over henvisninger',
      'Tilføjet oversigt over transaktioner',
      'Tilføjet dashboard med indsigt i tal',
      'Tilføjet unikt henvisningslink',
    ],
  },
];
