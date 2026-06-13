export type ExternalUserRole = "member" | "moderator";

export type ExternalUserStatus = "active" | "suspended" | "banned" | "deactivated";

export interface ExternalUser {
  id: number;
  username: string;
  phoneNumber: string;
  email?: string | null;
  name?: string | null;
  nickname?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  role: ExternalUserRole;
  status: ExternalUserStatus;
  createdAt: string;
  updatedAt: string;
}
