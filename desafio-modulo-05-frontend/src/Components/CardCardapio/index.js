import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import useStyles from './style';
import './style.css';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    IconButton,
} from '@material-ui/core'; 



export default function CardCardapio({ setOpenCarrinho, setProdutoEscolhido, id, nome, descricao, img, preco }) {
  const classes = useStyles();
  const history = useHistory();
  const [ carregando, setCarregando ] = useState(false);
  const [ erro, setErro ] = useState('');
  const precoFormatado = (preco/100).toFixed(2); 
  
  const handlecloseAlert = () => {
      setErro('');
  }

  function handleClick(){
		const produto = {
			nome: nome,
			imagem: img,
			preco: preco,
      descricao: descricao,
			id: id
		}
		console.log(produto, 'produto')
		setProdutoEscolhido(produto);
		setOpenCarrinho(true);
	}
 

  return (
    <Card id='card' className={classes.root} onClick={() => handleClick()}>
      <CardContent className={classes.cardContent} >
        <div className={classes.divContent}>
            <h2 className={classes.h2}>{nome}</h2>
            <span className={classes.spanDesc}>{descricao}</span>
            <div className={classes.priceDiv}>
                {`R$${precoFormatado}`}
            </div>
        </div>
        
        <div >
        <CardMedia
          className={classes.cardImg}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          width="140"
          image={img}
          title="Contemplative Reptile"
        />
        </div>
      </CardContent>
              {carregando && <CircularProgress />}
              {erro &&
                  <Alert severity="error" onClick={handlecloseAlert}>{erro} 
                    <IconButton size="small" aria-label="close" color="inherit" >
                    <CloseIcon fontSize="small" />
                    </IconButton>
                  </Alert> 
              }      
    </Card>
  );
}