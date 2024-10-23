import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

interface PokemonCardProps {
    url: string;
}

interface Pokemon {
    name: string;
    id: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
}

export function PokemonCard({ url }: PokemonCardProps) {
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setPokemon(data);
            });
    }, [url]);
    if (!pokemon) return null;
    return (
        
    <View style={styles.container}>
        <Image source={{uri: pokemon.sprites.other['official-artwork'].front_default,}}style={styles.image}/>

        <View style={styles.row2}>

            <Text style={styles.numeros}>#{pokemon.id} </Text>
            <Text style={styles.name}>{pokemon.name}</Text>

        </View>
        <View style={styles.row2}>
        {pokemon.types.map((type)=>(<Text style={styles.type}>{type.type.name}</Text>))}
</View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        alignItems: 'center',
        backgroundColor:"gray",
        margin:2,
        


        
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 32,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    numeros: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    type: {
        margin:2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius:7,
        padding:3

    },
    row: {
        maxWidth: '100%',
        flexDirection: "row",
        margin:2,
    },
    row2: {
        maxWidth: '100%',
        maxHeight:'50%',
        flexDirection: "row",
        margin:2,
        
    }
});