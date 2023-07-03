import styled from "@emotion/styled";

const Contenedor = styled.div`
  color: #fff;
  font-family: "Ysabeau SC", sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Imagen = styled.img`
  width: 250px;
`;

const Texto = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;
const Precio = styled.p`
  font-size: 20px;
  span {
    font-weight: 700;
  }
`;

const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    resultado;
  return (
    <Contenedor>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="Imagen de la critpo"
      />
      <div>
        <Precio>
          El precio es de: <span>{PRICE}</span>
        </Precio>
        <Texto>
          Precio mas alto del dia: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          Precio mas bajo del dia: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variacion de las ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span>%
        </Texto>
        <Texto>
          Ultima actualizacion: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Contenedor>
  );
};

export default Resultado;
