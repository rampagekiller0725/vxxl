import React, {useCallback, useContext, useEffect, useState} from "react";
import WalletConnect from "@walletconnect/client";
import qrcodeModal from "@walletconnect/qrcode-modal";
import {MeContext} from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_OPTIONS = {
    qrcodeModal,
    clientMeta: {
        description: 'VXWallet App',
        url: 'https://www.vxxl.org/',
        icons: [],
        name: 'VXWallet',
        ssl: true,
    },
}

export const WalletConnectContext = React.createContext({});

const makeThrowError = (error: any) => {
    if (error) {
        throw error
    }
}

export const WalletConnectProvider = ({ children }: any) => {
    const {address}: any = useContext(MeContext);
    const [connectors, setConnectors] = useState<any>([]);

    const [connected, setConnected] = useState(false);
    const [peerMeta, setPeerMeta] = useState(null);
    const [loading, setLoading] = useState(false);

    // EVENT HANDLERS
    const onSessionRequest = useCallback((error: any, payload: any) => {
        console.log("EVENT", "session_request");
        makeThrowError(error)

        console.log("SESSION_REQUEST", payload);
        const { peerMeta } = payload.params[0];

        setPeerMeta(peerMeta)
    }, [setPeerMeta])

    const onConnect = useCallback((error: any, payload: any) => {
        console.log("EVENT", "connect", payload);

        makeThrowError(error)
        setConnected(true);
    }, [setConnected])

    const onDisconnect = useCallback((error: any) => {
        console.log("EVENT", "disconnect");

        setConnected(false);
        setPeerMeta(null);
        setLoading(false);
        makeThrowError(error);
    }, [setPeerMeta, setConnected])

    const onSessionUpdate = useCallback((error: any) => {
        console.log("EVENT", "session_update");
        makeThrowError(error)
    }, [])

    const onCallRequest = useCallback(async (error: any, payload: any) => {
        console.log("EVENT", "call_request", "method", payload.method);
        console.log("EVENT", "call_request", "params", payload.params);

        makeThrowError(error)

        console.log("CALL_REQUEST", payload);
    }, [])

    useEffect(() => {
        if (!connectors.length) return

        connectors.forEach((connector: any) => {
            connector.on('session_request', onSessionRequest);
            connector.on('session_update', onSessionUpdate)
            connector.on('call_request', onCallRequest);
            connector.on('connect', onConnect)
            connector.on('disconnect', onDisconnect)

            if (connector.connected) {
                setConnected(true)
            }
        })

        return () => {
            connectors.forEach((connector: any) => {
                connector.off('session_request');
                connector.off('session_update')
                connector.off('call_request');
                connector.off('connect')
                connector.off('disconnect')
            })
        }
    }, [connectors.length])

    // ACTIONS
    const getSession = useCallback((uri: any) => {
        return connectors.find((item: any) => item.uri === uri)
    }, [connectors])

    const rejectSession = useCallback(() => {
        console.log("ACTION", "rejectSession");
    }, []);

    const killSession = useCallback(async (clientId: any) => {
        console.log("ACTION", "killSession", { clientId });
        setConnected(false)
        setPeerMeta(null)
        setLoading(false)

        const session = connectors.find((item: any) => item.clientId === clientId)

        if (!session) return

        try {
            await session.killSession()
            setConnectors((state: any) => state.filter((conn: any) => conn.clientId !== clientId));
        } catch (e) {
            console.log("KILL ERROR", e)
        }

    }, [setConnectors, connectors]);

    const newSession = useCallback(async (uri: any, redirectUrl: any, autosign: any, existing: any) => {
        const options: any = { uri, session: {} };
        setLoading(true)

        if (redirectUrl) {
            options.session.redirectUrl = redirectUrl;
        }
        if (autosign) {
            options.session.autosign = autosign;
        }

        const walletConnector = new WalletConnect({
            ...options,
            ...CLIENT_OPTIONS,
        })

        const approveData = {
            chainId: parseInt("56", 10),
            accounts: [address.bnb],
        };

        if (!existing) {
            await walletConnector.createSession(approveData);
        }

        setConnectors((state: any) => [...state, walletConnector]);

        setLoading(false)
        return walletConnector
    }, [setConnectors])

    return (
        <WalletConnectContext.Provider value={{ connectors, setConnectors, peerMeta, connected, getSession, newSession, loading, rejectSession, killSession }}>
            {children}
        </WalletConnectContext.Provider>
    )
}

export const useWalletConnect = () => {
    return useContext(WalletConnectContext)
}
