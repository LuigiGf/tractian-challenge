import { createContext } from 'react';

type dataProps = {
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    maxTemp: number;
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: string;
  };
  unitId: number;
  companyId: number;
}

export const DataContext = createContext<dataProps[]>([{
  "id": 1,
  "sensors": [
    "GSJ1535"
  ],
  "model": "motor",
  "status": "inAlert",
  "healthscore": 70,
  "name": "Motor H13D-1",
  "image": "https://tractian-img.s3.amazonaws.com/6d5028682016cb43d02b857d4f1384ae.jpeg",
  "specifications": {
    "maxTemp": 80
  },
  "metrics": {
    "totalCollectsUptime": 7516,
    "totalUptime": 1419.620084999977,
    "lastUptimeAt": "2021-02-16T16:17:50.180Z"
  },
  "unitId": 1,
  "companyId": 1
}]);

