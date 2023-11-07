export interface Member {
  _id: string;
  name: string;
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    leader:{_id:string; name:string};
    members: Member[];
    img: string;
    dateStart: string | Date | null;
}
