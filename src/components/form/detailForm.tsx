'use client';

import { Container, Fieldset, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Person } from '@/model/person';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setDescription, setCommander } from '@/store/detailReducer';
import { RootState } from '@/store/rootStore';
import { PersonInput } from '../inputs/personInput';
import { useRouter } from 'next/navigation';
import { NavButtons } from '../nav/NavButtons';
import { setStep } from '@/store/navStore';

export const DetailForm: React.FC = () => {
  const detailStore = useSelector((state: RootState) => state.detail);
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      fleetName: detailStore.name,
      description: detailStore.description,
      commander: detailStore.commander,
    },
    onValuesChange: (values) => {
      if (values.commander) {
        handleCommander(values.commander);
      }
    },
    validate: {
      fleetName: (value) => (value ? null : 'Name is required'),
      description: (value) => (value ? null : 'Description is required'),
      commander: (value) => (value ? null : 'Please assign a commander'),
    },
  });

  const isValid = Boolean(
    form.values.fleetName && form.values.description && detailStore.commander,
  );

  const handleSubmit = () => {
    dispatch(setName(form.values.fleetName));
    dispatch(setDescription(form.values.description));
    dispatch(setStep(1));
    if (isValid) {
      router.push('/composition');
    }
  };

  const handleCommander = (commander: Person) => {
    if (commander !== detailStore.commander) {
      dispatch(setCommander(commander));
    }
  };

  return (
    <Container miw={400}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Fieldset legend='Details'>
          <TextInput
            label='name'
            name='fleetName'
            data-testid='fleetName'
            {...form.getInputProps('fleetName')}
            type='text'
            placeholder='Name'
          />
          <Textarea
            label='description'
            name='description'
            data-testid='description'
            {...form.getInputProps('description')}
            placeholder='description'
          />
          <PersonInput
            label='commander'
            name='commander'
            data-testid='commander'
            limit={5}
            {...form.getInputProps('commander')}
            placeholder='commander'
          ></PersonInput>
        </Fieldset>
        <NavButtons
          next={{
            url: '/composition',
            type: 'submit',
            isValid,
            invalidMessage: 'Please fill all the fields',
          }}
        />
      </form>
    </Container>
  );
};
