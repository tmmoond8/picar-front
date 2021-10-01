import axios, { AxiosResponse } from 'axios';

export const get = async (): Promise<AxiosResponse<{ data: any }>> =>
  await axios.get(
    `${process.env.REACT_APP_GOOGLE_SHEET_URL}?sheetName=picar_keywords`,
  );
