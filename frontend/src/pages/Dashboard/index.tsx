import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import Button from '../../components/Button';
import CreateAppointmentForm from '../../components/CreateAppointmentForm';
import Navbar from '../../components/Navbar';
import Title from '../../components/Title';
import Appointment from '../../models/Appointment';
import api from '../../services/api';
import { Box, BoxHeader, Container, ModalStyle } from './styles';

Modal.setAppElement('#root');

function getAppointmentDate(appointment: Appointment): Date {
  const [hours, minutes] = appointment.time.split(':');
  const date = new Date(appointment.date);

  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  return date;
}

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [onCanceling, setOnCanceling] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.get<Appointment[]>('/appointments');

      setAppointments(response.data);
    })();
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCancelAppointment = useCallback(
    async appointmentId => {
      setOnCanceling([...onCanceling, appointmentId]);

      await api.delete(`/appointments/${appointmentId}`);

      setAppointments(
        appointments.filter(appointment => appointment.id !== appointmentId),
      );
      setOnCanceling(onCanceling.filter(id => id !== appointmentId));
    },
    [appointments, onCanceling],
  );

  const onCancelingAppointment = useCallback(
    appointmentId => {
      return onCanceling.includes(appointmentId);
    },
    [onCanceling],
  );

  const handleNewAppointment = useCallback(
    (appointment: Appointment) => {
      const sortedAppointments = [...appointments, appointment].sort((a, b) => {
        return (
          getAppointmentDate(a).getTime() - getAppointmentDate(b).getTime()
        );
      });

      setAppointments(sortedAppointments);
      closeModal();
    },
    [appointments, closeModal],
  );

  return (
    <Container>
      <Navbar />
      <Box>
        <BoxHeader>
          <Title>Consultas</Title>
          <Button type="button" size="small" onClick={openModal}>
            <FaPlus />
            Nova Consulta
          </Button>
        </BoxHeader>

        <table>
          <thead>
            <tr>
              <th>Especialidade</th>
              <th>Profissional</th>
              <th>Data</th>
              <th>Hora</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.doctor.speciality.name}</td>
                  <td>{appointment.doctor.name}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <Button
                      type="button"
                      variant="secondary"
                      size="small"
                      disabled={onCancelingAppointment(appointment.id)}
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      <FaTimes />
                      Desmarcar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td align="center" colSpan={5}>
                  Nenhuma consulta marcada até o momento
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>

      <Modal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
        style={ModalStyle}
      >
        <CreateAppointmentForm
          onCreateSuccess={handleNewAppointment}
          onCancel={closeModal}
        />
      </Modal>
    </Container>
  );
};

export default Dashboard;
