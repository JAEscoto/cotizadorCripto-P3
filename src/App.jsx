import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import ImagenCripto from "../img/imagen-criptos.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Ysabeau SC", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 40px;

  &::after {
    content: "";
    width: 150px;
    height: 6px;
    background-color: #891db4;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      /**/
      setCargando(true);
      setResultado({});
      setTimeout(() => {
        const cotizarCripto = async () => {
          const { moneda, criptoMoneda } = monedas;
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
          console.log(url);
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          setResultado(resultado.DISPLAY[criptoMoneda][moneda]);
          setCargando(false);
        };
        cotizarCripto();
      }, 250);
    }
  }, [monedas]);

  return (
    <>
      <Contenedor>
        <Imagen src={ImagenCripto} alt="Imagen ejemplo de criptos" />
        <div>
          <Heading>Cotizar Criptomonedas</Heading>
          <Formulario setMonedas={setMonedas} />
          {cargando && <Spinner />}
          {resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
      </Contenedor>
    </>
  );
}

export default App;
