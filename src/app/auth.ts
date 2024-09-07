// COM(MINOR): auth.ts, AuthContext.ts, AuthProvider.tsx가 app 폴더 안에 직접 있는 것 보다 분리하는 게 좋을 것 같다.
import firebaseApp from './firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default auth;
