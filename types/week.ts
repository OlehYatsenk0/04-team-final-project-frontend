export interface Week {
  weekNumber: number;
  daysToBirth: number;

  baby: {
    analogy: string | null;
    babySize: number;
    babyWeight: number;
    babyActivity: string;
    babyDevelopment: string;
    interestingFact: string;
    image: string;
  };

  mom: {
    feelings: {
      states: string[];
      sensationDescr: string;
    };

    comfortTips: ComfortTip[];
  };
}

export interface ComfortTip {
  _id: string;
  category: string;
  tip: string;
}
