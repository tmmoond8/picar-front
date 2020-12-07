export const ownerTypes = [
  { value: 'owner', displayName: '오너' },
  { value: 'preOwner', displayName: '예비오너' },
] as const;

export type OwnerTypes = typeof ownerTypes;