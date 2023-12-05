import AppError from '@shared/errors/AppError';
import axios, { Axios } from 'axios';
import { ICreatePlanGalaxPayProvider } from '../dtos/IGalaxPayProvider';
import IGalaxPayProvider from '../models/IGalaxPayProvider';

class CodeGeneratorProvider implements IGalaxPayProvider {
  private axios: Axios

  constructor() {
    this.axios = axios.create({
      baseURL: "https://api.sandbox.cloud.galaxpay.com.br"
    })
  }

  async createPlan(data: ICreatePlanGalaxPayProvider): Promise<any> {
    try {
      return this.axios.post('/v2/plans', {
        "myId": "pay-656d21323db8d1.75864562",
        "name": "Plano mensal 2 pessoas",
        "periodicity": "monthly",
        "quantity": 1,
        "additionalInfo": "Lorem ipsum dolor sit amet.",
        "PlanPrices": [
          {
            "payment": "creditcard",
            "value": 12999
          }
        ]
      },
        {
          headers: {
            'Authorization': 'Bearer e1a676293e9733a6e0218fca72705b2b093a15fc'
          }
        })

    } catch (err: any) {
      throw new AppError(JSON.stringify(err.response))
    }

  }
}

export default CodeGeneratorProvider;
