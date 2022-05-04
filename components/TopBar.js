import { Box, Link, Heading, Flex } from '@chakra-ui/react';

export default function TopBar({ children }) {
    return (
        <>
            <Flex
                color='white'
                bgColor='blue.500'
                justify='space-between'
                align='center'
            >
                <Link href='/'>
                    <Heading>KLAPI</Heading>
                </Link>
                <Link href='/loans'>Varaukset</Link>
                <Link>Hallinta</Link>
                {children}
            </Flex>
        </>
    );
}