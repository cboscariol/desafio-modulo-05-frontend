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



export default function CardRestaurante({ id_restaurante, nome, descricao, img }) {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [ carregando, setCarregando ] = useState(false);
  const [ erro, setErro ] = useState('');
  const handlecloseAlert = () => {
      setErro('');
  }

  function handleClick(){
		history.push(`/cardapio/${id_restaurante}`)
    
	}

  return (
    <Card id='card' className={classes.root} onClick={() => handleClick()}>
      <CardContent className={classes.cardContent} >
        <div className={classes.divContent}>
            <h2 className={classes.h2}>{nome}</h2>
            <span className={classes.spanDesc}>{descricao}</span>
            <div className={classes.priceDiv}>
                {'$$'}
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