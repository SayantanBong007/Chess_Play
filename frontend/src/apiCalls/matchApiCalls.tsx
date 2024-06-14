import {
  MatchDataResponse,
  MatchResultStausEnum,
  MatchsDataResponse,
} from "@/interface/matchInterface";
import axios, { AxiosResponse } from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiBaseUrl = "https://chessplay-backend.azurewebsites.net/api/v1";

export const getMatchDetailsApiCall = async (matchId: string) => {
  try {
    const response: AxiosResponse<MatchDataResponse> = await axios.get(
      `${apiBaseUrl}/match/${matchId}`
    );
    return response;
  } catch (error) {
    console.log("createMatchApiCall", error);
  }
};

export const getMatchsByUserAddressApiCall = async (userAddress: string) => {
  try {
    const response: AxiosResponse<MatchsDataResponse> = await axios.get(
      `${apiBaseUrl}/match/usermatchs/${userAddress}`
    );
    return response;
  } catch (error) {
    console.log("createMatchApiCall", error);
  }
};

export const createMatchApiCall = async (
  matchCreatorAddress: string,
  stackedAmount: number
) => {
  try {
    const response: AxiosResponse<MatchDataResponse> = await axios.post(
      `${apiBaseUrl}/match/create`,
      {
        matchCreatorAddress,
        stackedAmount,
      },
      config
    );
    return response;
  } catch (error) {
    console.log("createMatchApiCall", error);
  }
};

export const joinMatchApiCall = async (
  matchId: string,
  matchJoinerAddress: string
) => {
  try {
    const response: AxiosResponse<MatchDataResponse> = await axios.patch(
      `${apiBaseUrl}/match/joinmatch`,
      {
        matchId,
        matchJoinerAddress,
      },
      config
    );
    return response;
  } catch (error) {
    console.log("createMatchApiCall", error);
  }
};

export const setMatchWinnerApiCall = async (
  matchId: string,
  matchWinnerAddress: string,
  matchResultStatus: MatchResultStausEnum
) => {
  try {
    const response: AxiosResponse<MatchDataResponse> = await axios.patch(
      `${apiBaseUrl}/match/setmatchwinner`,
      {
        matchId,
        matchWinnerAddress,
        matchResultStatus,
      },
      config
    );
    return response;
  } catch (error) {
    console.log("setmatchwinner", error);
  }
};

export const setRewardClaimedApiCall = async (matchId: string) => {
  try {
    const response: AxiosResponse<MatchDataResponse> = await axios.patch(
      `${apiBaseUrl}/match/rewardClaimed`,
      {
        matchId,
      },
      config
    );
    return response;
  } catch (error) {
    console.log("setRewardClaimedApiCall", error);
  }
};
