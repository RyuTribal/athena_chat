export interface Chat {
  id: number;
  title: string;
  history: History[];
}

export interface History {
  is_sent: boolean;
  message: string;
  images?: string[];
}
