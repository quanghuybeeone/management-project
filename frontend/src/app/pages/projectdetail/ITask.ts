export interface Member {
  _id: string;
  name: string;
}

export interface ITask {
  _id: string;
  projectId: string;
  name: string;
  creator: Member;
  members: Member[];
  description: string;
  status: "backlog" | "in progress" | "review code" | "testing" | "done";
}
