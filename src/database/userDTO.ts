import type technologies from './technologyDTO';

export default interface user {
  id: string;
  name: string;
  username: string;
  technologies: technologies[];
}
