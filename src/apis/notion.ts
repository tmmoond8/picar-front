import axios, { AxiosResponse } from 'axios';
import { BlockMapType } from 'react-notion';

const splitbee = 'https://notion-api.splitbee.io/v1/page';
export const getPage = async (
  path: string,
): Promise<AxiosResponse<BlockMapType>> =>
  await axios.get(`${splitbee}/${path}`);
