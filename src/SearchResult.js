import { Grid, ImageList, Box, ImageListItem, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';


const SearchResult = (props) => {

    const { selectedResults } = props;

    const [searchResults, setSearchResults] = useState([])
    const [limit, setLimit] = useState(10)
    const [btnDisable, setBtnDisable] = useState(false)

    useEffect(() => {
      fetch(`https://g.tenor.com/v1/trending?key=LIVDSRZULELA&limit=${limit}`)
      .then(res => res.json())
      .then(data => setSearchResults(data.results))
    }, [limit])  

    const handlePrev = () => {
        setBtnDisable(true)
        limit != 10 && setLimit(prevState => prevState - 10);
        setBtnDisable(false)
    }

    const handleNext = () => {
        setBtnDisable(true)
        setLimit(prevState => prevState + 10);
        setBtnDisable(false)
    }

    let results = selectedResults.length > 1 ? selectedResults : searchResults

    return (  
        <div className="searchResult">
            <h1>search image result..</h1>
            <Box>
                <ImageList variant="masonry" cols={4} gap={10}>
                    {results.map((item, i) => (
                    <ImageListItem key={i}>
                        <img
                        src={item.media[0].gif.url}
                        srcSet={item.media[0].gif.url}
                        alt={item.content_description || ""}
                        loading="lazy"
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-around">
                <Button variant="contained" color="primary" disable={btnDisable} onClick={handlePrev}>Prev</Button>
                <Button variant="contained" color="primary" disable={btnDisable} onClick={handleNext}>Next</Button>
            </Box>
        </div>
    );
}
 
export default SearchResult;