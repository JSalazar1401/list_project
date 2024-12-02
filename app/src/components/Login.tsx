import axios, { AxiosError } from "axios";
import { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Swal from "sweetalert2";

export const Login = () => {
    const [data, setData] = useState({});

    const onChange = (e:any) => {
        e.preventDefault()
        const tempoData:any = data;
        tempoData[e.target.name] = e.target.value;
        setData(tempoData);
    }

    const onSubmit = async ()=>{
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading();
            await axios.post("http://localhost:4000/user/login", data);
            Swal.fire("Datos validados con exito", "", "success");
        } catch (error:any) {
            Swal.fire("Algo salio mal",error.response.data.msg ,"error");
        }
    }
    return (
        <Container>
            <Card
                style={{ width: "30rem", margin: "auto" }}
                className="mt-3"
            >
                <Card.Body>
                    <Card.Title className="text-center">Bienvenido! Inicia sesión</Card.Title>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Correo:</Form.Label>
                                <Form.Control className="mb-3" name="email" onChange={onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control type="password" className="mb-3" name="password" onChange={onChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <Button className="m-3" onClick={()=>onSubmit()}>Ingresar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            ¿Olvidaste tu contraseña? Recuperala <a>aquí</a>
                        </Col>
                        <Col>¿Todavía no tienes cuenta? Registrate <a href="/register">aquí</a></Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
