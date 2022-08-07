import { useSelector, useDispatch } from 'react-redux';
import { incrementAmount, decrementAmount } from '../redux/cart.slice';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    IconButton,
    Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react';

import router from 'next/router';

export default function CartPage() {
    const items = useSelector((state) => state.cart.items);
    const dates = useSelector((state) => state.dates);
    const dispatch = useDispatch();

    const { data: session, status } = useSession();

    const startTime = dates.startDate;
    const endTime = dates.endDate;

    const userName = session?.user?.name;

    const reservations = items.map((cartitem) => ({
        item: { connect: { id: cartitem.id } },
        amount: cartitem.amount,
    }));

    async function submitLoan() {
        const body = { reservations, startTime, endTime, userName };
        try {
            const id = await fetch('api/loan/submitLoan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((res) => res.id);
            console.log(id);
            router.push(`/loan/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Link href='/productlist'>
                <Button>Takaisin listaan</Button>
            </Link>

            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Kama</Th>
                            <Th>Määrä</Th>
                            <Th>Muokkaa</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.name}</Td>
                                <Td>{item.amount}</Td>
                                <Td>
                                    <IconButton
                                        icon={<MinusIcon />}
                                        onClick={() =>
                                            dispatch(decrementAmount(item.id))
                                        }
                                    ></IconButton>
                                    <IconButton
                                        icon={<AddIcon />}
                                        onClick={() =>
                                            dispatch(incrementAmount(item.id))
                                        }
                                    ></IconButton>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Box>
                <Button onClick={() => submitLoan()}>Lähetä varaus</Button>
            </Box>
        </div>
    );
}
