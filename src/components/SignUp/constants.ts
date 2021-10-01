export const ownerTypes = [
  { value: 'owner', displayName: '보유 중' },
  { value: 'preOwner', displayName: '아직은 아니에요' },
] as const;

export type OwnerTypes = typeof ownerTypes;
