import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { Stack, Button, SimpleGrid } from "@chakra-ui/react";
import NextLink from 'next/link'
import ItemCard from "../../components/itemcard";
import { useSelector } from "react-redux";

export async function getServerSideProps(){
    const prisma = new PrismaClient()

    const items = await prisma.Item.findMany({
        include: {categories: true, reservations: {include: {loan: true}}},
        orderBy: {name: 'asc'}
    })
    const categories = await prisma.Category.findMany({orderBy:{name:'asc'}})

    return {props: {items, categories}}
}

const CategoryPage = ({items, categories}) =>{
    const router = useRouter()

    items = items.filter((item) => item.categories.map((category)=>category.name).includes(router.query.category))
    categories = categories.filter((cat) => cat.name !== router.query.category) 

    const dates = useSelector((state) => state.dates)

    return(
        <div>
        <h1>Kategoria: {router.query.category}</h1><br></br>

        <h2>Muut kategoriat:</h2>
        <Stack direction='row' padding='4px'>
            <NextLink href='/productlist'>
                <Button>Kaikki tuotteet</Button>
            </NextLink>
            {categories.map(category=>(
                <NextLink href={`/category/${category.name}`}>
                    <Button>{category.name}</Button>
                </NextLink>
            ))}
        </Stack><br></br>
        
        
        <h2>Päivämäärät:</h2>
            <p>{dates.startDate.toLocaleString('fi', {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: '2-digit'
            })}</p>
            <p>{dates.endDate.toLocaleString('fi', {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: '2-digit'
            })}</p>
        
        <h2>Tuotteet:</h2>
            <SimpleGrid columns={3} spacing={10}>
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </SimpleGrid>

    </div>
    )
}

export default CategoryPage