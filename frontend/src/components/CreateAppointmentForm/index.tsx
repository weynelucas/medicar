import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import Appointment from '../../models/Appointment';
import Doctor from '../../models/Doctor';
import Schedule from '../../models/Schedule';
import Speciality from '../../models/Speciality';
import api from '../../services/api';
import Alert from '../Alert';
import Button from '../Button';
import SelectInput from '../SelectInput';
import Title from '../Title';
import { Container, Form, FormActions } from './styles';
import { useField } from './utils';

interface CreateAppointmentFormProps {
  onCreateSuccess?: (appointment: Appointment) => void;
  onCancel?: () => void;
}

const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({
  onCreateSuccess,
  onCancel,
}) => {
  const timeField = useField({});

  const scheduleField = useField({
    dependant: [timeField],
    resolve: _filterTimesBySchedule,
  });

  const doctorField = useField({
    dependant: [timeField, scheduleField],
    resolve: _filterSchedulesByDoctor,
  });

  const specialityField = useField({
    dependant: [timeField, scheduleField, doctorField],
    resolve: _filterDoctorsBySpeciality,
  });

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [creationError, setCreationError] = useState('');

  async function _filterSpecialities() {
    const response = await api.get<Speciality[]>('/specialities');

    specialityField.setOptions(
      response.data.map(({ id: value, name: label }) => ({
        value,
        label,
      })),
    );
  }

  async function _filterDoctorsBySpeciality(speciality: string) {
    const response = await api.get<Doctor[]>('/doctors', {
      params: { speciality },
    });

    doctorField.setOptions(
      response.data.map(({ id: value, name: label }) => ({ value, label })),
    );
  }

  async function _filterSchedulesByDoctor(doctor: string) {
    const response = await api.get<Schedule[]>('/schedules', {
      params: { doctor },
    });

    setSchedules(response.data);
    scheduleField.setOptions(
      response.data.map(({ id: value, date }) => ({
        value,
        label: new Date(date).toLocaleDateString(),
      })),
    );
  }

  function _filterTimesBySchedule(scheduleId: string) {
    const schedule = schedules.find(
      schedule => parseInt(scheduleId) === schedule.id,
    );

    if (schedule) {
      timeField.setOptions(
        schedule.times.map(time => ({ value: time, label: time })),
      );
    }
  }

  const resetForm = useCallback(() => {
    specialityField.reset();
    doctorField.reset();
    scheduleField.reset();
    timeField.reset();
  }, [specialityField, doctorField, scheduleField, timeField]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        setCreationError('');

        const { data: appointment } = await api.post<Appointment>(
          '/appointments',
          {
            scheduleId: parseInt(scheduleField.value),
            time: timeField.value,
          },
        );

        if (onCreateSuccess) {
          onCreateSuccess(appointment);
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          const { detail } = err.response.data;
          setCreationError(detail);
        } else {
          setCreationError('Não foi possível marcar a consulta.');
        }
      }
    },
    [scheduleField.value, timeField.value, onCreateSuccess],
  );

  const handleCancelAppointment = useCallback(() => {
    resetForm();

    if (onCancel) {
      onCancel();
    }
  }, [onCancel, resetForm]);

  useEffect(() => {
    _filterSpecialities();
  }, []); // eslint-disable-line

  return (
    <Container>
      <Title>Nova Consulta</Title>
      <Form onSubmit={handleSubmit}>
        {creationError && <Alert>{creationError}</Alert>}

        <SelectInput
          placeholder="Especialidade"
          name="speciality"
          disabled={!specialityField.options.length}
          options={specialityField.options}
          onChange={specialityField.handleChange}
        />

        <SelectInput
          placeholder="Médico"
          name="doctor"
          disabled={!doctorField.options.length}
          options={doctorField.options}
          onChange={doctorField.handleChange}
        />

        <SelectInput
          placeholder="Data"
          disabled={!scheduleField.options.length}
          options={scheduleField.options}
          onChange={scheduleField.handleChange}
        />

        <SelectInput
          placeholder="Horário"
          disabled={!timeField.options.length}
          options={timeField.options}
          onChange={timeField.handleChange}
        />

        <FormActions>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancelAppointment}
          >
            Cancelar
          </Button>

          <Button type="submit" disabled={!timeField.value}>
            Confirmar
          </Button>
        </FormActions>
      </Form>
    </Container>
  );
};

export default CreateAppointmentForm;
