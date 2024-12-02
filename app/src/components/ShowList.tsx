
//Listado de usuarios -> Jueces, participantes, administradores
//Lista de equipos
//Eventos

import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { IEvent, ITeams, IUser } from "../Types";
import { Card, Table } from "react-bootstrap";

interface props {
  entity: "user" | "team" | "event"
}

export const ShowList = ({ entity }: props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  function getKeys<T>() {
    return Object.keys({}) as (keyof T)[]
  }

  const getData = async () => {
    try {
      const url = `http://localhost:4000/${entity}/list`
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      Swal.fire("Opps ocurrio un error", "No se pudieron obtener los datos de la tabla", "error")
    }
  }

  const getColumns = () => {
    let columns = [];
    if (entity == "event") {
      columns = getKeys<IEvent>();
    } else if (entity == "team") {
      columns = getKeys<ITeams>();
    } else {
      columns = getKeys<IUser>();
    };
    const HTMLColums = columns.map((c) => (
      <th>{c}</th>
    ));
    return HTMLColums;
  }


  return (
    <Card>
      <Card.Body>
        <Card.Title>Listado de {entity}</Card.Title>
        <Table>
          <thead>
            {getColumns()}
          </thead>
          <tbody>
            {
              data.map((datum) => (
                <tr>
                  <td>{datum}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
