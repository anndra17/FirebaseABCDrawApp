interface CategoryImage {
    nume: string;
    imagine: any;
  }
  
  interface Categories {
    litere: CategoryImage[];
    desene_animate: CategoryImage[];
    mancaruri: CategoryImage[];
    jucarii: CategoryImage[];
    [key: string]: CategoryImage[]; // Permite accesul dinamic pe baza unui string
  }
  
  export  const categories: Categories = {
      litere: [
        { nume: 'A', imagine: require('../../assets/images/letters/A.png') },
        { nume: 'Ă', imagine: require('../../assets/images/letters/Ă.png') },
        { nume: 'Â', imagine: require('../../assets/images/letters/Â.png') },
        { nume: 'B', imagine: require('../../assets/images/letters/B.png') },
        { nume: 'C', imagine: require('../../assets/images/letters/C.png') },
        { nume: 'D', imagine: require('../../assets/images/letters/D.png') },
        { nume: 'E', imagine: require('../../assets/images/letters/E.png') },
        { nume: 'F', imagine: require('../../assets/images/letters/F.png') },
        { nume: 'G', imagine: require('../../assets/images/letters/G.png') },
        { nume: 'H', imagine: require('../../assets/images/letters/H.png') },
        { nume: 'I', imagine: require('../../assets/images/letters/I.png') },
        { nume: 'Î', imagine: require('../../assets/images/letters/Î.png') },
        { nume: 'J', imagine: require('../../assets/images/letters/J.png') },
        { nume: 'K', imagine: require('../../assets/images/letters/K.png') },
        { nume: 'L', imagine: require('../../assets/images/letters/L.png') },
        { nume: 'M', imagine: require('../../assets/images/letters/M.png') },
        { nume: 'N', imagine: require('../../assets/images/letters/N.png') },
        { nume: 'O', imagine: require('../../assets/images/letters/O.png') },
        { nume: 'P', imagine: require('../../assets/images/letters/P.png') },
        { nume: 'Q', imagine: require('../../assets/images/letters/Q.png') },
        { nume: 'R', imagine: require('../../assets/images/letters/R.png') },
        { nume: 'S', imagine: require('../../assets/images/letters/S.png') },
        { nume: 'Ș', imagine: require('../../assets/images/letters/Ș.png') },
        { nume: 'T', imagine: require('../../assets/images/letters/T.png') },
        { nume: 'Ț', imagine: require('../../assets/images/letters/Ț.png') },
        { nume: 'U', imagine: require('../../assets/images/letters/U.png') },
        { nume: 'V', imagine: require('../../assets/images/letters/V.png') },
        { nume: 'W', imagine: require('../../assets/images/letters/W.png') },
        { nume: 'X', imagine: require('../../assets/images/letters/X.png') },
        { nume: 'Y', imagine: require('../../assets/images/letters/Y.png') },
        { nume: 'Z', imagine: require('../../assets/images/letters/Z.png') },
      ],
      desene_animate: [
        { nume: 'Patrula Cățelușilor', imagine: require('../../assets/images/desene_animate/Patrula Catelusilor.png') },
        { nume: 'Elsa', imagine: require('../../assets/images/desene_animate/Elsa.png') },
        { nume: 'Ana', imagine: require('../../assets/images/desene_animate/Ana.png') },
        { nume: 'Mickey Mouse', imagine: require('../../assets/images/desene_animate/Mickey Mouse.png') },
        { nume: 'Motan Noir', imagine: require('../../assets/images/desene_animate/Motan Noir.png') },
        { nume: 'Bluey', imagine: require('../../assets/images/desene_animate/Bluey.png') },
        { nume: 'Buburuza', imagine: require('../../assets/images/desene_animate/Buburuza.png') },
        { nume: 'Peppa Pig', imagine: require('../../assets/images/desene_animate/Peppa Pig.png') },
        { nume: 'Supereroi în pijamale', imagine: require('../../assets/images/desene_animate/Supereroi în pijamale.png') },
      ],
      mancaruri: [
        { nume: 'Pizza', imagine: require('../../assets/images/mancaruri/Pizza.png') },
        { nume: 'Clătite', imagine: require('../../assets/images/mancaruri/Clătite.png') },
        { nume: 'Paste', imagine: require('../../assets/images/mancaruri/Paste.png') },
        { nume: 'Salată', imagine: require('../../assets/images/mancaruri/Salată.png') },
        { nume: 'Supă', imagine: require('../../assets/images/mancaruri/Supă.png') },
        { nume: 'Gogoși', imagine: require('../../assets/images/mancaruri/Gogoși.png') },
        { nume: 'Înghețată', imagine: require('../../assets/images/mancaruri/Înghețată.png') },
        { nume: 'Sandviș', imagine: require('../../assets/images/mancaruri/Sandviș.png') },
        { nume: 'Sarmale', imagine: require('../../assets/images/mancaruri/Sarmale.png') },
        { nume: 'Iaurt', imagine: require('../../assets/images/mancaruri/Iaurt.png') },
      ],
      jucarii: [
        { nume: 'Lego', imagine: require('../../assets/images/jucarii/Lego.png') },
        { nume: 'Barbie', imagine: require('../../assets/images/jucarii/Barbie.png') },
        { nume: 'Puzzle', imagine: require('../../assets/images/jucarii/Puzzle.png') },
      ],
    };


  
export default categories;