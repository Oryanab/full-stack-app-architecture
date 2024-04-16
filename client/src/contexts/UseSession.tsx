import axios from 'axios';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { API_MAP } from '../utils/api-map.utils';

interface SessionReturnType {
    user: any;
    organization: any;
    loadingSession: boolean;
}

const SessionContext = createContext<SessionReturnType>({
    user: null,
    organization: null,
    loadingSession: false
});

export default function SessionProvider({
    children
}: {
    children: JSX.Element;
}) {
    const [user, setUser] = useState<any>(null);
    const [organization, setOrganization] = useState<any>(null);
    const [loadingSession, setLoadingSession] = useState<boolean>(false);

    const requestOrganization = useCallback(async (user: any) => {
        console.log(user);

        try {
            setLoadingSession(true);
            const { data } = await axios.get(
                `http://localhost:8080/${API_MAP.GetOrganization(user['organization_id'])}`,
                {
                    withCredentials: true
                }
            );
            setOrganization(data);
            setLoadingSession(false);
        } catch (err) {
            setLoadingSession(false);
        }
    }, []);

    const requestSession = useCallback(async () => {
        try {
            setLoadingSession(true);
            const { data } = await axios.get(
                `http://localhost:8080/${API_MAP.GetSession()}`,
                {
                    withCredentials: true
                }
            );

            setUser(data);
            requestOrganization(data);
            setLoadingSession(false);
        } catch (err) {
            setLoadingSession(false);
        }
    }, [requestOrganization]);

    useEffect(() => {
        requestSession();
    }, [requestSession]);

    const props: SessionReturnType = {
        user,
        organization,
        loadingSession
    };

    return (
        <SessionContext.Provider value={props}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);
