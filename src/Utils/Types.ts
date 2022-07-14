export interface User {
  username: string,
  email: string,
  password: string,
}

export interface UserPassword {
  password: string,
}

export enum Gender {'Male', 'Female', 'Others'};
export enum Status {'Single', 'In Relationship', 'Not Interested'};

export interface PersonalInfo {
  id: string,
  fullName: string,
  dob: string,
  gender: Gender,
  status: Status
}

export interface MediaUrl {
  url: string,
  type: string
}

export interface Post {
  caption: string,
  mediaUrl: MediaUrl,
  ownerId: string
}

export enum RelationType { 
  requested = 'Requested',
  following = 'Following' 
};

export interface UserRelation {
  userId: string,
  followerId: string,
  type: RelationType
}

export interface UserRelationIds {
  userId: string,
  followerId: string
}