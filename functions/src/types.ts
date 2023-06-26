export interface User {
  // Id matches the document id in the Users collection
  id: string;
}

export interface Recording {
  // Id matches document id in the Recordings collection
  id: string;

  // CreatorId is the Id of the user who made this recording
  creatorId: string;
}

export enum Collections {
    Users = "Users",
    Recordings = "Recordings"
}
