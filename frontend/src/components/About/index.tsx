import styled from 'styled-components';
import { useLayout } from '../../contexts/LayoutProvider';
import { Title } from '../../elements/Typography';
import rules from '../../assets/Rules.pdf';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-fill-sea-opaque);

  z-index: 10;

  }
`;

interface IAboutProps {
  className: string;
}

const About = ({ className }: IAboutProps): JSX.Element => {
  const { setActiveActionRoute } = useLayout();
  return (
    <Wrapper className={className} onClick={() => setActiveActionRoute('none')}>
      <embed
        src={rules}
        type='application/pdf'
        height='80%'
        width='100%'
      ></embed>
    </Wrapper>
  );
};

export default About;
