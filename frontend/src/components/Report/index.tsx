import { useState } from 'react';
import styled from 'styled-components';
import { IBugReport, TPriority } from '../../../../shared/types';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import ScrollFull from '../../elements/ScrollFull';
import {
  ButtonSmall,
  InputSmall,
  SelectSmall,
  Title,
  TitleSmall,
} from '../../elements/Typography';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  gap: 1.5rem;
  height: 100%;
  width: 50ch;
  text-align: center;
  /* z-index: 10; */
  /* background-color: var(--color-fill-sea-opaque);
  backdrop-filter: blur(10px); */

  .form {
    text-align: left;
    display: grid;
    width: 100%;
    grid-auto-flow: row;
    grid-template-columns: 30% 70%;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

interface IReportProps {
  className: string;
}

const Report = ({ className }: IReportProps): JSX.Element => {
  const { setActiveActionRoute } = useLayout();
  const { game, session, sendBugReport } = useGameServer();
  const [action, setAction] = useState('');
  const [bug, setBug] = useState('');
  const [expectation, setExpectation] = useState('');
  const [priority, setPriority] = useState<TPriority>('Low');

  const handleSubmit = async () => {
    if (!game) return;

    const bugReport: IBugReport = {
      date: new Date(),
      email: session.email,
      userReport: {
        action,
        bug,
        expectation,
        priority,
      },
      game,
    };

    sendBugReport(bugReport);

    setActiveActionRoute('none');
  };

  return (
    <ScrollFull bugreport className={className}>
      <Container>
        <Title>Report a bug</Title>
        <TitleSmall>
          Feel free to make it brief, but the more specific you are, the more
          likely we are able to fix it. We will automatically append application
          game data to the report before it is submitted.
        </TitleSmall>
        <div className='form'>
          <TitleSmall>When I tried to </TitleSmall>
          <InputSmall
            placeholder='Describe what you intended to do'
            onChange={(e) => setAction(e.target.value)}
          ></InputSmall>
          <TitleSmall>The game </TitleSmall>
          <InputSmall
            placeholder='Describe the buggy behavior'
            onChange={(e) => setBug(e.target.value)}
          ></InputSmall>
          <TitleSmall>I expected it to </TitleSmall>
          <InputSmall
            placeholder='Describe what you expected the game to do'
            onChange={(e) => setExpectation(e.target.value)}
          ></InputSmall>
          <TitleSmall>Annoyance level </TitleSmall>
          <SelectSmall
            onChange={(e) => setPriority(e.target.value as TPriority)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </SelectSmall>
        </div>
        <div className='buttons'>
          <ButtonSmall warning onClick={() => setActiveActionRoute('none')}>
            Cancel
          </ButtonSmall>
          <ButtonSmall onClick={() => handleSubmit()}>Submit</ButtonSmall>
        </div>
      </Container>
    </ScrollFull>
  );
};

export default Report;
