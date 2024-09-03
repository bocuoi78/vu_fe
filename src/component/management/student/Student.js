import React, {useEffect, useState} from "react";
import {Container, Table} from "react-bootstrap";
import api from "../../../api";

const Student = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await api.getStudentList();
        if (response?.data?.data) {
            setData(response.data.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Container>
                <h1>DANH SÁCH SINH VIÊN</h1>
                <Table border={1}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Họ và Tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.fullname}</td>
                            <td>{student.birthday}</td>
                            <td>{student.gender ? "Nam" : "Nữ"}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default (Student);