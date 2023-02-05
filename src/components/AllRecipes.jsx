import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';

function AllRecipes() {

    const [all, setAll] = useState([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15`);
        const data = await api.json();
        console.log(data);
        setAll(data.recipes);
    }

    return(
        <div>
                <Wrap>
                    <h3>Top Picks</h3>

                    <Splide options={{
                        perPage: 3,
                        arrows: false,
                        drag: 'free',
                        gap: '3rem'
                    }}>
                    {all.map((recipe) => {
                        return(
                            <SplideSlide key={recipe.id}>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                            </Card>
                            </SplideSlide>
                        );
                    })}
                    </Splide>
                </Wrap>
        </div>
    );
}

const Wrap = styled.div`
margin: 5rem 0rem;
`

const Card = styled.div`
min-height: 8rem;
border-radius: 2rem;
gap: 10px;

img{
    border-radius: 25%;
}
`

export default AllRecipes