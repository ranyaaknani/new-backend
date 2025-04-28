import { Role } from '../../users/user.entity'; // ou remplace par 'admin' | 'formateur' | 'participant'

declare global {
  namespace Express {
    interface User {
      userId: string;
      email: string;
      role: Role;
    }

    interface Request {
      user?: User;
    }
  }
}
