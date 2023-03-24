import React, { useEffect } from 'react'
import AnimeItem from './AnimeItem';
import { animeData } from '../js/anime';


export default function AnimeList() {


    useEffect(() => {
        console.log(animeData())
        // const test = {list}.map(function(a){console.log(a.attributes.attributes.titles.en)})
        // console.log({list[0].attributes.posterImage.large})
    }, [])
     
    return (
      <div>
      </div>
    );
  }