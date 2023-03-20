export interface Chat {
  id: number;
  title: string;
}

export interface History {
  is_sent: boolean;
  message: string;
  images?: string[];
}
