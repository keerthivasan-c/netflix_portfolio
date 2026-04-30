// queries/getProfileBanner.ts
import datoCMSClient from './datoCMSClient';
import { ProfileBanner } from '../types';

const GET_PROFILE_BANNER = `
  query {
    profileBanner {
      backgroundImage {
        url
      }
      headline
      resumeLink
      linkedinLink
      profileSummary
    }
  }
`;

export async function getProfileBanner(): Promise<ProfileBanner> {
  const data = await datoCMSClient.request<{ profileBanner: ProfileBanner }>(GET_PROFILE_BANNER);
  return data.profileBanner;
}
