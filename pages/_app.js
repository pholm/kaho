import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import {
    ChakraProvider,
    Container,
    Box,
    Link,
    Heading,
} from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { useToast } from '@chakra-ui/react';
import store from '../redux/store';
import { Provider } from 'react-redux';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TopBar = () => {
    return (
        <>
            <Box bgColor='blue.500'>
                <Link href='/'>
                    <Heading>KLAPI</Heading>
                </Link>
            </Box>
        </>
    );
};

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    const toast = useToast();

    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <ChakraProvider>
                    <SWRConfig
                        value={{
                            fetcher,
                            onError: (error, key) => {
                                if (
                                    error.status !== 403 &&
                                    error.status !== 404
                                ) {
                                    toast({
                                        title: 'Error',
                                        description: error.message,
                                        status: 'error',
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                }
                            },
                        }}
                    >
                        <TopBar />
                        <Container>
                            <Component {...pageProps} />
                        </Container>
                    </SWRConfig>
                </ChakraProvider>
            </Provider>
        </SessionProvider>
    );
}
