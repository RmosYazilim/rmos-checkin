export interface DataItemType {
  Id: number;
  Kod: string;
  Ad: string;
  Sinif: string | null;
  Re: string | null;
  Ba: string | null;
  Satisahaziroda: number;
  Satisahaziryatak: number;
  SabitTutar: number;
  Indirim_yuzde: number;
  db_Id: number;
  Xmlkodu: number;
}

export interface DataResponseType {
  isSucceded: boolean;
  message: string | null;
  messageList: string[];
  value: DataItemType[];
}
